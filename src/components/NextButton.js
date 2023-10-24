function NextButton({ dispatcher, answer, index, numQuestions }) {
  if (answer === null) return null;
  return (
    <>
      {index < numQuestions - 1 && (
        <button
          className="btn btn-ui"
          onClick={() => dispatcher({ type: "nextQuestion" })}
        >
          Next
        </button>
      )}
      {index === numQuestions - 1 && (
        <button
          className="btn btn-ui"
          onClick={() => dispatcher({ type: "finished" })}
        >
          Finish
        </button>
      )}
    </>
  );
}

export default NextButton;
