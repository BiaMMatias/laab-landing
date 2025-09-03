import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

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
        <header className="sticky top-0 z-50 bg-[#0b1220]/80 border-b border-white/10 backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image
                src="/laab-logo.png"
                width={50}
                height={50}
                alt="Logo LAAB Tech"
                className="rounded-full"
              />
              LAAB <span className="text-pink-400">TECH</span>
            </Link>
            <nav className="hidden md:flex gap-6 text-white/80">
              <a className="hover:text-white" href="/quem-somos">
                Quem Somos
              </a>
              <a className="hover:text-white" href="/solucoes">
                Soluções
              </a>
              {/* <a className="hover:text-white" href="/plataforma">
                Plataforma
              </a> */}
              <a className="hover:text-white" href="/contato">
                Contato
              </a>
              {/* <a className="hover:text-white" href="/blog">
                Blog
              </a> */}
            </nav>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 pb-10">{children}</main>

        <footer className="bg-[var(--rosa-laab)]/90 backdrop-blur border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-3 text-sm text-white/80 text-center">
            © {new Date().getFullYear()} LAAB TECH – Soluções digitais
          </div>
        </footer>
      </body>
    </html>
  );
}
