import React, { createContext, useEffect, useState } from "react";
import { QuestionContextType, QuestionInterface } from "./types";

export const QuestionContext = createContext<QuestionContextType | null>(null);

interface QuestionProviderInterface {
  children: React.ReactNode;
}

const QuestionProvider = ({ children }: QuestionProviderInterface) => {
  const [questions, setQuestions] = useState<QuestionInterface[]>([]);
  const [question, setQuestion] = useState<QuestionInterface | null>(null);

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

  const value = {
    questions,
    question,
    setQuestions,
    setQuestion,
    addQuestion,
    removeQuestion,
    editQuestion,
  };

  return (
    <QuestionContext.Provider value={value}>
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionProvider;
