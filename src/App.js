
import './App.css';
import { questionData } from './questions';
import { useEffect, useState } from 'react';
// import QuestionDisplay from './QuestionDisplay';
// import CategoryButtons from './CategoryButtons';
// import ShuffleButton from './ShuffleButton';

export default function App() {
  const [ currentQuestion, setCurrentQuestion ] = useState('');
  const [ category, setCategory ] = useState('gettingToKnow');

  // loads intial question
  useEffect(() => {
    const intialQuestion = getRandomQuestion(category);
    setCurrentQuestion(intialQuestion);
  }, [category]);

  // generates random question from category
  function getRandomQuestion(category) {
    const questions = questionData[category];
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  }

  // creates new question
  function shuffleQuestion() {
    let newQuestion = getRandomQuestion(category);

    let attempts = 0;
    let maxAttempts = 10;
    while (newQuestion === currentQuestion && attempts < maxAttempts) {
      newQuestion = getRandomQuestion(category);
      attempts++;
    }
    setCurrentQuestion(newQuestion);
  }

  // For setting category
  function handleCategory(newCategory) {
    setCategory(newCategory);
    const newQuestion = getRandomQuestion(newCategory);
    setCurrentQuestion(newQuestion);
  }

  const categoryLabels = {
    gettingToKnow: "Getting to Know",
    deep: "Deep",
    creative: "Creative",
    fun: "Fun",
  };

// TODO add rating system and backend for storing

  // Once everything works move displays to different .js, better to keep here for debugging for now
  return (
    <main className="container">
      <h1 className="title">
        {/* Random Questions */}
        Questions Worth Asking
      </h1>
      <button className="question__button" onClick={ shuffleQuestion }>
        Shuffle Question
        {/* New Question ✨ */}
      </button>
      <h2 className="question" key={currentQuestion}>{currentQuestion}</h2>
      <div className="category__buttons">
        <button onClick={() => handleCategory("gettingToKnow")}
          className={category === "gettingToKnow" ? "active" : ""}
        >
          Getting To Know
        </button>
        <button onClick={() => handleCategory("deep")}
          className={category === "deep" ? "active" : ""}  
        >
          Deep
        </button>
        <button onClick={() => handleCategory("creative")}
          className={category === "creative" ? "active" : ""}
        >
          Creative
        </button>
        <button onClick={() => handleCategory("fun")}
          className={category === "fun" ? "active" : ""}
        >
          Fun
        </button>
        {/* <p>Select Category above</p> */}
      </div>
      <p className="categoryDisplay">Current Category: { categoryLabels[category] }</p>
      
      <footer className="footer">
        <p>Skip the small talk. Start real conversations.</p>
      </footer>
    </main>
  );
}


