import type { L, Lang } from "./profile";

// Versão enxuta dos textos para o currículo de uma página. O site conta a
// história completa; o PDF precisa caber em uma folha e ser lido em segundos.

export const cvSummary: L = {
  pt: "Desenvolvedor Full Stack, bacharel em Ciência da Computação (UNIT, 2026). Construo aplicações web de ponta a ponta com TypeScript, React, Next.js e Node.js, Python no back-end e PostgreSQL (Supabase). Em 2026 levei à produção uma loja virtual completa para uma marca dos EUA (Stripe, frete, estoque e painel administrativo), além de um painel de telemetria de frota e sites de clientes.",
  en: "Full Stack Developer with a B.Sc. in Computer Science (UNIT, 2026). I build web applications end to end with TypeScript, React, Next.js and Node.js, Python on the back end and PostgreSQL (Supabase). In 2026 I shipped a complete online store for a US brand (Stripe, shipping, inventory and admin panel), plus a fleet telemetry dashboard and client websites.",
};

export const cvSkills: { label: L; items: string }[] = [
  { label: { pt: "Linguagens", en: "Languages" }, items: "TypeScript, JavaScript, Python, SQL" },
  { label: { pt: "Front-end", en: "Front end" }, items: "React, Next.js (App Router), Tailwind CSS, HTML, CSS" },
  {
    label: { pt: "Back-end", en: "Back end" },
    items: "Node.js, Next.js Route Handlers e Server Actions, Flask, SQLAlchemy, APIs REST, JWT, webhooks",
  },
  {
    label: { pt: "Banco de dados", en: "Databases" },
    items: "PostgreSQL, Supabase (Auth, Row Level Security, Storage), migrações SQL, SQLite",
  },
  {
    label: { pt: "Integrações", en: "Integrations" },
    items: "Stripe, USPS, FedEx, Google Maps Routes API, n8n, Gemini, OpenAI",
  },
  {
    label: { pt: "Qualidade e ferramentas", en: "Quality and tooling" },
    items: "Vitest, Playwright, pytest, axe-core (WCAG), Git, GitHub, GitFlow, Vercel, Claude Code, Scrum",
  },
];

export const cvBullets: Record<string, Record<Lang, string[]>> = {
  "Araújo Software": {
    pt: [
      "Desenvolvi sozinho e publiquei a loja virtual da Ambiance AirScents (EUA) em Next.js 16, TypeScript, Supabase/PostgreSQL e Stripe, com frete USPS e FedEx, estoque e painel administrativo.",
      "Modelei o banco com Row Level Security em 15 tabelas e 17 migrações SQL; preço recalculado no servidor e webhook de pagamento idempotente, sem cobrança ou estorno em dobro.",
      "Automatizei a verificação com 18 scripts (Playwright e axe-core): zero violações WCAG 2.1 AA em 17 rotas.",
      "Corrigi a reconstrução de trajeto por GPS de um painel de frota (React, Supabase): o erro frente ao hodômetro caiu de 19,7% para 3,6%, com 83 testes em Vitest.",
      "Construo uma plataforma de gestão de imóveis (PWA, 3 idiomas) com 68 tabelas sob RLS e regras de negócio em funções e gatilhos do PostgreSQL.",
      "Publiquei jucaramelo.com.br e elevei o desempenho no Lighthouse móvel de 72 para 90.",
    ],
    en: [
      "Built and shipped, as sole developer, the Ambiance AirScents online store (USA) with Next.js 16, TypeScript, Supabase/PostgreSQL and Stripe, including USPS and FedEx rates, inventory and an admin panel.",
      "Modelled the database with Row Level Security on 15 tables and 17 SQL migrations; server-side pricing and an idempotent payment webhook, so nothing is charged or refunded twice.",
      "Automated verification with 18 scripts (Playwright and axe-core): zero WCAG 2.1 AA violations across 17 routes.",
      "Fixed GPS route reconstruction for a fleet dashboard (React, Supabase): error against the odometer dropped from 19.7% to 3.6%, with 83 Vitest tests.",
      "Building a property management platform (PWA, 3 languages) with 68 tables under RLS and business rules in PostgreSQL functions and triggers.",
      "Shipped jucaramelo.com.br and raised mobile Lighthouse performance from 72 to 90.",
    ],
  },
  "JetSales Brasil": {
    pt: ["Promovido de Assistente de Onboarding em maio de 2026. Acompanho clientes de uma plataforma SaaS da implantação ao fim do ciclo de vida e conduzo calls de consultoria para aumentar a conversão nos processos deles."],
    en: ["Promoted from Onboarding Assistant in May 2026. I follow customers of a SaaS platform from onboarding to the end of their lifecycle and run consulting calls to increase conversion in their processes."],
  },
  "Cohab Premium Imobiliária": {
    pt: [
      "Desenvolvi em Flask e SQLAlchemy a API REST do app de ranking das equipes de vendas: 20 endpoints, JWT, bcrypt e controle de acesso por cargo (RBAC).",
      "Equipe de 3 pessoas com GitFlow; 150 dos 167 commits do repositório são meus.",
    ],
    en: [
      "Built with Flask and SQLAlchemy the REST API for the sales teams ranking app: 20 endpoints, JWT, bcrypt and role-based access control (RBAC).",
      "Team of 3 using GitFlow; 150 of the repository's 167 commits are mine.",
    ],
  },
  "Good Pão Delicatessen": {
    pt: ["Atendimento a clientes e gestão de encomendas."],
    en: ["Customer service and order management."],
  },
};

export const cvLinks: { label: L; href: string }[] = [
  { label: { pt: "Loja em produção", en: "Store in production" }, href: "https://ambianceairscents.com" },
  { label: { pt: "Demonstração da plataforma", en: "Platform demo" }, href: "https://solstead-demo.vercel.app" },
  { label: { pt: "Site de cliente", en: "Client website" }, href: "https://jucaramelo.com.br" },
  { label: { pt: "API em Flask (código)", en: "Flask API (code)" }, href: "https://github.com/PedrooHAraujoo/Liga_BackEnd" },
];
