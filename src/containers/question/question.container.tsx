import { useState } from "react";
import { IconButton } from "@mui/material";
import {
  AddCircleOutline,
  FormatListBulletedOutlined,
} from "@mui/icons-material";

import "./question.container.css";
import { ListQuestion, FormQuestion } from "./components";

const QuestionContainer = () => {
  const [formVisible, setFormVisible] = useState(false);

  return (
    <div className="container">
      <div className="row">
        <h2>Question Survey</h2>
        <IconButton size="large" onClick={() => setFormVisible(!formVisible)}>
          {!formVisible ? (
            <AddCircleOutline fontSize="large" />
          ) : (
            <FormatListBulletedOutlined fontSize="large" />
          )}
        </IconButton>
      </div>
      {formVisible ? (
        <FormQuestion setFormVisible={setFormVisible} />
      ) : (
        <ListQuestion />
      )}
    </div>
  );
};

export default QuestionContainer;
