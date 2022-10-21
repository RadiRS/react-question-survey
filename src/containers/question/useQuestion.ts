import { useEffect, useState } from "react";

interface OptionInterface {
  id: string;
  option: string;
}

interface QuestionInterface {
  id: string;
  question: string;
  options: OptionInterface[];
}

export const useQuestion = () => {
  const [questions, setQuestions] = useState<QuestionInterface[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("questions");
    if (!data) return;

    const transData: QuestionInterface[] = JSON.parse(data);

    setQuestions(transData);
  }, []);

  useEffect(() => {
    if (!questions.length) return;

    const data = JSON.stringify(questions);
    localStorage.setItem("questions", data);
  }, [questions]);

  const addQuestion = (question: QuestionInterface) => {
    setQuestions((prevState) => [...prevState, question]);
  };

  const removeQuestion = (id: string) => {
    const newQuestions = questions.filter((item) => item.id !== id);
    if (!newQuestions.length) {
      const data = JSON.stringify(newQuestions);
      localStorage.setItem("questions", data);
    }

    setQuestions(newQuestions);
  };

  const editQuestion = (question: QuestionInterface) => {
    const newQuestions = questions.map((item) => {
      if (item.id !== question.id) return item;

      return question;
    });

    setQuestions(newQuestions);
  };

  return {
    questions,
    addQuestion,
    removeQuestion,
    editQuestion,
  };
};
