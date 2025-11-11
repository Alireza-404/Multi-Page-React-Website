import type { ReactNode } from "react";

export interface CompaniesType {
  id: number;
  src: string;
  alt: string;
  aos: string;
}

export interface ProductFeturesType {
  id: number;
  title: string;
  description: string;
  darkSrc: string;
  lightSrc: string;
  icon: ReactNode;
}
