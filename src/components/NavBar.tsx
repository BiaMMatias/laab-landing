"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  // fecha o menu ao trocar de rota pelo Link
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#0b1220]/80 border-b border-white/10 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image
            src="/laab-logo.png"
            width={40}
            height={40}
            alt="Logo LAAB Tech"
            className="rounded-full"
          />
          LAAB <span className="text-pink-400">TECH</span>
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex gap-6 text-white/80">
          <Link className="hover:text-white" href="/quem-somos">
            Quem Somos
          </Link>
          <Link className="hover:text-white" href="/solucoes">
            Soluções
          </Link>
          <Link className="hover:text-white" href="/contato">
            Contato
          </Link>
        </nav>

        {/* Botão mobile */}
        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/15 text-white/90 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-pink-400/60"
          aria-label="Abrir menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {/* Ícone hambúrguer / X */}
          <svg
            className={`transition-transform ${open ? "rotate-90" : ""}`}
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
          >
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Menu mobile */}
      <div
        id="mobile-menu"
        className={`md:hidden transition-[max-height,opacity] duration-300 overflow-hidden border-t border-white/10 bg-[#0b1220]/95
          ${open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <nav className="px-4 py-3 flex flex-col gap-3 text-white/90">
          <Link
            className="hover:text-white"
            href="/quem-somos"
            onClick={() => setOpen(false)}
          >
            Quem Somos
          </Link>
          <Link
            className="hover:text-white"
            href="/solucoes"
            onClick={() => setOpen(false)}
          >
            Soluções
          </Link>
          <Link
            className="hover:text-white"
            href="/contato"
            onClick={() => setOpen(false)}
          >
            Contato
          </Link>
        </nav>
      </div>
    </header>
  );
}
