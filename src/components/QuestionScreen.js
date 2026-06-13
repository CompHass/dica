import React from 'react';
import { Logo } from './Logo';

const icons = {
  D: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#006ef9" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/>
    </svg>
  ),
  I: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#006ef9" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 4H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3l3 3 3-3h3a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/>
    </svg>
  ),
  C: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#006ef9" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  A: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#006ef9" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
};

function QuestionScreen({ question, onAnswer, progress, questionNumber, totalQuestions }) {
  return (
    <div className="qs">
      <header className="qs__header">
        <Logo dark />
        <span className="qs__label">Questionário</span>
      </header>

      <main className="qs__main">
        <div className="qs__card">
          <div className="qs__bar">
            <div className="qs__bar-fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="qs__card-body">
            <p className="qs__num">Questão {questionNumber} de {totalQuestions}</p>
            <h2 className="qs__question">Escolha a palavra que melhor descreve você:</h2>

            <div className="qs__options">
              {question.map((opt, i) => (
                <button key={i} className="qs__option" onClick={() => onAnswer(opt.type)}>
                  <span className="qs__icon-box">{icons[opt.type]}</span>
                  <span className="qs__option-label">{opt.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default QuestionScreen;
