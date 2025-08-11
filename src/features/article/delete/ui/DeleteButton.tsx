'use client';

import Button from '@/shared/ui/Button';
import { useDeleteArticle } from '@/features/article/delete/model/useDeleteArticle';

interface Props {
  articleId: number;
}

const DeleteButton = ({ articleId }: Props) => {
  const { handleDelete } = useDeleteArticle();

  return (
    <Button onClick={() => handleDelete(articleId)}>
      삭제
    </Button>
  );
};

export default DeleteButton;
