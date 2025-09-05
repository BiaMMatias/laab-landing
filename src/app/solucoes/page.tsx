"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Escolha = "webapp" | "planilha" | null;

type ResponsiveVideoProps = {
  src: string;
  title: string;
  poster?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
};

function isIframeSrc(url: string): boolean {
  const u = url.toLowerCase();
  return (
    u.includes("youtube.com") ||
    u.includes("youtu.be") ||
    u.includes("vimeo.com") ||
    (u.includes("drive.google.com") && u.includes("/preview"))
  );
}
function toYouTubeEmbed(url: string): string {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${u.pathname.replace("/", "")}`;
    }
    const id = u.searchParams.get("v");
    if (id) return `https://www.youtube.com/embed/${id}`;
    return url;
  } catch {
    return url;
  }
}

function ResponsiveVideo({
  src,
  title,
  poster,
  autoplay = false,
  loop = false,
  muted = true,
  className = "",
}: ResponsiveVideoProps) {
  const iframe = isIframeSrc(src);
  if (iframe) {
    const embed =
      src.includes("youtube.com") || src.includes("youtu.be")
        ? toYouTubeEmbed(src)
        : src;
    return (
      <div
        className={`mt-5 w-full rounded-xl overflow-hidden border border-white/10 bg-black/30 ${className}`}
      >
        <div className="aspect-video">
          <iframe
            src={embed}
            title={title}
            loading="lazy"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    );
  }
  return (
    <div
      className={`mt-5 w-full rounded-xl overflow-hidden border border-white/10 bg-black/30 ${className}`}
    >
      <div className="aspect-video">
        <video
          className="w-full h-full"
          controls
          playsInline
          preload="metadata"
          poster={poster}
          autoPlay={autoplay}
          loop={loop}
          muted={muted}
          controlsList="nodownload"
        >
          <source src={src} type="video/mp4" />
          Seu navegador não suporta o elemento de vídeo.
        </video>
      </div>
    </div>
  );
}

/* ==================== PRICING ==================== */
type Plano = {
  nome: string;
  precoPix: number; // base PIX/transferência
  destaque?: boolean;
  itens: string[];
  ctaLabel: string;
  ctaHref: string;
};

const FEE = 0.0499; // 4,99% Mercado Pago
const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const comTaxa = (valor: number) => Math.round(valor * (1 + FEE) * 100) / 100;

/* ---------- NOVOS VALORES ---------- */
const PLANOS_WEBAPP: Plano[] = [
  {
    nome: "Essencial (MVP)",
    precoPix: 697,
    itens: [
      "Até 4 telas essenciais",
      "Login básico",
      "Integração Drive/Sheets",
      "Tema LAAB (padrão)",
      "Entrega estimada: 1–2 semanas",
    ],
    ctaLabel: "Solicitar proposta",
    ctaHref: "/contato",
  },
  {
    nome: "Profissional",
    precoPix: 1097,
    destaque: true,
    itens: [
      "8–10 telas + fluxos",
      "Perfis de acesso",
      "Dashboards e relatórios",
      "Integrações (Gmail/Calendar/API)",
      "Suporte de implantação (30 dias)",
    ],
    ctaLabel: "Conversar no WhatsApp",
    ctaHref: "https://wa.me/5511995363889",
  },
  {
    nome: "Avançado",
    precoPix: 1497,
    itens: [
      "Telas ilimitadas (dentro do escopo)",
      "Autenticação avançada",
      "Rotinas/automação (Apps Script)",
      "Customizações profundas",
      "Treinamento do time",
    ],
    ctaLabel: "Agendar reunião",
    ctaHref: "/contato",
  },
];

