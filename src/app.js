import React, { useState } from 'react';
import './App.css';
import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';
import { Logo } from './components/Logo';
import questionsData from './data/questions';

function App() {
  const [isStarted, setIsStarted]       = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult]     = useState(false);
  const [answers, setAnswers]           = useState({ D: 0, I: 0, C: 0, A: 0 });

  const handleAnswer = (type) => {
    const next = { ...answers, [type]: answers[type] + 1 };
    setAnswers(next);
    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setAnswers({ D: 0, I: 0, C: 0, A: 0 });
    setCurrentQuestion(0);
    setShowResult(false);
    setIsStarted(false);
  };

  if (showResult) return <ResultScreen answers={answers} onReset={reset} />;

  if (isStarted) {
    return (
      <QuestionScreen
        question={questionsData[currentQuestion]}
        onAnswer={handleAnswer}
        progress={((currentQuestion + 1) / questionsData.length) * 100}
        questionNumber={currentQuestion + 1}
        totalQuestions={questionsData.length}
      />
    );
  }

  return (
    <div className="welcome">
      <nav className="welcome__nav">
        <Logo />
      </nav>
      <div className="welcome__body">
        <div className="welcome__card">
          <h1 className="welcome__title">
            Bem-vindo ao seu Questionário de Perfil Comportamental.
          </h1>
          <p className="welcome__desc">
            Descubra seus pontos fortes e padrões de comportamento em poucos minutos.
            Este teste foi projetado para fornecer insights valiosos sobre sua
            personalidade profissional e pessoal.
          </p>
          <button className="welcome__btn" onClick={() => setIsStarted(true)}>
            Iniciar Avaliação
          </button>
          <span className="welcome__meta">
            Tempo estimado: 10 minutos &nbsp;|&nbsp; {questionsData.length} questões
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
