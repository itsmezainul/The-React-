import { useEffect } from "react";

function Timer({ dispatcher, secondsRemaining }) {
  const min = Math.floor(secondsRemaining / 60);
  const sec = secondsRemaining % 60;

  useEffect(
    function () {
      const id = setInterval(() => {
        dispatcher({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatcher]
  );

  return (
    <div className="timer">
      {min < 10 && "0"}
      {min} : {sec < 10 && "0"}
      {sec}
    </div>
  );
}

export default Timer;
