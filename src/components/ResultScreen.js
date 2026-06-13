import React, { useState, useEffect, useRef } from 'react';

const ORDER = ['D', 'I', 'A', 'C'];

const DISC_META = {
  D: { label: 'Dominante',  color: '#b85c38' },
  I: { label: 'Influente',  color: '#c07a3a' },
  A: { label: 'Estável',    color: '#7a8c6a' },
  C: { label: 'Analítico',  color: '#5a6e8c' },
};

const PROFILES = {
  D: {
    title: 'O Executor',
    subtitle: 'Focado, direto e orientado a resultados.',
    description:
      'Você valoriza a ação acima de tudo. Quando um desafio surge, sua inclinação é tomar as rédeas e resolver. Essa determinação inspira confiança e move equipes — mas lembre-se de que pausas estratégicas também fazem parte de uma boa execução.',
  },
  I: {
    title: 'O Comunicador',
    subtitle: 'Carismático, persuasivo e empático.',
    description:
      'As pessoas são o seu combustível. Você tem habilidade natural para engajar times, contar histórias e criar ambientes positivos. Sua energia é contagiante. O maior desafio: manter o foco nas entregas técnicas sem perder o entusiasmo.',
  },
  A: {
    title: 'O Colaborador',
    subtitle: 'Calmo, observador e harmonioso.',
    description:
      'Você é o ponto de equilíbrio nos ambientes em que atua. Prefere estabilidade, sabe ouvir de verdade e se preocupa com o bem-estar coletivo. Às vezes, impor a sua voz é necessário para que suas ótimas ideias ganhem o mundo.',
  },
  C: {
    title: 'O Analista',
    subtitle: 'Preciso, detalhista e metódico.',
    description:
      'Nada escapa aos seus olhos. Você decide com base em dados, evita riscos desnecessários e entrega trabalho com padrão altíssimo. O próximo passo: aprender a agir mesmo sem 100% das informações — a ambiguidade também é território fértil.',
  },
};

/* ── Radar chart ──────────────────────────────────────── */
function RadarChart({ values }) {
  const SIZE = 340, CX = SIZE / 2, CY = SIZE / 2, R = 110;
  const rings = [0.25, 0.5, 0.75, 1];
  /* axes: D=top, I=right, A=bottom, C=left */
  const angles = [-Math.PI / 2, 0, Math.PI / 2, Math.PI];

  const [t, setT] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    let start = null;
    const dur = 1100;
    const ease = (x) => 1 - Math.pow(1 - x, 3);
    const tick = (ts) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setT(ease(p));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const pt = (val, ai) => {
    const r = R * (val / 100) * t;
    return [CX + r * Math.cos(angles[ai]), CY + r * Math.sin(angles[ai])];
  };

  const labelOffset = R + 32;
  const labelPos = (ai) => [
    CX + labelOffset * Math.cos(angles[ai]),
    CY + labelOffset * Math.sin(angles[ai]),
  ];
  const textAnchor = (ai) => (ai === 1 ? 'start' : ai === 3 ? 'end' : 'middle');

  /* 4 colored triangles: center → vertex[i] → vertex[i+1] */
  const triangles = ORDER.map((key, i) => {
    const next = (i + 1) % ORDER.length;
    const [x1, y1] = pt(values[i], i);
    const [x2, y2] = pt(values[next], next);
    return { key, color: DISC_META[key].color, pts: `${CX},${CY} ${x1},${y1} ${x2},${y2}` };
  });

  /* colored edge segments between adjacent vertices */
  const edges = ORDER.map((key, i) => {
    const next = (i + 1) % ORDER.length;
    const [x1, y1] = pt(values[i], i);
    const [x2, y2] = pt(values[next], next);
    return { key, color: DISC_META[key].color, x1, y1, x2, y2 };
  });

  return (
    <svg
      className="radar-svg"
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Grid rings */}
      {rings.map((ring) => {
        const pts = angles
          .map((a) => [CX + R * ring * Math.cos(a), CY + R * ring * Math.sin(a)].join(','))
          .join(' ');
        return (
          <polygon
            key={ring}
            points={pts}
            fill="none"
            stroke="var(--border)"
            strokeWidth={ring === 1 ? 1.5 : 0.75}
          />
        );
      })}

      {/* Axis lines */}
      {angles.map((a, i) => (
        <line
          key={i}
          x1={CX} y1={CY}
          x2={CX + R * Math.cos(a)} y2={CY + R * Math.sin(a)}
          stroke="var(--border)"
          strokeWidth="0.75"
        />
      ))}

      {/* Colored triangle fills per segment */}
      {triangles.map(({ key, color, pts }) => (
        <polygon key={key} points={pts} fill={color} fillOpacity="0.18" stroke="none" />
      ))}

      {/* Colored edge strokes between vertices */}
      {edges.map(({ key, color, x1, y1, x2, y2 }) => (
        <line key={key} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2" strokeLinecap="round" />
      ))}

      {/* Colored vertex dots */}
      {values.map((v, i) => {
        const [vx, vy] = pt(v, i);
        return <circle key={i} cx={vx} cy={vy} r="4" fill={DISC_META[ORDER[i]].color} />;
      })}

      {/* Axis labels */}
      {ORDER.map((key, i) => {
        const [lx, ly] = labelPos(i);
        return (
          <text
            key={key}
            x={lx} y={ly}
            textAnchor={textAnchor(i)}
            dy="0.35em"
            fontSize="12"
            fontWeight="500"
            fill="var(--muted)"
            fontFamily="var(--font-body)"
          >
            {DISC_META[key].label}
          </text>
        );
      })}
    </svg>
  );
}

