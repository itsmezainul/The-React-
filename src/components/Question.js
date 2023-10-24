import Options from "./Options";

function Question({ question, dispatcher, answer }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatcher={dispatcher} answer={answer} />
    </div>
  );
}

export default Question;
