export interface Question {
  // deprecated, 없어서 내가 대충 만듦.

  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  views: number;
  likes: number;
  answersCount: number;
  isAnswered: boolean;
}
