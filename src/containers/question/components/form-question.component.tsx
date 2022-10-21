import { HighlightOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { ChangeEvent, useContext, useState } from "react";

import { getUuid } from "../../../app/utils";
import { QuestionInterface, QuestionContextType } from "../../../context/types";
import { QuestionContext } from "../../../context/question.context";

interface FormQuestionProps {
  setFormVisible: (visible: boolean) => void;
}

const FormQuestion = ({ setFormVisible }: FormQuestionProps) => {
  const { addQuestion, question, editQuestion, setQuestion } = useContext(
    QuestionContext
  ) as QuestionContextType;

  const [form, setForm] = useState<QuestionInterface>(
    question || {
      id: getUuid(),
      question: "",
      options: [{ id: getUuid(), option: "" }],
    }
  );

  const onPressSubmit = () => {
    const canSave = !!form.question && form.options.every((v) => !!v.option);

    if (!canSave) return;

    if (!question) addQuestion(form);
    else editQuestion(form);

    setTimeout(() => {
      setFormVisible(false);
    }, 100);
  };

  const onPressCancel = () => {
    setQuestion(null);
    setFormVisible(false);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangeOption = (e: ChangeEvent<HTMLInputElement>) => {
    const newForm = {
      ...form,
      options: form.options.map((item) => {
        if (item.id !== e.target.name) return item;

        return {
          ...item,
          option: e.target.value,
        };
      }),
    };

    setForm(newForm);
  };

  const onPressAddOption = () => {
    const newOption = {
      id: getUuid(),
      option: "",
    };

    setForm((prevState) => ({
      ...prevState,
      options: [...prevState.options, newOption],
    }));
  };

  const onPressRemoveOption = (id: string) => {
    const newOptions = form.options.filter((item) => item.id !== id);

    setForm((prevState) => ({
      ...prevState,
      options: newOptions,
    }));
  };

  return (
    <div className="mv">
      <h4 className="mb">Form Question</h4>
      <OutlinedInput
        fullWidth
        name="question"
        id="outlined-basic"
        placeholder="Question"
        className="mb"
        value={form.question}
        onChange={onChange}
      />
      {form.options.map((item, i) => (
        <div key={item.id} className="row">
          <OutlinedInput
            fullWidth
            name={`${item.id}`}
            id="outlined-basic"
            placeholder={`Option ${i + 1}`}
            className="mb"
            onChange={onChangeOption}
            value={item.option}
            endAdornment={
              form.options.length > 1 && (
                <InputAdornment position="end">
                  <IconButton onClick={() => onPressRemoveOption(item.id)}>
                    <HighlightOff />
                  </IconButton>
                </InputAdornment>
              )
            }
          />
        </div>
      ))}
      <div className="mv">
        <Button
          variant="outlined"
          size="large"
          style={{ marginRight: 16 }}
          onClick={onPressAddOption}
        >
          Add Option
        </Button>
        <Button
          variant="outlined"
          size="large"
          color="error"
          style={{ marginRight: 16 }}
          onClick={onPressCancel}
        >
          Cancel
        </Button>
        <Button
          variant="outlined"
          size="large"
          color="success"
          onClick={onPressSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default FormQuestion;
