export interface WishListModel {
  _id: string;
  createdBy: string;
  productId: IProduct;
}

export interface IProduct {
  _id: string;
  title: string;
  slug: string;
  description: string;
  categories: string[];
  supplier: string;
  images: string[];
  expiryDate: string;
  createAt: string;
  updateAt: string;
  content: string;
  rating: number;
}
