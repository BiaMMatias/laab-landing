import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "LAAB TECH - Soluções digitais",
  description: "Tecnologia com alma para transformar o seu mundo.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <NavBar />

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