"use client";

import { apiClient } from "@/shared/libs/custom-axios";
import { ChangeEvent, useState } from "react";

const CreateCategory = () => {
  const [data, setData] = useState({ name: "", description: "" });

  const handleData = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: Number(value) || value }));
  };

  const submit = async () => {
    try {
      await apiClient.post("/admin/categories", data);
      alert("카테고리 등록 성공");
    } catch {
      alert("카테고리 등록 실패");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="이름"
        name="name"
        value={data.name}
        onChange={handleData}
      />
      <input
        type="text"
        placeholder="설명"
        name="description"
        value={data.description}
        onChange={handleData}
      />
      <button onClick={submit}>섭밋</button>
    </div>
  );
};

export default CreateCategory;
