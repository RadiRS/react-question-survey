import { Checkbox } from "@mui/material";

const ListQuestion = () => {
  const questions = [
    {
      question: "This is first question?",
      answer: "This is second option",
      options: [
        "This is first option",
        "This is second option",
        "This is third option",
        "This is four option",
      ],
    },
    {
      question: "This is second question?",
      answer: "This is first answer",
      options: [
        "This is first option",
        "This is second option",
        "This is third option",
        "This is four option",
      ],
    },
  ];

  return (
    <div className="mv">
      <h4 className="mb">List Question</h4>
      {questions.map((item, i) => (
        <div key={`${i}`} className="question">
          <p>{item.question}</p>
          {item.options.map((ans) => (
            <div className="option" key={ans}>
              <Checkbox />
              <p>{ans}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ListQuestion;
