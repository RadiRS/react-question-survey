import { HighlightOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { ChangeEvent, useState } from "react";

import { getUuid } from "../../../app/utils";
import { useQuestion } from "../useQuestion";

interface OptionInterface {
  id: string;
  option: string;
}

interface FormInterface {
  id: string;
  question: string;
  options: OptionInterface[];
}

interface FormQuestionProps {
  setFormVisible: (visible: boolean) => void;
}

const FormQuestion = ({ setFormVisible }: FormQuestionProps) => {
  const { addQuestion } = useQuestion();
  const [form, setForm] = useState<FormInterface>({
    id: getUuid(),
    question: "",
    options: [{ id: getUuid(), option: "" }],
  });

  const onPressSubmit = () => {
    const canSave = !!form.question && form.options.every((v) => !!v.option);

    if (!canSave) return;

    addQuestion(form);

    setTimeout(() => {
      setFormVisible(false);
    }, 100);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangeOption = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedOption = form.options.filter(
      (opt) => opt.id === e.target.name
    )[0];

    selectedOption.option = e.target.value;
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
