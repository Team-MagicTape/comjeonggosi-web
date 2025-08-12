import React from 'react';
import EditArticleForm from '@/features/article/edit/ui/EditArticleForm';

interface Props {
  params: { id: string };
}

const EditArticlePage = ({ params }: Props) => {
  const articleId = parseInt(params.id);

  return (
    <div>
      <EditArticleForm articleId={articleId} />
    </div>
  );
};

export default EditArticlePage;