import { useState, ChangeEvent } from "react";

type QuizType = "MULTIPLE_CHOICE" | "OX" | "SHORT_ANSWER";

interface QuizFormData {
  content: string;
  answer: string;
  categoryId: string;
  articleId: string;
  difficulty: string;
  type: QuizType;
  explanation?: string;
  imageUrl: string;
  options: string[];
  imageFile: File | null;
  imagePreview: string | null;
}

const initialFormData: QuizFormData = {
  content: "",
  answer: "",
  categoryId: "",
  articleId: "",
  difficulty: "3",
  type: "MULTIPLE_CHOICE",
  explanation: "",
  imageUrl: "",
  options: ["", "", ""],
  imageFile: null,
  imagePreview: null,
};

export const useQuizCreator = () => {
  const [quizForms, setQuizForms] = useState<QuizFormData[]>([initialFormData]);
  const [isLoading, setIsLoading] = useState(false);

  const addQuizForm = () => {
    setQuizForms([...quizForms, { ...initialFormData }]);
  };

  const removeQuizForm = (formIndex: number) => {
    if (quizForms.length > 1) {
      setQuizForms(quizForms.filter((_, i) => i !== formIndex));
    }
  };

  const handleData = (
    formIndex: number,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;
    const newForms = [...quizForms];

    if (name === "type") {
      newForms[formIndex] = {
        ...newForms[formIndex],
        [name]: value as QuizType,
        answer: value === "OX" ? "O" : "",
        options: value === "MULTIPLE_CHOICE" ? ["", "", ""] : [],
      };
    } else if (name === "answer") {
      newForms[formIndex] = {
        ...newForms[formIndex],
        [name]: value,
      };
    } else {
      newForms[formIndex] = {
        ...newForms[formIndex],
        [name]:
          name === "categoryId" || name === "articleId"
            ? Number(value) || value
            : value,
      };
    }

    setQuizForms(newForms);
  };

  const handleOptionChange = (
    formIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const newForms = [...quizForms];
    newForms[formIndex].options[optionIndex] = value;
    setQuizForms(newForms);
  };

  const addOption = (formIndex: number) => {
    const newForms = [...quizForms];
    if (newForms[formIndex].options.length < 6) {
      newForms[formIndex].options.push("");
      setQuizForms(newForms);
    }
  };

  const removeOption = (formIndex: number, optionIndex: number) => {
    const newForms = [...quizForms];
    if (newForms[formIndex].options.length > 3) {
      newForms[formIndex].options = newForms[formIndex].options.filter(
        (_, i) => i !== optionIndex
      );
      setQuizForms(newForms);
    }
  };

  const handleImageChange = (
    formIndex: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("이미지 파일 크기는 5MB 이하여야 합니다.");
        return;
      }

      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const previewUrl = reader.result as string;
        const newForms = [...quizForms];
        newForms[formIndex].imageFile = file;
        newForms[formIndex].imagePreview = previewUrl;
        newForms[formIndex].imageUrl = previewUrl;
        setQuizForms(newForms);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (formIndex: number) => {
    const newForms = [...quizForms];
    newForms[formIndex].imageFile = null;
    newForms[formIndex].imagePreview = null;
    newForms[formIndex].imageUrl = "";
    setQuizForms(newForms);
  };

  const convertFormToApiData = (formData: QuizFormData) => {
    const choices =
      formData.type === "MULTIPLE_CHOICE"
        ? formData.options
            .filter((opt) => opt.trim() !== "")
            .map((opt) => ({
              text: opt,
              isCorrect: opt === formData.answer,
            }))
        : formData.type === "OX"
        ? [
            { text: "O", isCorrect: formData.answer === "O" },
            { text: "X", isCorrect: formData.answer === "X" },
          ]
        : [];

    const difficultyMap: { [key: string]: string } = {
      "1": "EASY",
      "2": "EASY",
      "3": "MEDIUM",
      "4": "HARD",
      "5": "HARD",
    };

    return {
      type: formData.type,
      category: formData.categoryId.toString(),
      subcategory: "",
      difficulty: difficultyMap[formData.difficulty] || "MEDIUM",
      question: formData.content,
      choices: choices,
      answer: formData.answer,
      explanation: formData.explanation || "",
      tags: [],
      source: "",
      yearAppeared: 0,
    };
  };

  const resetForms = () => {
    setQuizForms([initialFormData]);
  };

  const isFormValid = (formData: QuizFormData) => {
    return (
      formData.content.trim() &&
      formData.answer.trim() &&
      formData.categoryId &&
      (formData.type !== "MULTIPLE_CHOICE" ||
        formData.options.filter((opt) => opt.trim()).length >= 3)
    );
  };

  const isAllFormsValid = quizForms.every(isFormValid);

  return {
    quizForms,
    isLoading,
    setIsLoading,
    addQuizForm,
    removeQuizForm,
    handleData,
    handleOptionChange,
    addOption,
    removeOption,
    handleImageChange,
    removeImage,
    convertFormToApiData,
    resetForms,
    isAllFormsValid,
  };
};