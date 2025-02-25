export interface StatisticModel {
  key: string;
  description: string;
  value: number;
  valueTtype: "number" | "currency";
  type?: "horizontal" | "vertical";
  icon: string;
  color: string;
}
