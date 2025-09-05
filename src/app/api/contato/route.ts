import { NextResponse } from "next/server";

// Rode no Edge (pode trocar para "nodejs" se preferir)
export const runtime = "edge";

// Tipos
type ContactBody = {
  nome?: string;
  email?: string;
  tel?: string;
  mensagem?: string;
  hp?: string; // honeypot
  origem?: string;
  consent?: boolean;
};

type GASResponse = {
  sucesso?: boolean;
  mensagem?: string;
};

export async function POST(req: Request) {
  try {
    // Parse do body com fallback seguro
    let body: ContactBody = {};
    try {
      body = (await req.json()) as ContactBody;
    } catch {
      body = {};
    }

    const { nome, email, tel, mensagem, hp, origem, consent } = body;

    // Honeypot: se veio preenchido, trata como bot (finge sucesso)
    if (typeof hp === "string" && hp.trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    // Validação mínima
    if (!nome || !email || !mensagem) {
      return NextResponse.json(
        { ok: false, error: "Campos obrigatórios ausentes." },
        { status: 400 }
      );
    }

    // Variáveis de ambiente (.env.local)
    const gasUrl = process.env.GAS_ENDPOINT; // URL pública do seu Apps Script
    const secret = process.env.CONTACT_SECRET; // Segredo que o GAS valida

    if (!gasUrl || !secret) {
      return NextResponse.json(
        { ok: false, error: "Configuração do backend ausente." },
        { status: 500 }
      );
    }

    // Payload enviado ao Apps Script (ele espera 'secret')
    const payload = {
      nome,
      email,
      tel,
      mensagem,
      origem: origem || "landing-laab",
      consent: !!consent,
      secret,
    };

    const resp = await fetch(gasUrl, {
      method: "POST",
      // text/plain evita preflight no GAS
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    // Tenta ler JSON; se não vier JSON, segue vazio
    let json: GASResponse = {};
    try {
      json = (await resp.json()) as GASResponse;
    } catch {
      json = {};
    }

    // Se HTTP não for ok ou GAS retornou sucesso = false
    if (!resp.ok || json.sucesso === false) {
      const msg = json.mensagem || `Falha ao encaminhar (${resp.status})`;
      return NextResponse.json({ ok: false, error: msg }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro inesperado.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
