import React from 'react';
import WriteArticleForm from '@/features/article/write/ui/WriteArticleForm';
import { fetchCategory } from '@/entities/category/api/fetch-category';

const WriteArticlePage = async () => {
  const categories = await fetchCategory();

  return (
    <div>
      <WriteArticleForm categories={categories} />
    </div>
  );
};

export default WriteArticlePage;
