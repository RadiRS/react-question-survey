import { Checkbox, IconButton } from "@mui/material";
import { HighlightOff, EditOutlined } from "@mui/icons-material";

import { QuestionContext } from "../../../context/question.context";
import { QuestionContextType, QuestionInterface } from "../../../context/types";
import { useContext } from "react";

interface ListQuestionProps {
  setFormVisible: (visible: boolean) => void;
}

const ListQuestion = ({ setFormVisible }: ListQuestionProps) => {
  const { questions, setQuestion, removeQuestion } = useContext(
    QuestionContext
  ) as QuestionContextType;

  const onPressEdit = (item: QuestionInterface) => {
    setQuestion(item);
    setFormVisible(true);
  };

  return (
    <div className="mv">
      <h4 className="mb">List Question</h4>

      {questions.map((item, i) => (
        <div key={`${i}`} className="question">
          <div className="row">
            <p>{item.question}</p>
            <div>
              <IconButton onClick={() => onPressEdit(item)}>
                <EditOutlined />
              </IconButton>
              <IconButton onClick={() => removeQuestion(item.id)}>
                <HighlightOff />
              </IconButton>
            </div>
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
