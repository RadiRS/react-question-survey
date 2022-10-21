import { HighlightOff } from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";
import { useQuestion } from "../useQuestion";

const ListQuestion = () => {
  const { questions, removeQuestion } = useQuestion();

  return (
    <div className="mv">
      <h4 className="mb">List Question</h4>

      {questions.map((item, i) => (
        <div key={`${i}`} className="question">
          <div className="row">
            <p>{item.question}</p>
            <IconButton onClick={() => removeQuestion(item.id)}>
              <HighlightOff />
            </IconButton>
          </div>
          {item.options.map((ans) => (
            <div className="option" key={ans.id}>
              <Checkbox />
              <p>{ans.option}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ListQuestion;
