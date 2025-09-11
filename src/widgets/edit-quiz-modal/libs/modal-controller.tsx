import { Quiz } from "@/entities/quiz/types/quiz";

let openFn: (value: Quiz) => void = () => {};
let closeFn: () => void = () => {};

export const editQuiz = {
  open: (value: Quiz) => openFn(value),
  close: () => closeFn(),
};

export const registerEditQuizModal = (
  open: (value: Quiz) => void,
  close: () => void
) => {
  openFn = open;
  closeFn = close;
};
