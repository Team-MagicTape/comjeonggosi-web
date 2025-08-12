"use client";

import Input from "@/shared/ui/Input";
import Button from "@/shared/ui/Button";
import TextArea from "@/shared/ui/TextArea";
import { useEditArticle } from "../model/useEditArticle";

interface Props {
  articleId: number;
}

const EditArticleForm = ({ articleId }: Props) => {
  const { title, setTitle, content, setContent, handleEdit } = useEditArticle();

  return (
    <form
      onSubmit={(e) => handleEdit(e, articleId)}
      className="flex flex-col gap-2"
    >
      <Input
        value={title}
        placeholder="제목을 입력해주세요."
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextArea
        value={content}
        placeholder="내용을 입력해주세요."
        onChange={(e) => setContent(e.target.value)}
      />
      <Button type="submit">완료</Button>
    </form>
  );
};

export default EditArticleForm;
