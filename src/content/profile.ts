// Fonte única de verdade do perfil: o site, o currículo em PDF e os textos do
// LinkedIn saem daqui. Mudou um cargo ou uma data? Edite só este arquivo.

export type Lang = "pt" | "en";
export type L = Record<Lang, string>;
export const t = (value: L, lang: Lang) => value[lang];

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://pedrooharaujoo.github.io").replace(/\/$/, "");

export const profile = {
  name: "Pedro Henrique Araújo Souza",
  shortName: "Pedro Araújo",
  initials: "PA",
  role: { pt: "Desenvolvedor Full Stack", en: "Full Stack Developer" } as L,
  location: { pt: "Aracaju, SE · Brasil", en: "Aracaju, Brazil" } as L,
  availability: {
    pt: "Aberto a oportunidades · remoto ou Aracaju/SE",
    en: "Open to opportunities · remote or Aracaju, Brazil",
  } as L,
  email: "pedroh0507@gmail.com",
  phone: "+55 79 99130-8060",
  whatsapp: "https://wa.me/5579991308060",
  linkedin: "https://www.linkedin.com/in/pedrohenriquearaujosouza/",
  linkedinLabel: "linkedin.com/in/pedrohenriquearaujosouza",
  github: "https://github.com/PedrooHAraujoo",
  githubLabel: "github.com/PedrooHAraujoo",

  headline: {
    pt: "Desenvolvedor Full Stack | TypeScript · React · Next.js · Node.js · Python | PostgreSQL · Supabase",
    en: "Full Stack Developer | TypeScript · React · Next.js · Node.js · Python | PostgreSQL · Supabase",
  } as L,

  // Resumo curto: abre o currículo e o "Sobre" do site.
  summary: {
    pt: "Desenvolvedor Full Stack, bacharel em Ciência da Computação (UNIT, 2026). Construo aplicações web de ponta a ponta com TypeScript, React e Next.js, Node.js e Python no servidor e PostgreSQL (Supabase) no banco. Em 2026 levei à produção uma loja virtual completa para uma marca dos EUA, com Stripe, frete e painel administrativo, além de um painel de telemetria de frota e sites de clientes. Gosto de regra de negócio bem resolvida, segurança no banco e código que se prova com teste.",
    en: "Full Stack Developer with a B.Sc. in Computer Science (UNIT, 2026). I build web applications end to end with TypeScript, React and Next.js, Node.js and Python on the server, and PostgreSQL (Supabase) for data. In 2026 I shipped a complete online store for a US brand, with Stripe, shipping and an admin panel, plus a fleet telemetry dashboard and client websites. I care about well-solved business rules, security at the database level and code that is proven by tests.",
  } as L,

  about: {
    pt: [
      "Comecei no back-end com Python e Flask, numa API de ranking para as equipes de vendas de uma imobiliária. De lá para cá fui subindo a pilha: hoje entrego o produto inteiro, do modelo de dados no PostgreSQL à interface em React, passando por pagamento, autenticação e publicação.",
      "Atendo clientes pela Araújo Software, a empresa que fundei em 2025. Isso me obrigou a aprender o que não aparece em tutorial: levantar requisito com quem não é técnico, decidir o que fica fora do escopo, publicar e continuar respondendo pelo que está no ar.",
      "Em paralelo trabalho com Customer Experience numa empresa de SaaS, treinando e implantando clientes. É de lá que vem o meu hábito de escrever software pensando em quem vai usar na segunda-feira de manhã.",
    ],
    en: [
      "I started on the back end with Python and Flask, building a ranking API for a real estate company's sales teams. Since then I have moved up the stack: today I deliver the whole product, from the data model in PostgreSQL to the React interface, including payments, authentication and deployment.",
      "I work with clients through Araújo Software, the company I founded in 2025. That forced me to learn what tutorials skip: gathering requirements from non-technical people, deciding what stays out of scope, shipping, and staying accountable for what is live.",
      "In parallel I work in Customer Experience at a SaaS company, onboarding and training customers. That is where my habit of writing software for the person who will use it on Monday morning comes from.",
    ],
  } as Record<Lang, string[]>,
};

export type SkillGroup = { label: L; items: string[] };

export const skills: SkillGroup[] = [
  { label: { pt: "Linguagens", en: "Languages" }, items: ["TypeScript", "JavaScript", "Python", "SQL"] },
  {
    label: { pt: "Front-end", en: "Front end" },
    items: ["React", "Next.js (App Router)", "Tailwind CSS", "HTML", "CSS", "Framer Motion"],
  },
  {
    label: { pt: "Back-end", en: "Back end" },
    items: ["Node.js", "Route Handlers e Server Actions", "Flask", "SQLAlchemy", "APIs REST", "JWT", "Webhooks"],
  },
  {
    label: { pt: "Banco de dados", en: "Databases" },
    items: ["PostgreSQL", "Supabase (Auth, RLS, Storage)", "Row Level Security", "Migrações SQL", "SQLite"],
  },
  {
    label: { pt: "Integrações", en: "Integrations" },
    items: ["Stripe", "USPS e FedEx", "Google Maps Routes API", "n8n", "Gemini e OpenAI"],
  },
  {
    label: { pt: "Qualidade", en: "Quality" },
    items: ["Vitest", "Playwright", "axe-core (WCAG 2.1)", "pytest", "ESLint", "Lighthouse"],
  },
  {
    label: { pt: "Ferramentas", en: "Tooling" },
    items: ["Git e GitHub", "GitFlow", "Vercel", "Cloudflare Workers", "Claude Code", "Scrum"],
  },
];

