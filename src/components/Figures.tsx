import type { Lang } from "@/content/profile";
import { num } from "@/lib/i18n";

// Capas desenhadas em SVG para os projetos que não têm tela pública
// (painel com dados de cliente, API sem interface, prova de conceito local).

const mono = { fontFamily: "var(--font-mono)" } as const;

function Panel({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 960 600" role="img" aria-label={label} className="block h-auto w-full">
      <defs>
        <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0H0V48" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        </pattern>
        <radialGradient id="glow" cx="78%" cy="18%" r="70%">
          <stop offset="0" stopColor="#ff6b1a" stopOpacity="0.22" />
          <stop offset="1" stopColor="#ff6b1a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="960" height="600" fill="#0f1116" />
      <rect width="960" height="600" fill="url(#grid)" />
      <rect width="960" height="600" fill="url(#glow)" />
      {children}
    </svg>
  );
}

export function RouteFigure({ lang }: { lang: Lang }) {
  const pt = lang === "pt";
  const stops: [number, number][] = [
    [120, 470],
    [270, 330],
    [430, 390],
    [560, 220],
    [720, 280],
    [840, 130],
  ];
  const planned = "M120 470 L270 330 L430 390 L560 220 L720 280 L840 130";
  const executed =
    "M120 470 C170 440 215 372 270 330 C320 322 372 398 430 390 C470 384 505 268 536 236 C548 224 566 218 584 226 C640 246 676 292 720 280 C772 264 800 176 840 130";
  return (
    <Panel label={pt ? "Rota planejada comparada com a rota executada" : "Planned route compared with executed route"}>
      <path d={planned} fill="none" stroke="#edebe6" strokeOpacity="0.45" strokeWidth="2" strokeDasharray="7 9" />
      <path
        d={executed}
        fill="none"
        stroke="#ff6b1a"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset="1"
        style={{ animation: "dash 2.6s cubic-bezier(0.22,1,0.36,1) 0.3s forwards" }}
      />
      {stops.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="13" fill="#0f1116" stroke="#edebe6" strokeOpacity="0.7" strokeWidth="1.5" />
          <text x={x} y={y + 4} textAnchor="middle" fontSize="12" fill="#edebe6" style={mono}>
            {i + 1}
          </text>
        </g>
      ))}

      <g style={mono} fontSize="13">
        <line x1="64" y1="72" x2="104" y2="72" stroke="#edebe6" strokeOpacity="0.5" strokeWidth="2" strokeDasharray="7 9" />
        <text x="116" y="77" fill="#9c9ea6">
          {pt ? "planejado" : "planned"}
        </text>
        <line x1="230" y1="72" x2="270" y2="72" stroke="#ff6b1a" strokeWidth="4" strokeLinecap="round" />
        <text x="282" y="77" fill="#9c9ea6">
          {pt ? "executado (GPS)" : "executed (GPS)"}
        </text>
      </g>

      <g transform="translate(64 492)">
        <rect width="386" height="60" rx="14" fill="#16181d" stroke="rgba(255,255,255,0.1)" />
        <text x="22" y="26" fontSize="11" fill="#9c9ea6" style={mono} letterSpacing="1.5">
          {pt ? "HODÔMETRO" : "ODOMETER"}
        </text>
        <text x="22" y="46" fontSize="17" fill="#edebe6" fontWeight="600">
          {num("404,0 km", lang)}
        </text>
        <text x="148" y="26" fontSize="11" fill="#9c9ea6" style={mono} letterSpacing="1.5">
          {pt ? "RECONSTRUÍDO" : "REBUILT"}
        </text>
        <text x="148" y="46" fontSize="17" fill="#edebe6" fontWeight="600">
          {num("389,3 km", lang)}
        </text>
        <text x="288" y="26" fontSize="11" fill="#9c9ea6" style={mono} letterSpacing="1.5">
          {pt ? "ERRO" : "ERROR"}
        </text>
        <text x="288" y="46" fontSize="17" fill="#ff6b1a" fontWeight="600">
          {num("3,6%", lang)}
        </text>
      </g>
    </Panel>
  );
}

const routes: [string, string, boolean][] = [
  ["POST", "/api/cadastrar", false],
  ["POST", "/api/login", false],
  ["GET", "/api/perfil", true],
  ["PUT", "/api/perfil/editar", true],
  ["POST", "/api/painel/equipe", true],
  ["GET", "/api/painel/ranking", true],
  ["PUT", "/api/painel/usuario/<id>/aprovar", true],
];
const methodColor: Record<string, string> = { GET: "#3ddc97", POST: "#ff6b1a", PUT: "#f2c14e" };

