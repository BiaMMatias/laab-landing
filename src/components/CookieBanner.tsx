"use client";
import { useEffect, useState } from "react";

type Consent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const KEY = "cookie-consent-v1";

export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [consent, setConsent] = useState<Consent>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (!saved) setOpen(true);
    } catch {}
  }, []);

  function save(choice: Consent) {
    localStorage.setItem(KEY, JSON.stringify({ ...choice, ts: Date.now() }));
    setOpen(false);
    // você pode disparar um evento window para reconfigurar scripts, se quiser
    window.dispatchEvent(new Event("cookie-consent-updated"));
  }

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="mx-auto max-w-4xl m-3 rounded-xl border border-white/10 bg-black/70 backdrop-blur p-4">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h3 className="font-semibold">Usamos cookies</h3>
            <p className="text-sm text-white/70 mt-1">
              Utilizamos cookies para melhorar sua experiência, analisar o
              tráfego e, se permitido, fins de marketing. Veja nossa{" "}
              <a href="/privacidade" className="underline">
                Política de Privacidade
              </a>
              .
            </p>

            <div className="mt-3 grid sm:grid-cols-3 gap-2 text-sm">
              <label className="flex items-center gap-2 rounded-lg border border-white/10 p-2">
                <input
                  type="checkbox"
                  checked
                  disabled
                  className="accent-pink-500"
                />
                Necessários (sempre ativos)
              </label>

              <label className="flex items-center gap-2 rounded-lg border border-white/10 p-2">
                <input
                  type="checkbox"
                  checked={consent.analytics}
                  onChange={(e) =>
                    setConsent((c) => ({ ...c, analytics: e.target.checked }))
                  }
                  className="accent-pink-500"
                />
                Analytics
              </label>

              <label className="flex items-center gap-2 rounded-lg border border-white/10 p-2">
                <input
                  type="checkbox"
                  checked={consent.marketing}
                  onChange={(e) =>
                    setConsent((c) => ({ ...c, marketing: e.target.checked }))
                  }
                  className="accent-pink-500"
                />
                Marketing
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() =>
                save({ necessary: true, analytics: false, marketing: false })
              }
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-sm"
            >
              Rejeitar
            </button>
            <button
              onClick={() => save(consent)}
              className="px-4 py-2 rounded-lg text-sm text-white"
              style={{ background: "var(--rosa-laab)" }}
            >
              Aceitar selecionados
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
