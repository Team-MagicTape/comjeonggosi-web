import React from 'react';
import CreateArticleForm from '@/features/article/create/ui/CreateArticleForm';
import { fetchCategory } from '@/entities/category/api/fetch-category';

const WriteArticlePage = async () => {
  const categories = await fetchCategory();

  return (
    <div>
      <CreateArticleForm categories={categories} />
    </div>
  );
};

export default WriteArticlePage;
