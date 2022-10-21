import React from "react";
import { Checkbox, IconButton, ListItem } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";

import { QuestionInterface } from "../../../context";
import { EditOutlined, HighlightOff } from "@mui/icons-material";

interface ItemQuestionProps {
  item: QuestionInterface;
  index: number;
  onPressEdit: () => void;
  onPressRemove: () => void;
}

const ItemQuestion: React.FC<ItemQuestionProps> = ({
  item,
  index,
  onPressEdit,
  onPressRemove,
}: ItemQuestionProps) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <ListItem
          style={{ width: "100%" }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {/* <ListItemText primary={item.question} /> */}
          <div className="question">
            <div className="row">
              <p>{item.question}</p>
              <div>
                <IconButton onClick={onPressEdit}>
                  <EditOutlined />
                </IconButton>
                <IconButton onClick={onPressRemove}>
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
        </ListItem>
      )}
    </Draggable>
  );
};

export default ItemQuestion;