/* ── Main component ──────────────────────────────────── */
function ResultScreen({ answers, onReset }) {
  const total = ORDER.reduce((s, k) => s + answers[k], 0) || 1;
  const maxScore = Math.max(...ORDER.map((k) => answers[k]));
  const dominants = ORDER.filter((k) => answers[k] === maxScore);
  const dominant = dominants[0];
  const profile = PROFILES[dominant];

  const radarValues = ORDER.map((k) => Math.round((answers[k] / total) * 100));

  return (
    <div className="app-shell">
      <header className="rs-header anim-fade-in">
        <span className="logo-mark">DICA</span>
        <button className="btn-ghost" onClick={onReset}>Refazer avaliação</button>
      </header>

      <div className="report-card anim-slide-up">
        <p className="report-card__eyebrow">Resultado da Avaliação</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
          <h1 className="report-card__title" style={{ margin: 0 }}>
            {dominants.length > 1 ? 'Perfil Combinado' : profile.title}
          </h1>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {dominants.map((key) => (
              <span key={key} style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: '2.75rem', height: '2.75rem', borderRadius: '50%',
                background: DISC_META[key].color, color: '#fff',
                fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.35rem',
                flexShrink: 0, letterSpacing: '-0.01em',
              }}>{key}</span>
            ))}
          </div>
        </div>
        <p className="report-card__subtitle">
          {dominants.length > 1
            ? dominants.map((k) => DISC_META[k].label).join(' · ')
            : profile.subtitle}
        </p>
        <p className="report-card__desc">
          {dominants.length > 1
            ? dominants.map((k) => PROFILES[k].description).join(' ')
            : profile.description}
        </p>

        <hr className="report-card__divider" />

        <p className="report-card__section-label">Mapa Comportamental DISC</p>

        <div className="radar-wrap">
          <RadarChart values={radarValues} />
        </div>

        <div className="disc-legend">
          {ORDER.map((key, i) => (
            <div className="disc-legend-row" key={key}>
              <span className="disc-legend-dot" style={{ background: DISC_META[key].color }} />
              <span className="disc-legend-label">{DISC_META[key].label}</span>
              <span className="disc-legend-val">{radarValues[i]}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rs-actions anim-slide-up" style={{ animationDelay: '0.25s' }}>
        <button className="btn-primary" onClick={() => window.print()}>
          Baixar Relatório PDF
        </button>
        <button className="btn-secondary" onClick={onReset}>Voltar ao Início</button>
      </div>
    </div>
  );
}

export default ResultScreen;
