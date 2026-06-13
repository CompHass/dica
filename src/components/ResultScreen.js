import React from 'react';
import { Logo } from './Logo';

const PROFILES = {
  D: { label: 'Dominante', color: '#3b82f6' },
  I: { label: 'Influente',  color: '#f97316' },
  A: { label: 'Estável',    color: '#3b82f6' },
  C: { label: 'Analítico',  color: '#ef4444' },
};

// Distinct colors for each dimension (matching stitch)
const COLORS = {
  D: '#60a5fa',  // blue
  I: '#fb923c',  // orange
  A: '#60a5fa',  // blue (estável)
  C: '#f87171',  // red/pink
};

const ORDER = ['D', 'I', 'A', 'C'];

const SUMMARIES = {
  D: 'Seu perfil indica uma forte inclinação para traços Dominantes e Influentes. Você provavelmente prospera em ambientes sociais e é rápido para agir. Equilibrar isso com aspectos Estáveis e Analíticos poderia melhorar o planejamento estratégico.',
  I: 'Seu perfil indica forte inclinação para traços Influentes e Dominantes. Você prospera em ambientes sociais e é rápido para agir. Equilibrar com aspectos Estáveis e Analíticos pode melhorar o planejamento estratégico.',
  A: 'Seu perfil indica forte inclinação para traços Estáveis e Cautelosos. Você é uma âncora essencial em qualquer equipe, trazendo consistência e empatia. Desenvolver aspectos Dominantes pode ampliar sua liderança.',
  C: 'Seu perfil indica forte inclinação para traços Analíticos e Cautelosos. Você é detalhista, preciso e orientado à qualidade. Equilibrar com aspectos Influentes pode melhorar sua comunicação e influência.',
};

const barColors = {
  D: '#22c55e',
  I: '#f97316',
  A: '#3b82f6',
  C: '#ef4444',
};

const barIcons = {
  D: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/>
    </svg>
  ),
  I: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 4H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3l3 3 3-3h3a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/>
    </svg>
  ),
  A: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"/>
      <circle cx="12" cy="9" r="2.5"/>
    </svg>
  ),
  C: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  ),
};

/* ── Radar chart — circular grid, gradient-blended fill ── */
function RadarChart({ answers }) {
  const cx = 210, cy = 195, r = 130;
  const total = ORDER.reduce((s, k) => s + answers[k], 0) || 1;

  // Axes: D=top(270°), I=right(0°), A=bottom(90°), C=left(180°)
  const axis = (k, scale = 1) => {
    const a = { D: -Math.PI/2, I: 0, A: Math.PI/2, C: Math.PI }[k];
    return { x: cx + r * scale * Math.cos(a), y: cy + r * scale * Math.sin(a) };
  };

  const pct = (k) => answers[k] / total;
  const dp  = (k) => axis(k, pct(k));

  // Circular grid rings
  const rings = [0.2, 0.4, 0.6, 0.8, 1.0];

  // Data polygon points
  const polyPts = ORDER.map(k => { const p = dp(k); return `${p.x},${p.y}`; }).join(' ');

  // Four colored triangles for fill — higher opacity for richer look
  const triangles = ORDER.map((k, i) => {
    const kNext = ORDER[(i + 1) % 4];
    const p1 = dp(k), p2 = dp(kNext);
    return {
      key: k,
      color: COLORS[k],
      pts: `${cx},${cy} ${p1.x},${p1.y} ${p2.x},${p2.y}`,
    };
  });

  // Badge positions: always pushed outward beyond data point along axis direction
  const badgePos = (k) => {
    const minR = 0.42 * r; // minimum distance from center
    const dataR = pct(k) * r;
    const badgeR = Math.max(dataR, minR) + 22;
    return axis(k, badgeR / r);
  };

  // Axis label positions (outside chart area)
  const labelPos = {
    D: { x: cx,         y: cy - r - 16, anchor: 'middle' },
    I: { x: cx + r + 16, y: cy + 5,    anchor: 'start'  },
    A: { x: cx,         y: cy + r + 22, anchor: 'middle' },
    C: { x: cx - r - 16, y: cy + 5,    anchor: 'end'    },
  };

  return (
    <svg className="rs__radar" viewBox="0 0 420 390" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Soft radial glow at center */}
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="white" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Circular grid rings */}
      {rings.map(t => (
        <circle
          key={t}
          cx={cx} cy={cy}
          r={r * t}
          fill="none"
          stroke="#d1d5db"
          strokeWidth={t === 1 ? 1.5 : 0.8}
        />
      ))}

      {/* Axis lines from center to edge */}
      {ORDER.map(k => {
        const end = axis(k, 1);
        return (
          <line key={k}
            x1={cx} y1={cy}
            x2={end.x} y2={end.y}
            stroke="#d1d5db" strokeWidth="0.8"
          />
        );
      })}

      {/* Colored triangle fills — blend creates gradient effect */}
      {triangles.map(t => (
        <polygon
          key={t.key}
          points={t.pts}
          fill={t.color}
          fillOpacity="0.32"
          stroke="none"
        />
      ))}

      {/* Main data polygon — filled with semi-transparent blend */}
      <polygon
        points={polyPts}
        fill="rgba(99,155,235,0.12)"
        stroke="none"
      />

      {/* Polygon outline strokes per segment for color continuity */}
      {ORDER.map((k, i) => {
        const kNext = ORDER[(i + 1) % 4];
        const p1 = dp(k), p2 = dp(kNext);
        return (
          <line key={k}
            x1={p1.x} y1={p1.y}
            x2={p2.x} y2={p2.y}
            stroke={COLORS[k]}
            strokeWidth="2"
            strokeLinejoin="round"
          />
        );
      })}

      {/* Center glow overlay */}
      <circle cx={cx} cy={cy} r={r * 0.5} fill="url(#centerGlow)" />

      {/* % badge at each data point */}
      {ORDER.map(k => {
        const bp = badgePos(k);
        const val = Math.round(pct(k) * 100);
        const w = val >= 100 ? 40 : 34;
        return (
          <g key={k}>
            <rect
              x={bp.x - w/2} y={bp.y - 10}
              width={w} height="20"
              rx="10"
              fill={COLORS[k]}
            />
            <text
              x={bp.x} y={bp.y + 4.5}
              textAnchor="middle"
              fontSize="10.5"
              fontFamily="Inter,sans-serif"
              fontWeight="700"
              fill="white"
            >
              {val}%
            </text>
          </g>
        );
      })}

      {/* Axis labels */}
      {ORDER.map(k => {
        const lp = labelPos[k];
        return (
          <text
            key={k}
            x={lp.x} y={lp.y}
            textAnchor={lp.anchor}
            fontSize="12"
            fontFamily="Inter,sans-serif"
            fontWeight="600"
            fill="#475569"
          >
            {PROFILES[k].label}
          </text>
        );
      })}
    </svg>
  );
}

