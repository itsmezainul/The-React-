function FinishScreeen({ points, maxPosiblePoints, highscore, dispatcher }) {
  const percentage = (points / maxPosiblePoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🎗️";
  if (percentage > 80 && percentage < 100) emoji = "😃";
  if (percentage <= 80 && percentage > 50) emoji = "👍";
  if (percentage <= 50) emoji = "😐";
  if (percentage === 0) emoji = "🤦";
  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> Out of{" "}
        {maxPosiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} Points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatcher({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreeen;
