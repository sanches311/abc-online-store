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
export const upperFirstLetter = (str: string) => str[0].toUpperCase() + str.slice(1);

export const parseJwt = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
  return JSON.parse(jsonPayload);
};
