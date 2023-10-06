import { IProduct } from '../interfaces/products';

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
