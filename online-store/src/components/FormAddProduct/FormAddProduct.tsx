import React, { useEffect, useRef, useState } from 'react';
import classes from './FormAddProduct.module.scss';
import EditCount from '../EditCount/EditCount';
import ToBagBtn from '../buttons/ToBagBtn';
import { IProduct } from '../../interfaces/products';
import { useSnackbar } from 'notistack';
import { useDebounce } from '../../hooks/debounce';
import { useAppDispatch } from '../../hooks/redux';
import { addProductToCart } from '../../store/userSlice';

type Props = {
  product: IProduct;
};

const FormAddProduct: React.FC<Props> = ({ product }) => {
  const sizes = ['2XS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
  const colors = ['#F08080', '#FFA07A', '#8B0000', '#FF69B4', '#FF6347', '#FFA500', '#EE82EE'];
  const [currentSize, setCurrentSize] = useState<string | null>(null);
  const [currentColor, setCurrentColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const [visibleTipColor, seVisibleTipColor] = useState<boolean>(false);
  const [visibleTipSize, seVisibleTipSize] = useState<boolean>(false);

  const form = useRef(null);

  const debouncedValue = useDebounce(quantity, 500);
  const { enqueueSnackbar } = useSnackbar();

  const incQuantity = () => {
    if (quantity < 99) setQuantity(quantity + 1);
  };
  const descQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const handleOnChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(+e.target.value);
    if (+e.target.value > 99) setQuantity(99);
  };
  useEffect(() => {
    setQuantity(quantity);
  }, [debouncedValue]);

  const dispatch = useAppDispatch();

  const addProduct = () => {
    const { id, image, title, price, description } = product!;
    dispatch(
      addProductToCart({
        id,
        image,
        title,
        size: currentSize,
        color: currentColor,
        quantity: quantity,
        price,
        description,
      })
    );
    enqueueSnackbar(`${title} Added To Bag`, {
      variant: 'success',
      autoHideDuration: 1500,
    });
  };

  const handleSubmit = () => {
    if (product) {
      if (product.category === "men's clothing" || product.category === "women's clothing") {
        if (currentColor && currentSize) {
          addProduct();
          setCurrentColor(null);
          setCurrentSize(null);
        } else {
          if (currentSize === null) seVisibleTipSize(true);
          if (currentColor === null) seVisibleTipColor(true);
        }
      } else {
        if (product) {
          addProduct();
        }
      }
    }
  };

  const handleOnChangeColor = () => {
    if (form.current) {
      setCurrentColor(form.current.color.value);
      seVisibleTipColor(false);
    }
  };
  const handleOnChangeSize = () => {
    if (form.current) {
      setCurrentSize(form.current.size.value);
      seVisibleTipSize(false);
    }
  };
  return (
    <form ref={form} className={classes.wrapper_form}>
      {product?.category === "women's clothing" || product?.category === "men's clothing" ? (
        <>
          <div>
            Size: {currentSize ?? ''}
            <span className={visibleTipSize ? `${classes.tip} ${classes.active}` : classes.tip}>
              Select a size before adding to bag.
            </span>
          </div>

          <div className={classes.wrapper_sizes}>
            {sizes.map((size) => (
              <label key={size}>
                <input
                  type="radio"
                  className={classes.input_radio_size}
                  value={size}
                  name={'size'}
                  onChange={handleOnChangeSize}
                  checked={currentSize === size ? true : false}
                />
                <span className={classes.radio_size_custom}>{size}</span>
              </label>
            ))}
          </div>
          <div>
            Color: {currentColor ?? ''}
            <span className={visibleTipColor ? `${classes.tip} ${classes.active}` : classes.tip}>
              Select a color before adding to bag.
            </span>
          </div>
          <div className={classes.wrapper_colors}>
            {colors.map((color) => (
              <label key={color}>
                <input
                  type="radio"
                  className={classes.input_radio_color}
                  value={color}
                  name={'color'}
                  onChange={handleOnChangeColor}
                  checked={currentColor === color ? true : false}
                />
                <span
                  className={classes.radio_color_custom}
                  style={{ backgroundColor: color }}
                ></span>
              </label>
            ))}
          </div>
        </>
      ) : (
        ''
      )}
      <div className={classes.wrapper_quantity}>
        <EditCount
          incQuantity={incQuantity}
          descQuantity={descQuantity}
          handleOnChangeQuantity={handleOnChangeQuantity}
          quantity={quantity}
        ></EditCount>
      </div>
      <div className={classes.price}>{product?.price}$</div>
      <div className={classes.wrapper_submit}>
        <ToBagBtn addProduct={handleSubmit} />
      </div>
    </form>
  );
};

export default FormAddProduct;
