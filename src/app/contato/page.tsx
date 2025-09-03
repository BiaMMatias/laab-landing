import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contato | LAAB Tech",
  description:
    "Fale com a LAAB Tech. Envie sua mensagem e retornamos rapidinho. Seus dados ficam na sua conta Google.",
};

export default function ContatoPage() {
  return (
    <main className="pb-20">
      {/* cabeçalho da seção */}
      <section className="relative py-14 mt-10">
        {/* overlay suave para legibilidade sobre o fundo */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(900px 420px at 20% 10%, rgba(230,62,136,.14), transparent 40%), " +
              "radial-gradient(800px 380px at 80% 0%, rgba(30,58,138,.12), transparent 45%), " +
              "linear-gradient(180deg, rgba(0,0,0,.25), rgba(0,0,0,.45))",
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-4">
          <h1 className="text-3xl md:text-4xl font-extrabold">Fale com <span className="text-pink-400">a gente</span></h1>
          <p className="mt-3 max-w-2xl text-white/80">
            Conte pra gente sobre seu projeto. Nosso formulário registra os dados e nos envia com segurança.
          </p>

          {/* card “vidro” com o form */}
          <div
            className="mt-8 rounded-2xl border p-6 md:p-8"
            style={{
              background: "var(--vidro, rgba(255,255,255,.12))",
              borderColor: "rgba(255,255,255,.22)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            <ContactForm />
          </div>

          {/* contato alternativo */}
          <div className="mt-6 text-white/70">
            <p>
              Ou, se preferir:{" "}
              <a
                href="mailto:contato@laab.tech"
                className="underline decoration-white/30 underline-offset-4 hover:text-white"
              >
                contato@laabtech.com.br
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}