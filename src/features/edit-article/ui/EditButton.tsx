"use client";

import Button from "@/shared/ui/Button";
import { useCustomRouter } from "@/shared/model/useCustomRouter";

interface Props {
  articleId: string;
}

const EditButton = ({ articleId }: Props) => {
  const router = useCustomRouter();

  const handleClick = () => {
    router.push(`/admin/articles/${articleId}/edit`);
  };

  return <Button onClick={handleClick}>수정</Button>;
};

export default EditButton;