const PLANOS_PLANILHA: Plano[] = [
  {
    nome: "Starter",
    precoPix: 297,
    itens: [
      "1 processo automatizado",
      "Dashboard essencial",
      "Integração básica (Forms/Drive)",
      "Entrega: 3–5 dias úteis",
    ],
    ctaLabel: "Quero essa",
    ctaHref: "/contato",
  },
  {
    nome: "Pro",
    precoPix: 697,
    destaque: true,
    itens: [
      "Até 3 processos automatizados",
      "Dashboard completo + relatórios",
      "Apps Script sob medida",
      "Suporte de implantação (15 dias)",
    ],
    ctaLabel: "Falar com especialista",
    ctaHref: "https://wa.me/5511995363889",
  },
  {
    nome: "Plus",
    precoPix: 997,
    itens: [
      "Até 5 processos automatizados",
      "KPIs avançados + PDF/Excel",
      "Gatilhos e rotinas (email/eventos)",
      "Treinamento e handoff",
    ],
    ctaLabel: "Quero orçamento",
    ctaHref: "/contato",
  },
];

function PricingCards({ planos }: { planos: Plano[] }) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {planos.map((p) => {
        const precoCartao = comTaxa(p.precoPix);
        return (
          <div
            key={p.nome}
            className={`rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur
              ${
                p.destaque
                  ? "shadow-[0_12px_36px_rgba(230,62,136,.45)] ring-1 ring-pink-400/40"
                  : "shadow-[0_8px_24px_rgba(230,62,136,.35)]"
              }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">{p.nome}</h3>
              {p.destaque && (
                <span className="text-xs px-2 py-1 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-200">
                  Mais popular
                </span>
              )}
            </div>

            <div className="mt-4 space-y-2">
              <div>
                <div className="text-sm text-white/70">PIX / transferência</div>
                <div className="text-2xl font-bold">{brl(p.precoPix)}</div>
              </div>
              <div className="pt-2 border-t border-white/10">
                <div className="text-sm text-white/70">
                  Cartão (c/ taxa 4,99%)
                </div>
                <div className="text-xl font-semibold">{brl(precoCartao)}</div>
              </div>
            </div>

            <ul className="mt-5 space-y-2 text-white/85 text-sm">
              {p.itens.map((i, idx) => (
                <li key={idx} className="flex gap-2">
                  <span>•</span>
                  <span>{i}</span>
                </li>
              ))}
            </ul>

            <a
              href={p.ctaHref}
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 font-semibold text-white
                        transition shadow-[0_8px_24px_rgba(230,62,136,.35)] hover:opacity-95 active:opacity-90"
              style={{ background: "var(--rosa-laab)" }}
            >
              {p.ctaLabel}
            </a>
          </div>
        );
      })}
    </div>
  );
}

function PricingSection() {
  const [produto, setProduto] = useState<"webapp" | "planilha">("webapp");
  return (
    <section className="mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-3xl md:text-4xl font-bold">
            Nossos <span className="text-pink-400">planos & valores</span>
          </h2>
          <div className="inline-flex rounded-xl border border-white/10 p-1 bg-white/5">
            <button
              onClick={() => setProduto("webapp")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition
                ${
                  produto === "webapp"
                    ? "bg-pink-500/20 text-pink-200 border border-pink-400/30"
                    : "text-white/80 hover:bg-white/5"
                }`}
            >
              WebApp
            </button>
            <button
              onClick={() => setProduto("planilha")}
              className={`ml-1 px-3 py-1.5 rounded-lg text-sm font-medium transition
                ${
                  produto === "planilha"
                    ? "bg-pink-500/20 text-pink-200 border border-pink-400/30"
                    : "text-white/80 hover:bg-white/5"
                }`}
            >
              Planilha
            </button>
          </div>
        </div>

        <p className="mt-3 text-white/75">
          Valores à vista (PIX/transferência) e no cartão (com{" "}
          <strong>4,99%</strong> de taxa do Mercado Pago). Precisa de algo fora
          do escopo? Falamos por proposta.
        </p>

        <div className="mt-8">
          {produto === "webapp" ? (
            <PricingCards planos={PLANOS_WEBAPP} />
          ) : (
            <PricingCards planos={PLANOS_PLANILHA} />
          )}
        </div>

        <p className="mt-6 text-xs text-white/60">
          * Os preços exibidos são sugestões e podem variar conforme o escopo. A
          taxa de 4,99% é aplicada apenas em pagamentos com cartão via Mercado
          Pago.
        </p>
      </div>
    </section>
  );
}
/* ==================== /PRICING ==================== */

export default function Page() {
  const [ativo, setAtivo] = useState<Escolha>(null);
  const abrir = (x: Escolha) => setAtivo((prev) => (prev === x ? null : x));

  return (
    <main className="pb-20">
      {/* Cabeçalho */}
      <section className="pt-16 pb-10">
        <div className="max-w-6xl mx-auto px-4 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Nossas <span className="text-pink-400">soluções digitais</span>
          </h1>
          <p className="mt-6 text-white/80 max-w-2xl">
            Criamos sistemas que unem <strong>Google Apps Script</strong> +{" "}
            <strong>Google Drive</strong> com front-end moderno. Você escolhe:
            uma <em>planilha automatizada</em> que resolve agora ou um{" "}
            <em>WebApp completo</em> pronto para escalar.
          </p>
        </div>
      </section>

      {/* Cards de escolha */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Card WebApp */}
          <button
            type="button"
            onClick={() => abrir("webapp")}
            onMouseEnter={() => setAtivo("webapp")}
            className="text-left rounded-2xl border border-white/10 bg-white/5 p-6 transition
                       shadow-[0_8px_24px_rgba(230,62,136,.35)]
                       hover:translate-y-[-2px] hover:shadow-[0_12px_28px_rgba(230,62,136,.45)]
                       focus:outline-none focus:ring-2 focus:ring-pink-400/60"
            aria-expanded={ativo === "webapp"}
          >
            <h3 className="text-xl font-semibold mb-1">🚀 WebApp + Mobile</h3>
            <p className="text-white/80">
              Interfaces modernas e responsivas, integradas ao seu Google Drive.
              Sem servidores externos.
            </p>
          </button>

          {/* Card Planilha */}
          <button
            type="button"
            onClick={() => abrir("planilha")}
            onMouseEnter={() => setAtivo("planilha")}
            className="text-left rounded-2xl border border-white/10 bg-white/5 p-6 transition
                       shadow-[0_8px_24px_rgba(230,62,136,.35)]
                       hover:translate-y-[-2px] hover:shadow-[0_12px_28px_rgba(230,62,136,.45)]
                       focus:outline-none focus:ring-2 focus:ring-pink-400/60"
            aria-expanded={ativo === "planilha"}
          >
            <h3 className="text-xl font-semibold mb-1">
              📊 Planilhas Inteligentes
            </h3>
            <p className="text-white/80">
              Home automatizada, dashboards e relatórios. Tudo rodando direto na
              sua conta Google.
            </p>
          </button>
        </div>

        {/* Área de detalhes com vídeo */}
        <div className="relative mt-8">
          <AnimatePresence mode="wait">
            {ativo === "webapp" && (
              <motion.div
                key="det-webapp"
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-[0_8px_24px_rgba(230,62,136,.35)] backdrop-blur">
                  <h4 className="text-2xl font-semibold mb-3">
                    Por que escolher{" "}
                    <span className="text-pink-400">WebApp + Mobile?</span>
                  </h4>
                  <p className="text-white/80 mb-4">
                    Ideal para uma solução robusta, multiusuário e com navegação
                    por telas. Cresce junto com o negócio e integra Drive,
                    Gmail, Calendar e APIs externas.
                  </p>
                  <ul className="grid md:grid-cols-2 gap-2 text-white/85">
                    <li>✅ Login por usuário e perfis de acesso</li>
                    <li>✅ Experiência moderna (UI/UX) e responsiva</li>
                    <li>
                      ✅ Fluxos complexos (cadastros, agendas, documentos)
                    </li>
                    <li>✅ Escalável para novas funcionalidades</li>
                    <li>✅ App mobile para uso no celular</li>
                  </ul>

                  <ResponsiveVideo
                    src="https://youtu.be/ZzTN81tyglo"
                    title="Demonstração do WebApp LAAB"
                    muted
                    className="mx-auto max-w-[680px]"
                  />

                  <div className="mt-6">
                    <a
                      href="/contato"
                      className="inline-flex items-center rounded-xl px-5 py-3 font-semibold text-white
                                 shadow-[0_8px_24px_rgba(230,62,136,.35)] hover:opacity-95 active:opacity-90 transition"
                      style={{ background: "var(--rosa-laab)" }}
                    >
                      Quero um WebApp
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

            {ativo === "planilha" && (
              <motion.div
                key="det-planilha"
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-[0_8px_24px_rgba(230,62,136,.35)] backdrop-blur">
                  <h4 className="text-2xl font-semibold mb-3">
                    Por que escolher{" "}
                    <span className="text-pink-400">Planilha Inteligente?</span>
                  </h4>
                  <p className="text-white/80 mb-4">
                    Perfeita para começar rápido, com custo baixo e sem
                    hospedagem. Automatizações em Apps Script e dashboards
                    prontos.
                  </p>
                  <ul className="grid md:grid-cols-2 gap-2 text-white/85">
                    <li>✅ Implantação rápida e curva de uso mínima</li>
                    <li>✅ Home automatizada + relatórios dinâmicos</li>
                    <li>✅ Integração com Gmail/Forms/Drive</li>
                    <li>✅ Seus dados na sua conta Google (sem servidor)</li>
                  </ul>

                  <ResponsiveVideo
                    src="https://youtu.be/mNvU7pSWSZM"
                    title="Demonstração da Planilha Inteligente LAAB"
                    poster="/videos/poster-planilha.jpg"
                    muted
                    className="mx-auto max-w-[680px]"
                  />

                  <div className="mt-6">
                    <a
                      href="/contato"
                      className="inline-flex items-center rounded-xl px-5 py-3 font-semibold text-white
                                 shadow-[0_8px_24px_rgba(230,62,136,.35)] hover:opacity-95 active:opacity-90 transition"
                      style={{ background: "var(--rosa-laab)" }}
                    >
                      Quero uma Planilha
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ---------- NOSSAS PLATAFORMAS ---------- */}
          <section className="mt-14">
            <h1 className="text-3xl md:text-6xl font-bold text-center md:text-left mb-6">
              Nossas <span className="text-pink-400">plataformas</span>
            </h1>

            <div className="grid md:grid-cols-2 gap-8">
              {/* EDUC.AI */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_8px_24px_rgba(230,62,136,.35)] backdrop-blur">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">📚</span>
                  <div>
                    <h3 className="text-xl font-semibold">
                      <span className="text-pink-400">Educ</span>.AI —
                      Plataforma Educacional
                    </h3>
                    <p className="text-white/80">
                      Cursos, cadastros, trilhas, fóruns e repositório —
                      acompanhamento de alunas e relatórios.
                    </p>
                  </div>
                </div>
                <ul className="mt-3 grid grid-cols-1 gap-1 text-white/85 text-sm">
                  <li>• Diferentes perfis de acesso</li>
                  <li>• Entregas/atividades e feedbacks</li>
                  <li>• Cronograma de aula e atividades</li>
                  <li>• Repositório de Documentos</li>
                  <li>• Registros de escrita</li>
                  <li>• Drive integrado para materiais</li>
                  <li>• Certificados automatizados</li>
                  <li>• Tudo mais que você idealizar</li>
                </ul>
                <div className="mt-5 flex gap-3">
                  <a
                    href="/contato"
                    className="inline-flex items-center rounded-xl px-4 py-2 font-semibold text-white transition
                     shadow-[0_8px_24px_rgba(230,62,136,.35)] hover:opacity-95"
                    style={{ background: "var(--rosa-laab)" }}
                  >
                    Falar sobre o Educ.AI
                  </a>
                </div>
              </div>

              {/* CUID.AI */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_8px_24px_rgba(230,62,136,.35)] backdrop-blur">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">🩺</span>
                  <div>
                    <h3 className="text-xl font-semibold">
                      <span className="text-pink-400">Cuid</span>.AI — Saúde
                    </h3>
                    <p className="text-white/80">
                      Prontuário + agenda + evolução. Ideal para clínicas e
                      profissionais (psicologia, nutrição, etc.).
                    </p>
                  </div>
                </div>
                <ul className="mt-3 grid grid-cols-1 gap-1 text-white/85 text-sm">
                  <li>• Perfis diferentes de acesso</li>
                  <li>• Chat com IA para dúvidas</li>
                  <li>• Fichas, evoluções e anexos</li>
                  <li>• Agenda com lembretes</li>
                  <li>• Relatórios e histórico</li>
                </ul>
                <div className="mt-5 flex gap-3">
                  <a
                    href="/contato"
                    className="inline-flex items-center rounded-xl px-4 py-2 font-semibold text-white transition
                     shadow-[0_8px_24px_rgba(230,62,136,.35)] hover:opacity-95"
                    style={{ background: "var(--rosa-laab)" }}
                  >
                    Falar sobre o Cuid.AI
                  </a>
                </div>
              </div>

              {/* VEND.AI */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_8px_24px_rgba(230,62,136,.35)] backdrop-blur">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">💼</span>
                  <div>
                    <h3 className="text-xl font-semibold">
                      <span className="text-pink-400">Vend</span>.AI — Gestão de
                      Vendas & Estoque
                    </h3>
                    <p className="text-white/80">
                      Controle de pedidos, clientes, estoque e indicadores —
                      simples e direto ao ponto.
                    </p>
                  </div>
                </div>
                <ul className="mt-3 grid grid-cols-1 gap-1 text-white/85 text-sm">
                  <li>• Cadastro de produtos e entradas/saídas</li>
                  <li>• Registro de vendas com automatização no estoque</li>
                  <li>• Controle de estoque</li>
                  <li>• Dashboard de vendas e metas</li>
                  <li>• Livro Caixa</li>
                  <li>• Integração com Sheets/Drive</li>
                </ul>
                <div className="mt-5 flex gap-3">
                  <a
                    href="/contato"
                    className="inline-flex items-center rounded-xl px-4 py-2 font-semibold text-white transition
                     shadow-[0_8px_24px_rgba(230,62,136,.35)] hover:opacity-95"
                    style={{ background: "var(--rosa-laab)" }}
                  >
                    Falar sobre o Vend.AI
                  </a>
                </div>
              </div>

              {/* AGEND.AI */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_8px_24px_rgba(230,62,136,.35)] backdrop-blur">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">📅</span>
                  <div>
                    <h3 className="text-xl font-semibold">
                      <span className="text-pink-400">Agend</span>.AI —
                      Agendamentos
                    </h3>
                    <p className="text-white/80">
                      Agendamento com lembretes, confirmação e histórico — tudo
                      no seu Google.
                    </p>
                  </div>
                </div>
                <ul className="mt-3 grid grid-cols-1 gap-1 text-white/85 text-sm">
                  <li>• Calendário e bloqueios</li>
                  <li>• Lembretes por e-mail</li>
                  <li>• Relatórios por período</li>
                </ul>
                <div className="mt-5 flex gap-3">
                  <a
                    href="/contato"
                    className="inline-flex items-center rounded-xl px-4 py-2 font-semibold text-white transition
                     shadow-[0_8px_24px_rgba(230,62,136,.35)] hover:opacity-95"
                    style={{ background: "var(--rosa-laab)" }}
                  >
                    Falar sobre o Agend.AI
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ====== PRICING (novo) ====== */}
          <PricingSection />
        </div>
      </section>
    </main>
  );
}
