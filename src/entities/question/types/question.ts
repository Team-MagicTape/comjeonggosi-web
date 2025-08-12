export interface Question {
  // TODO: API 명세 확정 후 실제 Question 타입으로 교체 필요

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
