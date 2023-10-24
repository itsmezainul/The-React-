function StartScreen({ numQuestions, dispatcher }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quizz</h2>
      <h3>{numQuestions} question to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatcher({ type: "start" })}
      >
        Let't start
      </button>
    </div>
  );
}

export default StartScreen;
