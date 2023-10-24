function Options({ question, dispatcher, answer }) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((val, index) => (
        <button
          key={val}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          onClick={() => dispatcher({ type: "newAnswer", payload: index })}
          disabled={hasAnswered}
        >
          {val}
        </button>
      ))}
    </div>
  );
}

export default Options;
