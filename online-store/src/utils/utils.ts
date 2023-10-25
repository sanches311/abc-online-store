import { IProduct } from '../interfaces/products';
import { ICart } from '../store/userSlice';

export const sortBy = (list: IProduct[], param: string | null): IProduct[] => {
  if (!param) return list;
  if (param === 'popular') {
    list.sort((a: IProduct, b: IProduct) => {
      return b.rating.rate - a.rating.rate;
    });
  }
  if (param === 'price:asc') {
    list.sort((a: IProduct, b: IProduct) => {
      return a.price - b.price;
    });
  }
  if (param === 'price:desc') {
    list.sort((a: IProduct, b: IProduct) => {
      return b.price - a.price;
    });
  }
  return list;
};

export const searchItem = (list: IProduct[], query: string): IProduct[] | null => {
  if (!query) return list;
  return list.filter((item) => item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
};

export const compareProduct = (obj1: ICart, obj2: ICart) => {
  if (obj1.id != obj2.id) return true;
  else if (obj1.size != obj2.size) return true;
  else if (obj1.color != obj2.color) return true;
  else return false;
};
