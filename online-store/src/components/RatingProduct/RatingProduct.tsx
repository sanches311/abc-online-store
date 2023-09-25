import * as React from 'react';
import classes from './RatingProduct.module.scss';

type Props = {
    rate: number;
}

const RatingProduct = ({rate}: Props) => {

    return ( 
        <div className={`${classes.stars}`} style = {{'--rating': rate}} aria-label="Rating of this product is 2.3 out of 5."></div>

     );
}
 
export default RatingProduct;