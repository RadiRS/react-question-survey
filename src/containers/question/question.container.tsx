import { useContext, useState } from "react";
import { IconButton } from "@mui/material";
import {
  AddCircleOutline,
  FormatListBulletedOutlined,
} from "@mui/icons-material";

import { QuestionContext, QuestionContextType } from "../../context";
import { ListQuestion, FormQuestion } from "./components";

import "./question.container.css";

const QuestionContainer = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const { setQuestion } = useContext(QuestionContext) as QuestionContextType;

  const onPressToggleForm = () => {
    setQuestion(null);
    setFormVisible(!isFormVisible);
  };

  return (
    <div className="container">
      <div className="row">
        <h2>Question Survey</h2>
        <IconButton size="large" onClick={onPressToggleForm}>
          {!isFormVisible ? (
            <AddCircleOutline fontSize="large" />
          ) : (
            <FormatListBulletedOutlined fontSize="large" />
          )}
        </IconButton>
      </div>
      {isFormVisible ? (
        <FormQuestion setFormVisible={setFormVisible} />
      ) : (
        <ListQuestion setFormVisible={setFormVisible} />
      )}
    </div>
  );
};

export default QuestionContainer;
