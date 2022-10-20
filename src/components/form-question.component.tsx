import { HighlightOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";
import { getUuid } from "../utils";

interface OptionInterface {
  id: string;
  option: string;
}

interface FormInterface {
  id: string;
  question: string;
  answer: string;
  options: OptionInterface[];
}

const FormQuestion = () => {
  const [form, setForm] = useState<FormInterface>({
    id: getUuid(),
    question: "",
    answer: "",
    options: [{ id: getUuid(), option: "" }],
  });

  const onPressSubmit = () => {};

  // const onChange = (e: FormEvent<HTMLInputElement>) => {
  //   setForm((prevState) => ({
  //     ...prevState,
  //     [e.currentTarget.name]: e.currentTarget.value,
  //   }));
  // };

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
      />
      {form.options.map((item, i) => (
        <div key={item.id} className="row">
          <OutlinedInput
            fullWidth
            name={`option-${item.id}`}
            id="outlined-basic"
            placeholder={`Option ${i + 1}`}
            className="mb"
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
        <Button variant="outlined" size="large" onClick={onPressAddOption}>
          Add Option
        </Button>
        <Button variant="outlined" size="large" onClick={onPressSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default FormQuestion;
