export interface FilterModel {
  color?: string;
  category?: string[];
  size?: string;
  price?: {
    min: number;
    max: number;
  };
}
