"use client";

export default function CookiePrefsButton() {
  const reopen = () => {
    try {
      localStorage.removeItem("cookie-consent-v1"); // sua chave do banner
      window.location.reload();
    } catch {
      // noop
    }
  };

  return (
    <button
      type="button"
      className="hover:underline"
      title="Reabrir preferências de cookies"
      onClick={reopen}
    >
      Preferências de Cookies
    </button>
  );
}
