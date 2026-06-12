import React, { useState } from 'react';
import './App.css';
import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';
import questionsData from './data/questions';

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState({
    D: 0,
    I: 0,
    C: 0,
    A: 0
  });

  const handleAnswer = (type) => {
    setAnswers(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));

    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const startQuiz = () => {
    setIsStarted(true);
  };

  const resetQuiz = () => {
    setAnswers({
      D: 0,
      I: 0,
      C: 0,
      A: 0
    });
    setCurrentQuestion(0);
    setShowResult(false);
    setIsStarted(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>dica</h1>
      </header>
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {!isStarted ? (
          <div className="welcome-container glass-card">
            <div className="welcome-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h2 className="welcome-title">Avaliação Comportamental</h2>
            <p className="welcome-description">
              Descubra seu perfil psicológico predominante em menos de 5 minutos e entenda como você interage com o mundo ao seu redor.
            </p>
            <button className="primary-button" onClick={startQuiz}>
              Começar Agora
            </button>
          </div>
        ) : !showResult ? (
          <QuestionScreen 
            question={questionsData[currentQuestion]} 
            onAnswer={handleAnswer}
            progress={(currentQuestion / questionsData.length) * 100}
            questionNumber={currentQuestion + 1}
            totalQuestions={questionsData.length}
          />
        ) : (
          <ResultScreen 
            answers={answers} 
            onReset={resetQuiz}
          />
        )}
      </main>
      <footer style={{ textAlign: 'center', padding: '24px', color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
        &copy; 2026 dica &bull; Behavioral Intelligence
      </footer>
    </div>
  );
}

export default App;