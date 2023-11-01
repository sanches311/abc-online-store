export interface IProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  size?: string | null;
  color?: string;
  quantity?: number;
  rating: {
    rate: number;
    count: number;
  };
}
