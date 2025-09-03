"use client";
import { useState } from "react";

const ENDPOINT =
  "https://script.google.com/macros/s/AKfycby8kggAeXVZ-DEb-SzddBUmQidFepsL5zX1FegCjRFeyqPolvYVdYgLO_PF0awrGPQ1/exec";
const SHARED_SECRET = "laabTech-2025#Segredo!";

export default function ContatoForm() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const form = e.currentTarget;
    const data = {
      nome: (form.elements.namedItem("nome") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      tel: (form.elements.namedItem("tel") as HTMLInputElement).value,
      mensagem: (form.elements.namedItem("mensagem") as HTMLTextAreaElement)
        .value,
      origem: "landing-laab",
      secret: SHARED_SECRET, // <- precisa ser "secret" para casar com o backend
    };

    try {
      const resp = await fetch(ENDPOINT, {
        method: "POST",
        // IMPORTANTE: text/plain evita preflight no Apps Script
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(data),
      });

      // Apps Script responde JSON (status 200)
      const json = (await resp.json()) as {
        sucesso?: boolean;
        mensagem?: string;
      };

      if (json.sucesso) {
        setStatus("✅ Mensagem enviada com sucesso!");
        form.reset();
      } else {
        setStatus("⚠️ Erro: " + (json.mensagem || "Falha ao enviar."));
      }
    } catch {
      setStatus("❌ Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
      <div>
        <label className="block text-sm mb-1" htmlFor="nome">
          Nome
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          required
          className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 outline-none backdrop-blur placeholder-white/60"
          placeholder="Seu nome"
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm mb-1" htmlFor="email">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 outline-none backdrop-blur placeholder-white/60"
          placeholder="seu@email.com"
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm mb-1" htmlFor="tel">
          Telefone
        </label>
        <input
          id="tel"
          name="tel"
          type="tel"
          inputMode="tel"
          pattern="\(?\d{2}\)?\s?\d{4,5}-?\d{4}"
          className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 outline-none backdrop-blur placeholder-white/60"
          placeholder="(11) 98765-4321"
          disabled={loading}
        />
        <small className="text-white/50">Formato aceito: (11) 99999-9999</small>
      </div>

      <div>
        <label className="block text-sm mb-1" htmlFor="mensagem">
          Mensagem
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          required
          rows={5}
          className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 outline-none backdrop-blur placeholder-white/60"
          placeholder="Como podemos ajudar?"
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl px-5 py-3 font-semibold text-white transition
                   shadow-[0_8px_24px_rgba(230,62,136,.35)] hover:opacity-95 active:opacity-90"
        style={{ background: "var(--rosa-laab)" }}
      >
        {loading ? "Enviando..." : "Enviar"}
      </button>

      {status && <p className="mt-2 text-center text-white/80">{status}</p>}
    </form>
  );
}