// Linha de palavras-chave que os filtros de recrutadores e ATS procuram.
export const keywords = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Flask",
  "PostgreSQL",
  "Supabase",
  "SQL",
  "Tailwind CSS",
  "APIs REST",
  "Stripe",
  "Git",
  "Vitest",
  "Playwright",
];

export type Job = {
  company: string;
  role: L;
  period: L;
  place: L;
  bullets: Record<Lang, string[]>;
  stack?: string[];
};

export const experience: Job[] = [
  {
    company: "Araújo Software",
    role: { pt: "Fundador e Desenvolvedor Full Stack", en: "Founder and Full Stack Developer" },
    period: { pt: "out. 2025 – atual", en: "Oct 2025 – present" },
    place: { pt: "Aracaju, SE · remoto", en: "Aracaju, Brazil · remote" },
    bullets: {
      pt: [
        "Desenvolvi sozinho e publiquei a loja virtual da Ambiance AirScents (EUA): Next.js 16, TypeScript, Supabase/PostgreSQL e Stripe, com frete USPS e FedEx, estoque e painel administrativo (ambianceairscents.com).",
        "Projetei o banco com Row Level Security em 15 tabelas e 17 migrações SQL; o preço é recalculado no servidor e o webhook de pagamento é idempotente, sem cobrança ou estorno em dobro.",
        "Automatizei a verificação com 18 scripts (Playwright e axe-core) contra Stripe, Supabase e navegador; zero violações WCAG 2.1 AA em 17 rotas.",
        "Corrigi a reconstrução de trajeto por GPS de um painel de telemetria de frota: o erro frente ao hodômetro caiu de 19,7% para 3,6%, com a lógica coberta por 83 testes em Vitest.",
        "Construo uma plataforma de gestão de imóveis (PWA em 3 idiomas) com 68 tabelas protegidas por RLS e regras de negócio em funções e gatilhos do PostgreSQL.",
        "Criei e publiquei o site jucaramelo.com.br e otimizei o carregamento no celular (desempenho no Lighthouse móvel de 72 para 90).",
      ],
      en: [
        "Built and shipped, as the sole developer, the Ambiance AirScents online store (USA): Next.js 16, TypeScript, Supabase/PostgreSQL and Stripe, with USPS and FedEx shipping rates, inventory and an admin panel (ambianceairscents.com).",
        "Designed the database with Row Level Security on 15 tables and 17 SQL migrations; prices are recomputed on the server and the payment webhook is idempotent, so nothing is charged or refunded twice.",
        "Automated verification with 18 scripts (Playwright and axe-core) against Stripe, Supabase and the browser; zero WCAG 2.1 AA violations across 17 routes.",
        "Fixed GPS route reconstruction for a fleet telemetry dashboard: error against the odometer dropped from 19.7% to 3.6%, with the logic covered by 83 Vitest tests.",
        "Building a property management platform (PWA in 3 languages) with 68 tables protected by RLS and business rules in PostgreSQL functions and triggers.",
        "Designed and shipped jucaramelo.com.br and optimised mobile loading (mobile Lighthouse performance from 72 to 90).",
      ],
    },
    stack: ["TypeScript", "Next.js", "React", "Node.js", "PostgreSQL", "Supabase", "Stripe", "Vitest", "Playwright"],
  },
  {
    company: "JetSales Brasil",
    role: { pt: "Customer Experience", en: "Customer Experience" },
    period: { pt: "fev. 2025 – atual", en: "Feb 2025 – present" },
    place: { pt: "Aracaju, SE · híbrido", en: "Aracaju, Brazil · hybrid" },
    bullets: {
      pt: [
        "Promovido de Assistente de Onboarding a Customer Experience em maio de 2026.",
        "Atendo e dou suporte aos clientes de uma plataforma SaaS de atendimento e disparo de mensagens; antes, como Assistente de Onboarding, implantei e treinei novos clientes até que operassem sem depender do suporte.",
      ],
      en: [
        "Promoted from Onboarding Assistant to Customer Experience in May 2026.",
        "I serve and support customers of a SaaS customer service and messaging platform; before that, as Onboarding Assistant, I onboarded and trained new customers until they could operate without relying on support.",
      ],
    },
  },
  {
    company: "Cohab Premium Imobiliária",
    role: { pt: "Desenvolvedor Back-end Python (freelance)", en: "Python Back End Developer (freelance)" },
    period: { pt: "out. 2024 – fev. 2025", en: "Oct 2024 – Feb 2025" },
    place: { pt: "Aracaju, SE", en: "Aracaju, Brazil" },
    bullets: {
      pt: [
        "Desenvolvi a API REST do aplicativo de ranking das equipes de vendas (PWA) em Flask e SQLAlchemy: 20 endpoints, autenticação JWT e senhas com bcrypt.",
        "Implementei controle de acesso por cargo e permissão (RBAC) configurável no banco e o fluxo de aprovação de cadastro.",
        "Trabalhei em equipe de 3 pessoas com GitFlow; 150 dos 167 commits do repositório são meus.",
      ],
      en: [
        "Built the REST API for the sales teams ranking app (PWA) with Flask and SQLAlchemy: 20 endpoints, JWT authentication and bcrypt password hashing.",
        "Implemented database-configurable role and permission access control (RBAC) and the sign-up approval flow.",
        "Worked in a team of 3 using GitFlow; 150 of the repository's 167 commits are mine.",
      ],
    },
    stack: ["Python", "Flask", "SQLAlchemy", "SQLite", "JWT", "pytest"],
  },
  {
    company: "Good Pão Delicatessen",
    role: { pt: "Gestão de projetos e atendimento", en: "Project management and customer service" },
    period: { pt: "2018 – 2024", en: "2018 – 2024" },
    place: { pt: "Aracaju, SE", en: "Aracaju, Brazil" },
    bullets: {
      pt: ["Atendimento, acompanhamento de encomendas e organização da operação de pedidos para festas."],
      en: ["Customer service, order follow-up and organisation of the party-order operation."],
    },
  },
];