export function ApiFigure({ lang }: { lang: Lang }) {
  const pt = lang === "pt";
  return (
    <Panel label={pt ? "Rotas da API Liga Maximus" : "Liga Maximus API routes"}>
      <g transform="translate(96 70)">
        <rect width="768" height="460" rx="18" fill="#14161b" stroke="rgba(255,255,255,0.09)" />
        <circle cx="28" cy="27" r="5" fill="#3a3e48" />
        <circle cx="46" cy="27" r="5" fill="#3a3e48" />
        <circle cx="64" cy="27" r="5" fill="#3a3e48" />
        <text x="92" y="32" fontSize="12" fill="#8d9099" style={mono}>
          flask · liga_backend
        </text>
        <line x1="0" y1="54" x2="768" y2="54" stroke="rgba(255,255,255,0.07)" />
        {routes.map(([m, path, auth], i) => (
          <g key={path} transform={`translate(30 ${86 + i * 52})`}>
            <rect width="58" height="26" rx="13" fill="none" stroke={methodColor[m]} strokeOpacity="0.7" />
            <text x="29" y="17.5" textAnchor="middle" fontSize="11.5" fill={methodColor[m]} style={mono} fontWeight="600">
              {m}
            </text>
            <text x="78" y="18" fontSize="15" fill="#edebe6" style={mono}>
              {path}
            </text>
            {auth && (
              <g transform="translate(636 0)">
                <rect width="72" height="26" rx="13" fill="rgba(255,255,255,0.05)" />
                <text x="36" y="17.5" textAnchor="middle" fontSize="11" fill="#9c9ea6" style={mono}>
                  JWT
                </text>
              </g>
            )}
          </g>
        ))}
      </g>
    </Panel>
  );
}

export function PlateFigure({ lang }: { lang: Lang }) {
  const pt = lang === "pt";
  const fields = pt
    ? ["Fabricante", "Nº de série", "Capacidade", "Comprimento"]
    : ["Manufacturer", "Serial number", "Capacity", "Length"];
  const conf = [0.98, 0.96, 0.99, 0.91];
  return (
    <Panel label={pt ? "Leitura de plaqueta por IA preenchendo o relatório" : "AI nameplate reading filling in the report"}>
      {/* plaqueta */}
      <g transform="translate(84 150) rotate(-4 180 150)">
        <rect width="360" height="300" rx="18" fill="#2a2d35" stroke="#4a4e59" strokeWidth="2" />
        <circle cx="26" cy="26" r="7" fill="#16181d" />
        <circle cx="334" cy="26" r="7" fill="#16181d" />
        <circle cx="26" cy="274" r="7" fill="#16181d" />
        <circle cx="334" cy="274" r="7" fill="#16181d" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(52 ${66 + i * 52})`}>
            <rect width="96" height="9" rx="4.5" fill="#5b606c" />
            <rect y="17" width={[210, 168, 124, 150][i]} height="15" rx="4" fill="#8d92a0" />
            <rect x="-9" y="-9" width={[236, 194, 150, 176][i]} height="50" rx="8" fill="none" stroke="#ff6b1a" strokeWidth="1.5" strokeDasharray="5 5" />
          </g>
        ))}
      </g>

      {/* seta */}
      <path d="M476 300 H548" stroke="#ff6b1a" strokeWidth="2" strokeLinecap="round" />
      <path d="M540 291 L550 300 L540 309" fill="none" stroke="#ff6b1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* formulário */}
      <g transform="translate(580 118)">
        <rect width="300" height="364" rx="18" fill="#14161b" stroke="rgba(255,255,255,0.09)" />
        <text x="24" y="38" fontSize="11" fill="#9c9ea6" style={mono} letterSpacing="1.5">
          {pt ? "RELATÓRIO" : "REPORT"}
        </text>
        {fields.map((f, i) => (
          <g key={f} transform={`translate(24 ${64 + i * 72})`}>
            <text y="12" fontSize="12.5" fill="#9c9ea6">
              {f}
            </text>
            <rect y="22" width="252" height="34" rx="9" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" />
            <rect x="12" y="35" width={[120, 96, 62, 78][i]} height="8" rx="4" fill="#edebe6" fillOpacity="0.85" />
            <text x="240" y="43" textAnchor="end" fontSize="11" fill={conf[i] > 0.95 ? "#3ddc97" : "#f2c14e"} style={mono}>
              {Math.round(conf[i] * 100)}%
            </text>
          </g>
        ))}
      </g>
    </Panel>
  );
}
