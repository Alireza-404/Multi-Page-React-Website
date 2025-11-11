export interface CategoryButtonsType {
  id: number;
  title: string;
}

export interface CategoriesType {
  id: number;
  type: string;
  title: string;
  description: string;
  src?: string;
  profile1?: string;
  profile2?: string;
  username1?: string;
  username2?: string;
  date: string;
}

export interface LatestType {
  id: number;
  type: string;
  title: string;
  description: string;
  profile1: string;
  profile2?: string;
  username1: string;
  username2?: string;
  date: string;
}
