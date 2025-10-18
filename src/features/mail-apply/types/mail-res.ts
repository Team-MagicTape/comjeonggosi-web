export interface CategoryType {
    id: string;
    name: string;
    description: string;
    deletedAt: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface MailResponseType {
    id: string;
    userId: string;
    hour: number;
    customEmail? : string | null
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    categories: CategoryType[];
  }
  