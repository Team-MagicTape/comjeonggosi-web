import React from 'react';
import EditArticleForm from '@/features/article/edit/ui/EditArticleForm';
import { PathParams } from "@/shared/types/path-params";

const EditArticlePage = ({ params }: PathParams) => {
  const articleId = Number(params);

  return (
    <div>
      <EditArticleForm articleId={articleId} />
    </div>
  );
};

export default EditArticlePage;