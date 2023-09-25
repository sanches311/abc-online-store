import * as React from 'react';
import classes from './CardList.module.scss';
import { useGetAllProductsQuery } from '../../store/apiSlice';
import CardProduct from '../CardProduct/CardProduct';

const CardList = () => {
    const {data: products, isLoading} = useGetAllProductsQuery();

    return ( 
        <div className={classes.wrapper}>
           {isLoading ? 'Loading ...' : products ? products.map((product) => <CardProduct product = {product} key={product.id}/>) : ''}
        </div>
     );
}
 
export default CardList;