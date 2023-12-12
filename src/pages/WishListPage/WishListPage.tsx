import React from 'react';
import classes from './WishList.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import TrashSVG from '../../assets/icons/trash.svg';
import { delProductWishlist } from '../../store/userSlice';

const WishListPage: React.FC = () => {
  const products = useAppSelector((state) => state.user.wishlist);
  const dispatch = useAppDispatch();

  const deleteProductWishlist = (id: number) => {
    dispatch(delProductWishlist(id));
  };
  return (
    <div className={classes.wrapper_page}>
      <h1>Wishlist</h1>

      {products.length ? (
        <>
          <h3>In wishlist {products.length} products</h3>
          <div className={classes.wrapper_products}>
            {products.map((product) => (
              <ul className={classes.wrapper_product} key={product.id}>
                <li className={classes.product_desc}>
                  <div className={classes.wrapper_product_img}>
                    <img src={product.image} />
                  </div>
                  <div className={classes.desc_wrapper_title}>
                    <div className={classes.product_title}>{product.title}</div>
                    <div className={classes.price_mobile_screen}>${product.price}</div>
                  </div>
                </li>
                <li className={classes.wrapper_trash}>
                  <TrashSVG
                    className={classes.trash}
                    onClick={() => deleteProductWishlist(product.id)}
                  />
                </li>
                <li className={`${classes.price_desktop_screen} ${classes.text_bold}`}>
                  ${product.price}
                </li>
              </ul>
            ))}
          </div>
        </>
      ) : (
        <h3>Wishlist empty</h3>
      )}
    </div>
  );
};

export default WishListPage;
