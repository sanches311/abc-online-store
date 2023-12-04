import React, { useEffect } from 'react';
import classes from './SingleProductPage.module.scss';
import { setProductApp, useGetSingleProductQuery } from '../../store/apiSlice';
import { useNavigate, useParams } from 'react-router-dom';
import RatingProduct from '../../components/RatingProduct/RatingProduct';
import { useAppDispatch } from '../../hooks/redux';
import FormAddProduct from '../../components/FormAddProduct/FormAddProduct';

const SingleProductPage: React.FC = () => {
  const navigate = useNavigate();

  const { id } = useParams<string>();
  const { data: product, isLoading, isSuccess } = useGetSingleProductQuery(id!, { skip: !id });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess && !product) navigate('/');
    if (product) dispatch(setProductApp([product]));
  });

  return (
    <div className={classes.wrapper_page}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className={classes.Layout_2_column}>
          <div className={classes.wrapper_img}>
            <img src={product?.image} alt="image" />
          </div>
          <div className={classes.wrapper_desc}>
            <h1 className={classes.title}>{product?.title}</h1>
            <div className={classes.desc}>{product?.description}</div>
            <div className={classes.wrapper_rate}>
              {product ? <RatingProduct rate={product.rating.rate} /> : ''}
              <div className={classes.rate}>{product?.rating.rate}</div>
              <div className={classes.comments}>comments: {product?.rating.count}</div>
            </div>
            <FormAddProduct product={product!} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProductPage;
