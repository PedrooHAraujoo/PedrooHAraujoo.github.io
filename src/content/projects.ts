import type { L, Lang } from "./profile";

// Cada número citado aqui tem origem em arquivo do próprio projeto (README,
// migrações, histórico do git, relatório de teste). A origem fica em `source`.

export type Metric = { value: string; label: L; source?: string };
export type Decision = { title: L; body: L };

export type Project = {
  slug: string;
  index: string;
  title: string;
  kicker: L;
  tagline: L;
  status: L;
  live: boolean;
  role: L;
  period: L;
  stack: string[];
  links: { label: L; href: string }[];
  cover: { kind: "shot"; src: string; alt: L; mobile?: string } | { kind: "figure"; figure: "route" | "api" | "plate" };
  extraShot?: { src: string; alt: L };
  metrics: Metric[];
  context: L;
  built: Record<Lang, string[]>;
  decisions: Decision[];
  ai: L;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "ambiance",
    index: "01",
    title: "Ambiance AirScents",
    kicker: { pt: "E-commerce · Estados Unidos", en: "E-commerce · United States" },
    tagline: {
      pt: "Loja virtual completa, do primeiro commit à produção: pagamento, frete, estoque e painel administrativo.",
      en: "A complete online store, from first commit to production: payments, shipping, inventory and an admin panel.",
    },
    status: { pt: "Em produção", en: "In production" },
    live: true,
    role: { pt: "Desenvolvedor full stack, único autor", en: "Full stack developer, sole author" },
    period: { pt: "ago. 2026 – atual", en: "Aug 2026 – present" },
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Stripe", "Playwright", "Vercel"],
    links: [{ label: { pt: "Abrir a loja", en: "Open the store" }, href: "https://ambianceairscents.com" }],
    cover: {
      kind: "shot",
      src: "/shots/ambiance-home.webp",
      mobile: "/shots/ambiance-mobile.webp",
      alt: { pt: "Página inicial da loja Ambiance AirScents", en: "Ambiance AirScents store home page" },
    },
    metrics: [
      { value: "158", label: { pt: "commits, autor único", en: "commits, sole author" }, source: "git log" },
      { value: "15", label: { pt: "tabelas com Row Level Security", en: "tables with Row Level Security" }, source: "supabase/migrations" },
      { value: "18", label: { pt: "scripts de verificação automatizada", en: "automated verification scripts" }, source: "package.json" },
      { value: "0", label: { pt: "violações WCAG 2.1 AA em 17 rotas", en: "WCAG 2.1 AA violations across 17 routes" }, source: "scripts/audit.mjs" },
    ],
    context: {
      pt: "A Ambiance AirScents vende difusores de aroma a frio e 17 fragrâncias para casas e empresas nos Estados Unidos. A marca saía de um site em WordPress e precisava de uma loja própria: rápida, com checkout confiável e simples de operar por quem cuida dos pedidos no dia a dia.",
      en: "Ambiance AirScents sells cold-air scent diffusers and 17 fragrances to homes and businesses in the United States. The brand was leaving a WordPress site and needed a store of its own: fast, with a reliable checkout and easy to run for the people handling orders every day.",
    },
    built: {
      pt: [
        "Catálogo com fragrâncias, aparelhos e combos, carrinho persistente e conta de cliente com senha ou link mágico.",
        "Checkout com Stripe, imposto automático (Stripe Tax) e cotação real de frete USPS e FedEx.",
        "Painel administrativo: pedidos, envio, cancelamento com estorno, estoque, alertas e edição das fragrâncias.",
        "E-mails transacionais e alertas operacionais por e-mail e webhook.",
        "SEO de migração: redirecionamentos 301 do site antigo, JSON-LD de produto, sitemap e imagem de compartilhamento.",
      ],
      en: [
        "Catalogue with fragrances, devices and bundles, persistent cart and customer accounts with password or magic link.",
        "Checkout with Stripe, automatic tax (Stripe Tax) and live USPS and FedEx shipping rates.",
        "Admin panel: orders, fulfilment, cancel-and-refund, inventory, alerts and fragrance editing.",
        "Transactional emails and operational alerts by email and webhook.",
        "Migration SEO: 301 redirects from the old site, product JSON-LD, sitemap and social sharing image.",
      ],
    },
    decisions: [
      {
        title: { pt: "O navegador nunca decide o preço", en: "The browser never decides the price" },
        body: {
          pt: "O cliente envia só a intenção de compra. O servidor recalcula cada linha a partir do catálogo e se recusa a abrir a sessão de pagamento quando o preço ativo na Stripe não bate exatamente.",
          en: "The client only sends purchase intent. The server recomputes every line from the catalogue and refuses to open the payment session when the active Stripe price does not match exactly.",
        },
      },
      {
        title: { pt: "Webhook processado exatamente uma vez", en: "Webhooks processed exactly once" },
        body: {
          pt: "A assinatura é verificada e o evento é registrado em tabela própria antes de qualquer efeito. Se o processamento falha, o registro é devolvido para a Stripe tentar de novo; se o banco cai, a resposta é 503.",
          en: "The signature is verified and the event is recorded in its own table before any side effect. If processing fails the claim is released so Stripe retries; if the database is down the answer is 503.",
        },
      },
      {
        title: { pt: "Cancelar sem estornar em dobro", en: "Cancelling without refunding twice" },
        body: {
          pt: "A passagem de pago para cancelado é uma escrita condicional e o estorno usa chave de idempotência. Clique duplo ou dois aparelhos abertos não geram um segundo estorno, e o estoque volta por função no banco.",
          en: "The paid-to-cancelled transition is a conditional write and the refund uses an idempotency key. A double click or two open devices never produce a second refund, and stock is returned by a database function.",
        },
      },
      {
        title: { pt: "Segurança em camadas", en: "Security in layers" },
        body: {
          pt: "RLS nas 15 tabelas, funções com search_path fixo e execução revogada para anônimos, CSP medida em modo relatório antes de valer, limite de requisições e sessão de administrador com expiração própria.",
          en: "RLS on all 15 tables, functions with a pinned search_path and execution revoked from anonymous users, CSP measured in report-only mode before enforcement, rate limiting and an admin session with its own expiry.",
        },
      },
      {
        title: { pt: "Verificar contra o sistema vivo", en: "Verify against the live system" },
        body: {
          pt: "Em vez de simular tudo, 18 scripts exercitam Stripe, Supabase e o navegador com Playwright: regras de acesso, webhook, cancelamento, XSS e impostos. A auditoria de acessibilidade roda o axe-core em 17 rotas, em desktop e celular.",
          en: "Instead of mocking everything, 18 scripts exercise Stripe, Supabase and the browser through Playwright: access rules, webhook, cancellation, XSS and tax. The accessibility audit runs axe-core on 17 routes, desktop and mobile.",
        },
      },
    ],
    ai: {
      pt: "Desenvolvido com Claude Code como par de programação. O runbook do projeto separa, tarefa por tarefa, o que é meu e o que é do agente; modelo de dados, regras de negócio, revisão e cada publicação passam por mim.",
      en: "Built with Claude Code as a pair programmer. The project runbook splits, task by task, what is mine and what is the agent's; data model, business rules, review and every release go through me.",
    },
    featured: true,
  },
  {
    slug: "solstead",
    index: "02",
    title: "Solstead",
    kicker: { pt: "Plataforma web + PWA · Orlando, EUA", en: "Web platform + PWA · Orlando, USA" },
    tagline: {
      pt: "Gestão de imóveis com site público em três idiomas e um portal instalável para gestor, proprietário, inquilino e prestador.",
      en: "Property management with a public site in three languages and an installable portal for managers, owners, tenants and vendors.",
    },
    status: { pt: "Demonstração pública · em desenvolvimento", en: "Public demo · in development" },
    live: true,
    role: { pt: "Desenvolvedor full stack", en: "Full stack developer" },
    period: { pt: "nov. 2026 – atual", en: "Nov 2026 – present" },
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "PostgreSQL", "Supabase", "PGlite", "Zod", "Vitest", "PWA"],
    links: [{ label: { pt: "Abrir a demonstração", en: "Open the demo" }, href: "https://solstead-demo.vercel.app" }],
    cover: {
      kind: "shot",
      src: "/shots/solstead-portal.webp",
      alt: { pt: "Painel do gestor na demonstração do Solstead", en: "Manager dashboard in the Solstead demo" },
    },
    extraShot: {
      src: "/shots/solstead-home.webp",
      alt: { pt: "Site público do Solstead", en: "Solstead public website" },
    },
    metrics: [
      { value: "68", label: { pt: "tabelas, todas com Row Level Security", en: "tables, all with Row Level Security" }, source: "supabase/migrations" },
      { value: "113", label: { pt: "políticas de acesso no banco", en: "access policies in the database" }, source: "supabase/migrations" },
      { value: "3", label: { pt: "idiomas: inglês, português e espanhol", en: "languages: English, Portuguese, Spanish" }, source: "src/i18n" },
      { value: "5", label: { pt: "perfis de usuário com visões próprias", en: "user roles with their own views" }, source: "README" },
    ],
    context: {
      pt: "Um proprietário de imóveis de aluguel na Flórida Central precisava de um lugar só para o inquilino pedir um conserto, o dono aprovar o orçamento e o prestador registrar o serviço. Hoje isso acontece por mensagem e telefone. O nome é provisório e a demonstração usa apenas dados fictícios.",
      en: "An owner of rental homes in Central Florida needed one place for the tenant to request a repair, the owner to approve the quote and the vendor to log the job. Today that happens over messages and phone calls. The name is provisional and the demo only uses fictional data.",
    },
    built: {
      pt: [
        "Chamados de manutenção de ponta a ponta: fotos, orçamento, limite de aprovação, agendamento e recibo.",
        "Cadastro de proprietários, imóveis, inquilinos, contratos, anúncios e prestadores, com convites por e-mail.",
        "Relatórios de visita em PDF, extratos em CSV e PDF, financeiro com razão contábil e conciliação mensal.",
        "PWA instalável com página offline e site público com SEO internacional (hreflang, sitemap, dados estruturados).",
        "Modo demonstração que sobe sem credenciais, para o cliente experimentar cada perfil.",
      ],
      en: [
        "End-to-end maintenance requests: photos, quote, approval limit, scheduling and receipt.",
        "Records for owners, properties, tenants, leases, listings and vendors, with email invitations.",
        "Visit reports in PDF, statements in CSV and PDF, accounting ledger and monthly reconciliation.",
        "Installable PWA with offline page and a public site with international SEO (hreflang, sitemap, structured data).",
        "Demo mode that boots without credentials so the client can try every role.",
      ],
    },
    decisions: [
      {
        title: { pt: "O banco decide quem vê o quê", en: "The database decides who sees what" },
        body: {
          pt: "Toda tabela tem controle por linha. A aplicação só fala com o banco por três portas (usuário, anônimo e sistema), e um recurso que não existe responde igual a um recurso proibido, para não vazar informação.",
          en: "Every table has row-level control. The application only reaches the database through three doors (user, anonymous and system), and a missing resource answers exactly like a forbidden one, so nothing leaks.",
        },
      },
      {
        title: { pt: "A demonstração roda as migrações da produção", en: "The demo runs production migrations" },
        body: {
          pt: "Em vez de dados falsos em memória, a demonstração sobe um PostgreSQL dentro do processo (PGlite) com as mesmas migrações. Os identificadores são determinísticos para funcionar em ambiente serverless.",
          en: "Instead of in-memory fake data, the demo boots PostgreSQL inside the process (PGlite) with the same migrations. Identifiers are deterministic so it works in a serverless environment.",
        },
      },
      {
        title: { pt: "Dinheiro em centavos e histórico imutável", en: "Money in cents and immutable history" },
        body: {
          pt: "Valores são inteiros em centavos e lançamento não se edita: erro se corrige com estorno. A trilha de auditoria é encadeada por hash.",
          en: "Amounts are integer cents and ledger entries are never edited: mistakes are corrected with a reversal. The audit trail is hash-chained.",
        },
      },
      {
        title: { pt: "Nada simulado se passa por real", en: "Nothing simulated poses as real" },
        body: {
          pt: "O que ainda não foi confirmado pelo cliente fica nulo na configuração, e o build se recusa a entrar no estágio de produção enquanto algo estiver incompleto.",
          en: "Anything not yet confirmed by the client stays null in configuration, and the build refuses to enter the production stage while something is incomplete.",
        },
      },
    ],
    ai: {
      pt: "Desenvolvido com Claude Code. As convenções ficam escritas no repositório (arquitetura, modelo de dados, lista de lançamento) e a bateria de testes roda antes de cada entrega; eu defino o escopo com o cliente e aprovo cada publicação.",
      en: "Built with Claude Code. Conventions are written in the repository (architecture, data model, launch checklist) and the test suite runs before every delivery; I define scope with the client and approve every release.",
    },
    featured: true,
  },
  {
    slug: "central-logistica",
    index: "03",
    title: "Central Logística",
    kicker: { pt: "Telemetria de frota · tempo real", en: "Fleet telemetry · real time" },
    tagline: {
      pt: "Painel que compara a rota planejada com a rota executada a partir do GPS dos veículos.",
      en: "A dashboard that compares the planned route with the executed route from vehicle GPS data.",
    },
    status: { pt: "Operação real · cliente não divulgado", en: "Real operation · client undisclosed" },
    live: false,
    role: {
      pt: "Algoritmos de trajeto, dados, segurança e testes",
      en: "Route algorithms, data, security and tests",
    },
    period: { pt: "mai. – set. 2026", en: "May – Sep 2026" },
    stack: ["React 19", "TypeScript", "TanStack Start", "TanStack Query", "Supabase", "MapLibre", "Leaflet", "Vitest", "Cloudflare Workers", "n8n"],
    links: [],
    cover: { kind: "figure", figure: "route" },
    metrics: [
      { value: "19,7% → 3,6%", label: { pt: "erro do trajeto frente ao hodômetro", en: "route error against the odometer" }, source: "PLANO-DE-ACAO.md" },
      { value: "83", label: { pt: "testes automatizados (Vitest)", en: "automated tests (Vitest)" }, source: "src/**/*.test.ts" },
      { value: "6", label: { pt: "telas: operação, alertas, performance, histórico", en: "screens: operation, alerts, performance, history" }, source: "src/routes" },
    ],
    context: {
      pt: "Uma empresa com frota própria acompanhava os veículos por telemetria, mas não conseguia responder a pergunta que importa: o veículo fez a rota planejada? O trajeto desenhado a partir do GPS bruto errava a quilometragem em quase 20%.",
      en: "A company with its own fleet tracked its vehicles through telemetry but could not answer the question that matters: did the vehicle follow the planned route? The path drawn from raw GPS was off by almost 20% in distance.",
    },
    built: {
      pt: [
        "Reconstrução do trajeto executado a partir do GPS, com a geometria da API de rotas como guia.",
        "Aderência à rota e detecção de visita às paradas.",
        "Replay do trajeto e janela de operação, inclusive com duas operações do mesmo veículo no dia.",
        "Telas de operação, alertas, performance e histórico.",
      ],
      en: [
        "Reconstruction of the executed route from GPS, guided by the routing API geometry.",
        "Route adherence and stop-visit detection.",
        "Route replay and operation window, including two operations by the same vehicle in one day.",
        "Operation, alerts, performance and history screens.",
      ],
    },
    decisions: [
      {
        title: { pt: "Uma única função reconstrói o trajeto", en: "One function rebuilds the route" },
        body: {
          pt: "A geometria que vem da API de rotas é classificada como completa, parcial ou ausente, e o GPS bruto entra como reserva. Toda tela usa a mesma função, então o mapa e os indicadores nunca discordam.",
          en: "Geometry from the routing API is classified as complete, partial or missing, with raw GPS as the fallback. Every screen uses the same function, so the map and the indicators never disagree.",
        },
      },
      {
        title: { pt: "Validar contra o hodômetro", en: "Validate against the odometer" },
        body: {
          pt: "O critério de aceite foi um número externo ao sistema: 389,3 km reconstruídos contra 404,0 km reais no hodômetro. O erro caiu de 19,7% para 3,6%.",
          en: "The acceptance criterion was a number from outside the system: 389.3 km reconstructed against 404.0 km on the odometer. Error dropped from 19.7% to 3.6%.",
        },
      },
      {
        title: { pt: "Segredo não vai para o navegador", en: "Secrets do not ship to the browser" },
        body: {
          pt: "A chave da API de rotas saiu do pacote do cliente e um hook de pre-commit passou a barrar segredos antes de chegarem ao repositório.",
          en: "The routing API key was removed from the client bundle and a pre-commit hook now blocks secrets before they reach the repository.",
        },
      },
      {
        title: { pt: "Menos tráfego, mesma informação", en: "Less traffic, same information" },
        body: {
          pt: "A atualização periódica pausa quando a aba está oculta e as consultas pedem só as colunas usadas, reduzindo o consumo de saída do banco.",
          en: "Polling pauses when the tab is hidden and queries request only the columns in use, cutting database egress.",
        },
      },
    ],
    ai: {
      pt: "A interface foi gerada no Lovable, e a maior parte dos commits do repositório é do agente. O meu trabalho manual está nos algoritmos de trajeto e aderência, na validação contra o hodômetro, em segurança, desempenho e testes.",
      en: "The interface was generated with Lovable, and most commits in the repository belong to the agent. My manual work is in the route and adherence algorithms, validation against the odometer, security, performance and tests.",
    },
    featured: true,
  },
  {
    slug: "jucara-melo",
    index: "04",
    title: "Juçara Melo",
    kicker: { pt: "Site institucional · estética", en: "Business website · aesthetics" },
    tagline: {
      pt: "Site de uma biomédica esteta, com identidade editorial e carregamento rápido no celular.",
      en: "Website for an aesthetic biomedical professional, with an editorial identity and fast mobile loading.",
    },
    status: { pt: "Em produção", en: "In production" },
    live: true,
    role: { pt: "Design e desenvolvimento", en: "Design and development" },
    period: { pt: "out. – nov. 2026", en: "Oct – Nov 2026" },
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Framer Motion", "Vercel"],
    links: [{ label: { pt: "Abrir o site", en: "Open the site" }, href: "https://jucaramelo.com.br" }],
    cover: {
      kind: "shot",
      src: "/shots/jucara-home.webp",
      mobile: "/shots/jucara-mobile.webp",
      alt: { pt: "Página inicial do site Juçara Melo", en: "Juçara Melo website home page" },
    },
    metrics: [
      { value: "72 → 90", label: { pt: "desempenho móvel no Lighthouse", en: "mobile Lighthouse performance" }, source: "commit 215a3b9 · Lighthouse 12, 16/11/2026 (4 medições: 89 a 92)" },
      { value: "100", label: { pt: "acessibilidade, SEO e boas práticas", en: "accessibility, SEO and best practices" }, source: "Lighthouse 12, 16/11/2026" },
      { value: "20", label: { pt: "documentos clínicos em PDF gerados por código", en: "clinical PDF documents generated by code" }, source: "scripts/gerar-*.mjs" },
    ],
    context: {
      pt: "A cliente tinha uma página única com as fotos embutidas no HTML (2,6 MB), sem domínio próprio e com o endereço canônico apontando para o Instagram. O pedido era reformular de verdade: outra cara, outro desempenho, e o agendamento continuando no WhatsApp.",
      en: "The client had a single page with photos embedded in the HTML (2.6 MB), no domain of her own and a canonical address pointing to Instagram. The brief was a real overhaul: a new look, new performance, with booking still happening over WhatsApp.",
    },
    built: {
      pt: [
        "Site em Next.js com linguagem editorial: tipografia serifada grande, fotos em destaque e animações discretas.",
        "Formulário de pré-avaliação que monta a mensagem do WhatsApp sem armazenar dado pessoal.",
        "SEO local com dados estruturados de clínica, domínio próprio, sitemap e imagem de compartilhamento.",
        "Dez fichas de anamnese e dez termos de consentimento em PDF, gerados por script com a identidade da marca.",
      ],
      en: [
        "Next.js site with an editorial language: large serif type, prominent photography and discreet animation.",
        "Pre-assessment form that composes the WhatsApp message without storing personal data.",
        "Local SEO with clinic structured data, custom domain, sitemap and sharing image.",
        "Ten intake forms and ten consent forms in PDF, generated by script in the brand identity.",
      ],
    },
    decisions: [
      {
        title: { pt: "O conteúdo nasce visível", en: "Content is born visible" },
        body: {
          pt: "Na primeira versão, 31 blocos saíam do servidor invisíveis e só apareciam depois que cerca de 650 KB de JavaScript carregavam. Passei as entradas para CSS com componentes de servidor: o HTML já chega legível e a animação é um acréscimo.",
          en: "In the first version, 31 blocks left the server invisible and only appeared after roughly 650 KB of JavaScript loaded. I moved the entrances to CSS with server components: the HTML arrives readable and animation is an enhancement.",
        },
      },
      {
        title: { pt: "Animação que o celular aguenta", en: "Animation a phone can handle" },
        body: {
          pt: "A biblioteca de animação ficou só onde é indispensável, carregada sob demanda. Efeitos pesados de desfoque e mistura são desligados em telas de toque.",
          en: "The animation library stays only where it is indispensable, loaded on demand. Heavy blur and blend effects are turned off on touch screens.",
        },
      },
      {
        title: { pt: "Documento gerado, não editado", en: "Documents generated, not edited" },
        body: {
          pt: "As fichas e os termos saem de um script, com as perguntas no código e o estilo num módulo comum. Mudou um texto, gera-se tudo de novo com o mesmo visual.",
          en: "Forms and consent documents come out of a script, with the questions in code and the style in a shared module. Change a sentence and everything is regenerated with the same look.",
        },
      },
    ],
    ai: {
      pt: "Desenvolvido com Claude Code. O briefing com a cliente, as rodadas de revisão e a decisão sobre o que entra no ar foram conduzidos por mim.",
      en: "Built with Claude Code. The brief with the client, the review rounds and the decision on what goes live were led by me.",
    },
    featured: true,
  },
  {
    slug: "liga-maximus",
    index: "05",
    title: "Liga Maximus",
    kicker: { pt: "API em Python · imobiliária", en: "Python API · real estate" },
    tagline: {
      pt: "API REST do aplicativo de ranking e premiação das equipes de vendas de uma imobiliária.",
      en: "REST API for a real estate company's sales team ranking and rewards app.",
    },
    status: { pt: "Encerrado · código aberto", en: "Finished · open source" },
    live: false,
    role: { pt: "Desenvolvedor back-end, em equipe de 3", en: "Back end developer, team of 3" },
    period: { pt: "out. 2024 – fev. 2025", en: "Oct 2024 – Feb 2025" },
    stack: ["Python", "Flask 3", "SQLAlchemy", "SQLite", "JWT", "bcrypt", "pytest"],
    links: [{ label: { pt: "Ver o código no GitHub", en: "View the code on GitHub" }, href: "https://github.com/PedrooHAraujoo/Liga_BackEnd" }],
    cover: { kind: "figure", figure: "api" },
    metrics: [
      { value: "150", label: { pt: "dos 167 commits do repositório", en: "of the repository's 167 commits" }, source: "GitHub" },
      { value: "20", label: { pt: "endpoints REST", en: "REST endpoints" }, source: "routes.py · painel.py" },
      { value: "8", label: { pt: "modelos de dados", en: "data models" }, source: "models.py" },
    ],
    context: {
      pt: "Meu primeiro projeto profissional. A imobiliária queria transformar metas de vendas em uma liga: equipes, rankings e pontuação por tipo de resultado. Fiquei com o back-end que serve o aplicativo.",
      en: "My first professional project. The company wanted to turn sales targets into a league: teams, rankings and scores by type of result. I owned the back end that serves the app.",
    },
    built: {
      pt: [
        "Cadastro, login, perfil, redefinição de senha e envio de imagem.",
        "Painel administrativo com CRUD de equipes, rankings e usuários.",
        "Cadastro com aprovação: o usuário nasce pendente e só entra depois de liberado.",
        "Testes de integração das rotas de usuário.",
      ],
      en: [
        "Sign-up, login, profile, password reset and image upload.",
        "Admin panel with CRUD for teams, rankings and users.",
        "Sign-up with approval: users start as pending and only get in once approved.",
        "Integration tests for the user routes.",
      ],
    },
    decisions: [
      {
        title: { pt: "Permissão como dado, não como código", en: "Permissions as data, not code" },
        body: {
          pt: "Cargos e permissões ficam em tabelas, e um decorador verifica a permissão em cada rota. Criar um cargo novo não exige mexer no código.",
          en: "Roles and permissions live in tables, and a decorator checks permission on each route. Creating a new role does not require touching code.",
        },
      },
      {
        title: { pt: "Autenticação sem atalho", en: "Authentication without shortcuts" },
        body: {
          pt: "Token JWT com tratamento de expiração e senha armazenada com bcrypt.",
          en: "JWT tokens with expiry handling and passwords stored with bcrypt.",
        },
      },
    ],
    ai: {
      pt: "Foi neste projeto que aprendi Flask, SQLAlchemy e GitFlow na prática, trabalhando em equipe com outros dois desenvolvedores.",
      en: "This is the project where I learned Flask, SQLAlchemy and GitFlow in practice, working in a team with two other developers.",
    },
    featured: false,
  },
  {
    slug: "certifica",
    index: "06",
    title: "Certifica",
    kicker: { pt: "Prova de conceito · IA aplicada", en: "Proof of concept · applied AI" },
    tagline: {
      pt: "Fotografar a plaqueta de um equipamento e sair com o relatório de certificação preenchido.",
      en: "Photograph an equipment nameplate and walk away with the certification report filled in.",
    },
    status: { pt: "Prova de conceito", en: "Proof of concept" },
    live: false,
    role: { pt: "Desenvolvedor full stack", en: "Full stack developer" },
    period: { pt: "out. 2026", en: "Oct 2026" },
    stack: ["Next.js 16", "TypeScript", "Gemini (visão)", "JSZip", "XML", "LibreOffice"],
    links: [],
    cover: { kind: "figure", figure: "plate" },
    metrics: [
      { value: "12 / 12", label: { pt: "campos lidos em plaqueta legível", en: "fields read on a legible plate" }, source: "testes/plaquetas/gabarito.json" },
      { value: "4–9 s", label: { pt: "por leitura", en: "per reading" }, source: "README" },
      { value: "10 / 12", label: { pt: "em plaqueta muito gasta", en: "on a heavily worn plate" }, source: "testes/plaquetas/gabarito.json" },
    ],
    context: {
      pt: "Uma empresa que certifica equipamentos de içamento digitava cada relatório à mão, a partir da plaqueta metálica do equipamento. A demonstração foi construída para uma reunião: mostrar que a leitura por IA funciona e, tão importante quanto, onde ela falha.",
      en: "A company that certifies lifting equipment typed every report by hand from the equipment's metal nameplate. The demo was built for one meeting: to show that AI reading works and, just as important, where it fails.",
    },
    built: {
      pt: [
        "Leitura da plaqueta pela câmera do celular, com saída estruturada e confiança por campo.",
        "Geração do relatório no arquivo do próprio cliente (XLSX) e de dois PDFs.",
        "Histórico com vencimentos e recertificação a partir de planilhas antigas.",
      ],
      en: [
        "Nameplate reading from the phone camera, with structured output and per-field confidence.",
        "Report generation in the client's own file (XLSX) plus two PDFs.",
        "History with expiry dates and recertification from old spreadsheets.",
      ],
    },
    decisions: [
      {
        title: { pt: "Respeitar o arquivo do cliente", en: "Respect the client's file" },
        body: {
          pt: "O relatório não é recriado: o XML do modelo original é remendado célula a célula, preservando gráfico, imagens e estilos que o cliente já usa.",
          en: "The report is not recreated: the original template's XML is patched cell by cell, preserving the chart, images and styles the client already uses.",
        },
      },
      {
        title: { pt: "Dizer onde a IA erra", en: "Say where the AI fails" },
        body: {
          pt: "Em plaqueta gasta o modelo erra com confiança alta. Isso está medido num gabarito com plaquetas reais e documentado; por isso a conferência humana continua obrigatória.",
          en: "On worn plates the model is wrong with high confidence. That is measured against an answer key with real plates and documented; human review therefore stays mandatory.",
        },
      },
    ],
    ai: {
      pt: "Aqui a IA é o produto: visão do Gemini com resposta estruturada, alternância entre dois modelos quando um fica indisponível e limite de 30 segundos por leitura.",
      en: "Here AI is the product: Gemini vision with structured output, failover between two models when one is unavailable, and a 30-second limit per reading.",
    },
    featured: false,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
