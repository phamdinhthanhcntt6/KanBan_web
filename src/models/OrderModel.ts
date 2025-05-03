export interface OrderModel {
  products: object[];
  total: number;
  contact: string;
  createAt?: string;
  updateAt?: string;
  email: string;
  payment: string;
  address: string;
  status: string;
  name: string;
  createdBy: string;
  _id: string;
}
