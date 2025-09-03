"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import LogoIntro from "@/components/LogoIntro"; 

export default function Hero() {
  return (
    <section className="relative pt-20 pb-24 mt-10">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(1200px 600px at 20% 10%, rgba(255,79,154,.18), transparent 40%), " +
            "radial-gradient(1000px 500px at 80% 0%, rgba(145,209,255,.14), transparent 45%), " +
            "linear-gradient(180deg, rgba(0,0,0,.45) 0%, rgba(0,0,0,.65) 60%, rgba(0,0,0,.75) 100%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <LogoIntro /> 

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight"
        >
          Tecnologia com alma <span className="block text-pink-400">para transformar o seu mundo</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mt-6 text-lg md:text-xl text-white/85 max-w-3xl mx-auto" 
        >
          Sistemas em <strong>Google Apps Script</strong> + <strong>Google Drive</strong>, rodando na{" "}
          <strong>sua conta Google</strong>. Sem hospedagem externa, com seus dados sob seu controle.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="mt-8 flex flex-wrap gap-3 justify-center" 
        >
          <Link href="/solucoes" className="inline-flex items-center rounded-2xl px-5 py-3 bg-pink-500 font-semibold text-white shadow-[0_10px_28px_rgba(255,79,154,.35)] hover:opacity-95 active:opacity-90 transition">
            Conheça nossas soluções
          </Link>
          <Link href="/contato" className="inline-flex items-center rounded-2xl px-5 py-3 border border-white/20 bg-white/5 text-white hover:bg-white/10 transition">
            Fale com a gente
          </Link>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 flex flex-wrap gap-2 justify-center" 
          aria-label="Diferenciais"
        >
          {["Apps Script", "Google Drive", "Sem hospedagem", "Você controla os dados"].map((t) => (
            <li key={t} className="px-3 py-1 rounded-full text-sm border border-white/15 bg-white/5 text-white/90">
              {t}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}