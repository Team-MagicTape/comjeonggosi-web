'use client';

import Button from '@/shared/ui/Button';
import { useDeleteArticle } from '@/features/article/delete/model/useDeleteArticle';

interface Props {
  articleId: number;
}

const EditButton = ({ articleId }: Props) => {
  const { handleDelete } = useDeleteArticle();

  return (
    <Button onClick={() => handleDelete(articleId)}>
      수정
    </Button>
  );
};

export default EditButton;
