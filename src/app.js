import React, { useState } from 'react';
import './App.css';
import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';
import questionsData from './data/questions';

function App() {
  const [appState, setAppState]         = useState('intro'); // intro | test | processing | result
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers]           = useState({ D: 0, I: 0, C: 0, A: 0 });

  const handleAnswer = (type) => {
    const next = { ...answers, [type]: answers[type] + 1 };
    setAnswers(next);

    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setAppState('processing');
      setTimeout(() => setAppState('result'), 1800);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const reset = () => {
    setAnswers({ D: 0, I: 0, C: 0, A: 0 });
    setCurrentQuestion(0);
    setAppState('intro');
  };

  if (appState === 'result') {
    return <ResultScreen answers={answers} onReset={reset} />;
  }

  if (appState === 'processing') {
    return (
      <div className="app-shell">
        <div className="processing anim-fade-in">
          <h2 className="processing__title">Analisando respostas</h2>
          <p className="processing__sub">
            Cruzando seus padrões com nossa base de perfis comportamentais...
          </p>
          <div className="processing__dots">
            <div className="processing__dot" style={{ animationDelay: '0s' }} />
            <div className="processing__dot" style={{ animationDelay: '0.2s' }} />
            <div className="processing__dot" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
    );
  }

  if (appState === 'test') {
    return (
      <QuestionScreen
        question={questionsData[currentQuestion]}
        onAnswer={handleAnswer}
        onPrevious={handlePrevious}
        progress={((currentQuestion + 1) / questionsData.length) * 100}
        questionNumber={currentQuestion + 1}
        totalQuestions={questionsData.length}
      />
    );
  }

  return (
    <div className="app-shell">
      <div className="intro anim-fade-up">
        <div className="intro__inner">
          <span className="intro__logo">DICA</span>
          <h1 className="intro__title">Descubra seu perfil comportamental</h1>
          <p className="intro__desc">
            Responda às questões com honestidade. Não há respostas certas ou erradas — cada
            escolha revela um traço genuíno da sua forma de agir no mundo.
          </p>
          <button className="btn-primary" onClick={() => setAppState('test')}>
            Iniciar Avaliação
          </button>
          <p className="intro__meta">{questionsData.length} questões · ~5 minutos</p>
        </div>
      </div>
    </div>
  );
}

export default App;
