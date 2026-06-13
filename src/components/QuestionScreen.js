import React, { useState, useEffect } from 'react';

const DISC_LABELS = { D: 'D', I: 'I', C: 'C', A: 'A' };

function QuestionScreen({ question, onAnswer, onPrevious, progress, questionNumber, totalQuestions }) {
  const [selected, setSelected] = useState(null);

  useEffect(() => { setSelected(null); }, [questionNumber]);

  const handleSelect = (type) => {
    if (selected) return;
    setSelected(type);
    setTimeout(() => onAnswer(type), 380);
  };

  return (
    <div className="app-shell">
      <header className="qs-header anim-fade-in">
        <span className="logo-mark">DICA</span>
        <span className="qs-step">{questionNumber} / {totalQuestions}</span>
      </header>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div key={questionNumber} className="anim-fade-up" style={{ flex: 1 }}>
        <p className="qs-question-sub">Escolha a palavra que melhor descreve você</p>
        <h2 className="qs-question">Como você se vê agindo?</h2>

        <div className="option-list" style={{ marginTop: '2rem' }}>
          {question.map((opt, idx) => {
            const letters = ['A', 'B', 'C', 'D'];
            const isSelected = selected === opt.type;
            return (
              <div
                key={opt.type}
                className={`option-card${isSelected ? ' is-selected' : ''}`}
                onClick={() => handleSelect(opt.type)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleSelect(opt.type)}
              >
                <div className="option-badge">{letters[idx]}</div>
                <span style={{ fontSize: '1.05rem' }}>{opt.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="qs-footer anim-fade-in">
        <button
          className="btn-ghost"
          onClick={onPrevious}
          style={{
            opacity: questionNumber > 1 ? 1 : 0,
            pointerEvents: questionNumber > 1 ? 'auto' : 'none',
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            transition: 'opacity 0.2s',
          }}
        >
          ← Questão anterior
        </button>
      </div>
    </div>
  );
}

export default QuestionScreen;
