export interface ICartLoginUser {
  id: number;
  userId: number;
  date: string;
  products: Product[];
  __v: number;
}

export interface Product {
  productId: number;
  quantity: number;
}
export interface ICart {
  id: number;
  image: string;
  title: string;
  category: string;
  size?: string | null;
  color?: string | null;
  quantity: number;
  price: number;
  description: string;
}
export interface IQuantity {
  product: ICart;
  quantity: number;
}

export interface IUserOrders {
  id: number;
  userId: number;
  date: string;
  products: Product[];
  __v: number;
}
