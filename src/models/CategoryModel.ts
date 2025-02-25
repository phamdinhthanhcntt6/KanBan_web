export interface CategoryModel {
  id: string;
  _id: string;
  title: string;
  parentId: string;
  slug: string;
  description: string;
  createAt: string;
  updateAt: string;
  children: CategoryModel[];
}
