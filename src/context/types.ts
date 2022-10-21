export interface OptionInterface {
  id: string;
  option: string;
}

export interface QuestionInterface {
  id: string;
  question: string;
  options: OptionInterface[];
}

export type QuestionContextType = {
  questions: QuestionInterface[];
  question: QuestionInterface | null;
  setQuestions: (questions: QuestionInterface[]) => void;
  setQuestion: (question: QuestionInterface | null) => void;
  addQuestion: (question: QuestionInterface) => void;
  editQuestion: (question: QuestionInterface) => void;
  removeQuestion: (id: string) => void;
};
