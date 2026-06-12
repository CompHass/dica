import React from 'react';

function ResultScreen({ answers, onReset }) {
  const getHighestType = () => {
    const types = Object.entries(answers);
    types.sort((a, b) => b[1] - a[1]);
    return types[0];
  };
  
  const [dominantType] = getHighestType();
  const totalAnswers = Object.values(answers).reduce((sum, value) => sum + value, 0);
  
  const descriptions = {
    D: {
      title: "DOMINADOR",
      colorClass: "type-d",
      description: "Você tem uma personalidade dominante, assertiva e orientada para resultados. Gosta de liderar, tomar decisões rápidas e buscar desafios."
    },
    I: {
      title: "INTENSO",
      colorClass: "type-i",
      description: "Você tem uma personalidade expressiva, entusiasta e social. Gosta de interagir com pessoas, é otimista, persuasivo e espontâneo."
    },
    C: {
      title: "CONTROLADOR",
      colorClass: "type-c",
      description: "Você tem uma personalidade analítica, detalhista e precisa. Valoriza a qualidade, é metódico e busca perfeição."
    },
    A: {
      title: "AMOROSO",
      colorClass: "type-a",
      description: "Você tem uma personalidade estável, paciente e confiável. É um bom ouvinte, leal e busca harmonia."
    }
  };

  return (
    <div className="result-container">
      <div className="result-header">
        <span className="result-eyebrow">Seu Perfil Principal</span>
        <h2 className={`dominant-type-name ${descriptions[dominantType].colorClass}`}>
          {descriptions[dominantType].title}
        </h2>
      </div>

      <div className="glass-card result-card-content">
        <p className="result-description">
          {descriptions[dominantType].description}
        </p>
        
        <div className="stats-container">
          <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>
            Distribuição de Perfil
          </h4>
          {Object.entries(answers).map(([type, value]) => {
            const percentage = (value / totalAnswers) * 100;
            return (
              <div key={type} className="stat-row">
                <div className="stat-label-row">
                  <span>{descriptions[type].title}</span>
                  <span>{Math.round(percentage)}%</span>
                </div>
                <div className="stat-bar-bg">
                  <div 
                    className={`stat-bar-fill ${descriptions[type].colorClass}`} 
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: `var(--color-${type.toLowerCase()})`
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button className="primary-button" onClick={onReset} style={{ margin: '0 auto' }}>
        Refazer Avaliação
      </button>
      
      <button className="secondary-button" onClick={() => window.print()} style={{ maxWidth: '280px', margin: '0 auto' }}>
        Exportar PDF
      </button>
    </div>
  );
}

export default ResultScreen;