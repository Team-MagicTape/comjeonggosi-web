"use client";

import Input from "@/shared/ui/Input";
import Button from "@/shared/ui/Button";
import Select from "@/shared/ui/Select";
import { useCreateArticle } from "../model/useCreateArticle";
import { Category } from "@/entities/category/types/category";
import dynamic from "next/dynamic";
import "katex/dist/katex.min.css";
import Markdown from "@/shared/ui/Markdown";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface Props {
  categories: Category[];
}

const CrateArticleForm = ({ categories }: Props) => {
  const {
    title,
    setTitle,
    content,
    setContent,
    handleSignup,
    categoryId,
    setCategoryId,
    isMounted
  } = useCreateArticle();

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-4">
      <Input
        value={title}
        placeholder="제목을 입력해주세요."
        onChange={(e) => setTitle(e.target.value)}
      />

      {isMounted && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4" data-color-mode="light">
          <MDEditor
            value={content}
            onChange={(val) => setContent(val || "")}
            height={400}
            preview="edit"
          />

          <div className="p-4 border border-gray-300 rounded bg-white overflow-y-auto h-full">
            <Markdown
              content={content}
            />
          </div>
        </div>
      )}

      <Select
        value={categoryId}
        onChange={(e) => setCategoryId(Number(e.target.value))}
      >
        <option value="">카테고리를 선택해주세요.</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>
      <Button type="submit">완료</Button>
    </form>
  );
};

export default CrateArticleForm;