/* ── Main component ───────────────────────────────── */
function ResultScreen({ answers, onReset }) {
  const total = ORDER.reduce((s, k) => s + answers[k], 0) || 1;
  const dominant = ORDER.reduce((best, k) => answers[k] > answers[best] ? k : best, 'D');

  return (
    <div className="rs">
      <div className="rs__blob1" />
      <div className="rs__blob2" />

      <header className="rs__header">
        <Logo dark />
      </header>

      <main className="rs__main">
        <h1 className="rs__title">Painel de Resultados do Perfil Comportamental</h1>

        <div className="rs__grid">
          {/* Left: radar in a white card */}
          <div className="rs__chart-card">
            <h3>Seu Diagrama Comportamental</h3>
            <div className="rs__chart-wrap">
              <RadarChart answers={answers} />
            </div>
          </div>

          {/* Right: summary + bars */}
          <div className="rs__summary-col">
            <h3>Resumo do Perfil</h3>
            <p className="rs__summary-text">{SUMMARIES[dominant]}</p>

            <div className="rs__bars">
              {ORDER.map(k => {
                const pct = Math.round((answers[k] / total) * 100);
                const color = barColors[k];
                return (
                  <div key={k} className="rs__bar">
                    <div className="rs__bar-icon" style={{ background: color }}>
                      {barIcons[k]}
                    </div>
                    <div className="rs__bar-content">
                      <div className="rs__bar-head">
                        <span className="rs__bar-name">{PROFILES[k].label}</span>
                        <span className="rs__bar-pct">{pct}%</span>
                      </div>
                      <div className="rs__bar-track">
                        <div className="rs__bar-fill" style={{ width: `${pct}%`, background: color }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="rs__actions">
          <button className="rs__btn-primary" onClick={() => window.print()}>
            Baixar Relatório Completo
          </button>
          <button className="rs__btn-secondary" onClick={onReset}>
            Refazer Avaliação
          </button>
        </div>
      </main>

      <footer className="rs__footer">
        © 2024 ProfileInsight. Todos os direitos reservados. &nbsp;
        <a href="#privacidade">Política de Privacidade</a>&nbsp;|&nbsp;
        <a href="#termos">Termos de Serviço</a>
      </footer>
    </div>
  );
}

export default ResultScreen;
