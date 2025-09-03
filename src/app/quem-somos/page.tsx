// src/app/quem-somos/page.tsx
import type { Metadata } from "next";

import InteractiveAbout from "@/components/InteractiveAbout";

export const metadata: Metadata = {
  title: "Quem somos | LAAB Tech",
  description:
    "Tecnologia com alma: soluções em Google Apps Script + Drive com front-end moderno, rodando na sua própria conta Google.",
};

export default function Page() {
  return (
    <main className="relative pb-20 mt-10">
      <InteractiveAbout />
      <section className="max-w-6xl mx-auto px-4 mt-70">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 text-center shadow-[0_8px_24px_rgba(230,62,136,.35)]">
          <h2 className="text-2xl md:text-3xl font-bold">
            Vamos construir algo <span className="text-pink-400">juntas</span>?
          </h2>
          <p className="mt-2 text-white/80">
            Conte sua ideia. A gente transforma em sistema, sem complicar sua
            operação.
          </p>
          <a
            href="/contato"
            className="mt-6 inline-flex items-center rounded-xl px-5 py-3 font-semibold text-white
                       shadow-[0_8px_24px_rgba(230,62,136,.35)] hover:opacity-95 active:opacity-90 transition"
            style={{ background: "var(--rosa-laab)" }}
          >
            Fale com a gente
          </a>
        </div>
      </section>
    </main>
  );
}
