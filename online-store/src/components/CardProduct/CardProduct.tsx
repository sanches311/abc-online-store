import * as React from 'react';
import classes from './CardProduct.module.scss';
import { IProduct } from '../../interfaces/products';
import RatingProduct from '../RatingProduct/RatingProduct';

type Props = {
    product: IProduct;
    key: number;
}


const CardProduct = ({product}: Props) => {
    console.log(product);
    return ( 
        <div className={classes.wrapper_card}>
            <div className={classes.wrapper_img}>
                <img src={product.image} alt="image" />
            </div>
            <div className={classes.wrapper_rating}>
                <RatingProduct rate ={product.rating.rate}></RatingProduct>
                <div className={classes.small_text}>coments: {product.rating.count}</div>
            </div>
            <div className={classes.title}>{product.title}</div>
            <div className={classes.price}>{product.price}$</div>
            <button className={classes.tocart_btn}>To cart</button>
        </div>
     );
}
 
export default CardProduct;