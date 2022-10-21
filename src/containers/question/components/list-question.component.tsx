import { useContext } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { HighlightOff, EditOutlined } from "@mui/icons-material";
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
  DropResult,
} from "react-beautiful-dnd";

import { reorder } from "../../../app/utils";
import { QuestionContext } from "../../../context/question.context";
import { QuestionContextType, QuestionInterface } from "../../../context/types";
import QuestionItem from "./item-question.component";

interface ListQuestionProps {
  setFormVisible: (visible: boolean) => void;
}

const ListQuestion = ({ setFormVisible }: ListQuestionProps) => {
  const { questions, setQuestions, setQuestion, removeQuestion } = useContext(
    QuestionContext
  ) as QuestionContextType;

  const onPressEdit = (item: QuestionInterface) => {
    setQuestion(item);
    setFormVisible(true);
  };

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;

    const newItems = reorder(questions, source.index, destination.index);

    setQuestions(newItems);
  };

  return (
    <div className="mv">
      <h4 className="mb">List Question</h4>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {questions.map((item, i) => (
                <QuestionItem
                  key={item.id}
                  item={item}
                  index={i}
                  onPressEdit={() => onPressEdit(item)}
                  onPressRemove={() => removeQuestion(item.id)}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ListQuestion;