export const education = {
  degree: { pt: "Bacharelado em Ciência da Computação", en: "B.Sc. in Computer Science" } as L,
  school: "Universidade Tiradentes (UNIT)",
  period: { pt: "fev. 2022 – jun. 2026", en: "Feb 2022 – Jun 2026" } as L,
  thesis: {
    pt: "TCC aprovado com nota máxima: otimização e apoio ao planejamento de rotas com automação low-code, integrando n8n à Google Maps Routes API.",
    en: "Final thesis approved with the highest grade: route planning optimisation and support through low-code automation, integrating n8n with the Google Maps Routes API.",
  } as L,
};

export const certifications: { name: L; issuer: string; year: string }[] = [
  { name: { pt: "Imersão Dev: Agentes de IA", en: "Dev Immersion: AI Agents" }, issuer: "Google for Developers + Alura", year: "2025" },
  { name: { pt: "JavaScript: Criando Objetos e Classes", en: "JavaScript: Objects and Classes" }, issuer: "DIO", year: "2025" },
  { name: { pt: "Scrum Foundation Professional Certificate (SFPC)", en: "Scrum Foundation Professional Certificate (SFPC)" }, issuer: "CertiProf", year: "2024" },
  { name: { pt: "Fundamentos de Python para Análise de Dados", en: "Python Fundamentals for Data Analysis" }, issuer: "Data Science Academy", year: "2024" },
];

export const languages: { name: L; level: L }[] = [
  { name: { pt: "Português", en: "Portuguese" }, level: { pt: "nativo", en: "native" } },
  { name: { pt: "Inglês", en: "English" }, level: { pt: "avançado", en: "advanced" } },
];

// Como trabalho: princípios curtos, cada um com evidência nos projetos.
export const principles: { title: L; body: L }[] = [
  {
    title: { pt: "A regra mora no banco", en: "Rules live in the database" },
    body: {
      pt: "Quem pode ver o quê é decidido por Row Level Security, não por um if esquecido na tela. Se a interface errar, o dado continua protegido.",
      en: "Who can see what is decided by Row Level Security, not by an if statement forgotten in the UI. If the interface gets it wrong, the data stays protected.",
    },
  },
  {
    title: { pt: "Dinheiro não aceita “quase”", en: "Money does not accept “almost”" },
    body: {
      pt: "Preço calculado no servidor, webhook idempotente, estorno com chave única. O que envolve pagamento é escrito para sobreviver a clique duplo e a rede ruim.",
      en: "Server-side pricing, idempotent webhooks, refunds with a unique key. Anything involving payments is written to survive double clicks and bad networks.",
    },
  },
  {
    title: { pt: "Medir antes de afirmar", en: "Measure before claiming" },
    body: {
      pt: "Lighthouse antes e depois, erro contra o hodômetro, acessibilidade auditada por rota. Número que entra no relatório tem de poder ser refeito.",
      en: "Lighthouse before and after, error against the odometer, accessibility audited per route. Any number in a report must be reproducible.",
    },
  },
  {
    title: { pt: "IA como ferramenta, não como autor", en: "AI as a tool, not the author" },
    body: {
      pt: "Uso Claude Code no dia a dia para ir mais rápido. A especificação, a revisão, os testes e a decisão de publicar são meus, e eu respondo pelo que está no ar.",
      en: "I use Claude Code daily to move faster. The specification, the review, the tests and the decision to ship are mine, and I am accountable for what is live.",
    },
  },
];
