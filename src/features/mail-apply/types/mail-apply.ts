export interface Category {
  id: number;
  name: string;
}

export interface SubscribeMail {
  hour: number;
  categories: Category[];
}