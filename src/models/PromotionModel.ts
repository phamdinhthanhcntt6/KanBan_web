export interface PromotionModel {
  id: string;
  title: string;
  description: string;
  code: string;
  value: number;
  numOfAvailable: number;
  type: string;
  images: string[];
  startAt: string | Date;
  endAt: string | Date;
}
