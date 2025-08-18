"use client";

import { apiClient } from "@/shared/libs/custom-axios";
import { ChangeEvent, useRef, useState } from "react";

const CreateQuizzes = () => {
  const [data, setData] = useState({ content: "", answer: "", categoryId: "" });
  const optionsRef = useRef<HTMLInputElement>(null);

  const handleData = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    if (name !== "options") {
      setData((prev) => ({ ...prev, [name]: Number(value) || value }));
    }
  };

  const submit = async () => {
    const options = optionsRef.current?.value.split(",");
    try {
      await apiClient.post("/admin/quizzes", { ...data, options });
      alert("퀴즈 등록 성공");
    } catch {
      alert("퀴즈 등록 실패");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="문제"
        name="content"
        value={data.content}
        onChange={handleData}
      />
      <input
        type="text"
        placeholder="정답"
        name="answer"
        value={data.answer}
        onChange={handleData}
      />
      <input
        type="text"
        placeholder="선지 (,로 구분)"
        name="options"
        ref={optionsRef}
      />
      <input
        type="text"
        placeholder="카테고리 ID"
        name="categoryId"
        value={data.categoryId}
        onChange={handleData}
      />
      <button onClick={submit}>섭밋</button>
    </div>
  );
};

export default CreateQuizzes;
