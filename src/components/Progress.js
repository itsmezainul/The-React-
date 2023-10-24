function Progress({ numQuestions, index, answer, points, maxPosiblePoints }) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Questions <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{maxPosiblePoints}
      </p>
    </header>
  );
}

export default Progress;
