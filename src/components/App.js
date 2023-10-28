import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreeen from "./FinishScreeen";
import Footer from "./Footer";
import Timer from "./Timer";

const initialState = {
  questions: [],

  // loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

const SECS_PER_QUESTIONS = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTIONS,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index++, answer: null };
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action Unkown");
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatcher,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPosiblePoints = questions.reduce((acc, curr) => {
    return acc + curr.points;
  }, 0);
  useEffect(function () {
    fetch("https://json-server-8yb8.onrender.com/questions")
      .then((res) => res.json())
      .then((data) => dispatcher({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatcher({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatcher={dispatcher} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPosiblePoints={maxPosiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatcher={dispatcher}
              answer={answer}
            />
            <Footer>
              <Timer
                dispatcher={dispatcher}
                secondsRemaining={secondsRemaining}
              />
              <NextButton
                dispatcher={dispatcher}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreeen
            points={points}
            maxPosiblePoints={maxPosiblePoints}
            highscore={highscore}
            dispatcher={dispatcher}
          />
        )}
      </Main>
    </div>
  );
}
