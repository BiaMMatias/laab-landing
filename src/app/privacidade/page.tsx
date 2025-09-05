export const metadata = {
  title: "Política de Privacidade • LAAB Tech",
};

export default function PagePrivacidade() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold">
        Política de Privacidade
      </h1>
      <p className="mt-2 text-white/70">Última atualização: 05/09/2025</p>

      <div className="prose prose-invert mt-6">
        <p>
          A LAAB Tech valoriza sua privacidade e está comprometida em proteger
          os dados pessoais, conforme a LGPD (Lei nº 13.709/2018).
        </p>

        <h2>1. Quais dados coletamos</h2>
        <ul>
          <li>Nome, e-mail, telefone/WhatsApp, instituição/empresa;</li>
          <li>Dados de navegação (IP, cookies, páginas acessadas);</li>
          <li>Informações para propostas, contratação e suporte.</li>
        </ul>

        <h2>2. Como usamos seus dados</h2>
        <ul>
          <li>Responder contato e orçamentos;</li>
          <li>Fornecer acesso a produtos e serviços;</li>
          <li>Enviar novidades e materiais (quando consentido);</li>
          <li>Cumprir obrigações legais e contratuais.</li>
        </ul>

        <h2>3. Compartilhamento</h2>
        <p>
          Podemos compartilhar dados com provedores essenciais, como Mercado
          Pago (pagamentos) e Google Workspace/Drive (infra). Não vendemos
          dados.
        </p>

        <h2>4. Armazenamento e segurança</h2>
        <p>
          Adotamos medidas técnicas e administrativas para proteger seus dados.
          Em algumas soluções, eles residem na própria conta Google do cliente.
        </p>

        <h2>5. Direitos do titular</h2>
        <p>
          Você pode solicitar acesso, correção, exclusão, portabilidade e
          informações sobre o tratamento. Contato:{" "}
          <a href="mailto:contato@laabtech.com.br">contato@laabtech.com.br</a>.
        </p>

        <h2>6. Cookies</h2>
        <p>
          Usamos cookies para funcionalidade, análise e (se aplicável)
          marketing. Você pode gerenciar suas preferências no banner de cookies.
        </p>

        <h2>7. Alterações</h2>
        <p>
          Esta Política pode ser atualizada. A versão vigente fica nesta página.
        </p>

        <h2>8. Contato</h2>
        <p>
          Dúvidas:{" "}
          <a href="mailto:contato@laabtech.com.br">contato@laabtech.com.br</a>
        </p>
      </div>
    </main>
  );
}
