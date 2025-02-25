import { SubProductModel } from "./SubProductModel";

export interface ProductModel {
  _id: string;
  title: string;
  description: string;
  supplier: string;
  categories: string[];
  slug: string;
  isDeleted: boolean;
  createAt: string;
  updateAt: string;
  subItems: SubProductModel[];
  content: string;
  images: string[];
  _v: number;
  rating: number;
}
