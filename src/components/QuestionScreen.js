import React from 'react';

function QuestionScreen({ question, onAnswer, progress, questionNumber, totalQuestions }) {
  return (
    <div className="question-container glass-card">
      <div className="progress-wrapper">
        <div className="progress-info">
          <span>Progresso</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      
      <div className="question-content">
        <h2 className="question-title">
          Escolha a palavra que melhor descreve você:
        </h2>
        <p className="question-counter" style={{ marginTop: '8px', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Pergunta {questionNumber} de {totalQuestions}
        </p>
      </div>

      <div className="options-grid">
        {question.map((option, index) => (
          <button 
            key={index} 
            className="option-button" 
            onClick={() => onAnswer(option.type)}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionScreen;