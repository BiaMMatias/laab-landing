import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import CookieBanner from "@/components/CookieBanner";
import CookiePrefsButton from "@/components/CookiePrefsButton";

export const metadata: Metadata = {
  title: "LAAB TECH - Soluções digitais",
  description: "Tecnologia com alma para transformar o seu mundo.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {/* Topbar */}
        <NavBar />

        {/* Conteúdo principal */}
        <main className="max-w-6xl mx-auto px-4 pb-10">{children}</main>

        {/* Rodapé */}
        <footer className="bg-[var(--rosa-laab)]/90 backdrop-blur border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-3 text-sm text-white/80 flex flex-wrap items-center justify-between gap-3">
            <span>
              © {new Date().getFullYear()} LAAB TECH – Soluções digitais
            </span>

            <nav className="flex items-center gap-4">
              <a href="/privacidade" className="hover:underline">
                Política de Privacidade
              </a>
              {/* Botão client-side para reabrir preferências */}
              <CookiePrefsButton />
            </nav>
          </div>
        </footer>

        {/* LGPD: Banner (client) */}
        <CookieBanner />
      </body>
    </html>
  );
}
