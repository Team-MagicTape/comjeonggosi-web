'use client';

import Button from '@/shared/ui/Button';
import { useRouter } from 'next/navigation';

interface Props {
  articleId: number;
}

const EditButton = ({ articleId }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/admin/articles/${articleId}/edit`);
  };

  return (
    <Button onClick={handleClick}>
      수정
    </Button>
  );
};

export default EditButton;
