export default function WebAppVsPlanilha() {
  return (
    <section className="pt-20 pb-24 bg-white/5 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          WebApp ou Planilha Inteligente? <br />
          <span className="text-pink-400">Você escolhe o que faz sentido</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* WebApp */}
          <div className="bg-white/5 rounded-2xl p-8 shadow-[0_8px_24px_rgba(230,62,136,.35)]">
            <h3 className="text-2xl font-semibold mb-4">🚀 WebApp + Mobile</h3>
            <p className="text-white/80 mb-4">
              Ideal para quem precisa de uma solução mais robusta, com várias
              telas, acesso simultâneo de usuários e interface moderna.
            </p>
            <ul className="space-y-2 text-white/80">
              <li>✅ Acesso de qualquer lugar (web + mobile)</li>
              <li>✅ Login por usuário</li>
              <li>✅ Visual moderno e interativo</li>
              <li>✅ Escala fácil para mais funcionalidades</li>
            </ul>
          </div>

          {/* Planilhas */}
          <div className="bg-white/5 rounded-2xl p-8 shadow-[0_8px_24px_rgba(230,62,136,.35)]">
            <h3 className="text-2xl font-semibold mb-4">
              📊 Planilhas Inteligentes
            </h3>
            <p className="text-white/80 mb-4">
              Perfeita para quem quer praticidade imediata. Rápida de configurar
              e rodando direto na sua conta Google, sem depender de servidores.
            </p>
            <ul className="space-y-2 text-white/80">
              <li>✅ Mais simples e rápida de implementar</li>
              <li>✅ Dashboard inicial já pronto</li>
              <li>✅ Automatizações no Google Apps Script</li>
              <li>✅ Sem custo extra de hospedagem</li>
            </ul>
          </div>
        </div>

        <p className="mt-12 text-center text-white/70 max-w-2xl mx-auto">
          Tanto no WebApp quanto nas Planilhas, sua solução roda diretamente na{" "}
          <strong>sua conta Google</strong>, garantindo total controle dos seus
          dados.
        </p>
      </div>
    </section>
  );
}
