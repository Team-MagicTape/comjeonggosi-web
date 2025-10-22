export interface Workbook {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  owner?: {
    id: string;
    nickname: string;
    profileImageUrl: string | null;
  };
  _count?: {
    workbookQuizzes: number;
  };
}
