import React, { useEffect, useRef, useState } from 'react';
import classes from './FormAddProduct.module.scss';
import EditCount from '../EditCount/EditCount';
import { IProduct } from '../../interfaces/products';
import { useDebounce } from '../../hooks/debounce';
import { useAppDispatch } from '../../hooks/redux';
import {
  addProductToCart,
  toggleVisibleModalWindowEditColorSize,
  toggleVisibleModalWindowShoppingBag,
} from '../../store/userSlice';
import Button from '../buttons/Button';
import ShoppingBagSvg from '../../assets/icons/shopping-bag.svg';

type Props = {
  product: IProduct | null;
};

interface IForm extends HTMLFormControlsCollection {
  size: HTMLInputElement;
  color: HTMLInputElement;
}
interface IParams extends HTMLFormElement {
  readonly elements: IForm;
}

const FormAddProduct: React.FC<Props> = ({ product }) => {
  const sizes = ['2XS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
  const colors = [
    { name: 'HotPink', value: '#FF69B4' },
    { name: 'DarkOrange', value: '#FF8C00' },
    { name: 'Khaki', value: '#F0E68C' },
    { name: 'Orchid', value: '#DA70D6' },
    { name: 'BurlyWood', value: '#DEB887' },
    { name: 'RoyalBlue', value: '#4169E1' },
  ];
  const [currentSize, setCurrentSize] = useState<string | null>(null);
  const [currentColor, setCurrentColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const [visibleTipColor, seVisibleTipColor] = useState<boolean>(false);
  const [visibleTipSize, seVisibleTipSize] = useState<boolean>(false);

  const form = useRef<IParams | null>(null);

  const showModalShoppingBag = () => {
    dispatch(toggleVisibleModalWindowShoppingBag(true));
  };
  const debouncedValue = useDebounce(quantity, 500);

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

  const hideModalWindowEditColorSize = () => {
    dispatch(toggleVisibleModalWindowEditColorSize(false));
  };

  const addProduct = () => {
    const { id, image, title, price, description, category } = product!;
    dispatch(
      addProductToCart({
        id,
        image,
        title,
        category,
        size: currentSize,
        color: currentColor,
        quantity: quantity,
        price,
        description,
      })
    );
    showModalShoppingBag();
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (product) {
      if (product.category === "men's clothing" || product.category === "women's clothing") {
        if (currentColor && currentSize) {
          addProduct();
          setCurrentColor(null);
          setCurrentSize(null);
          setQuantity(1);
          hideModalWindowEditColorSize();
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
              <label key={color.value}>
                <input
                  type="radio"
                  className={classes.input_radio_color}
                  value={color.name}
                  name={'color'}
                  onChange={handleOnChangeColor}
                  checked={currentColor === color.name ? true : false}
                />
                <span
                  className={classes.radio_color_custom}
                  style={{ backgroundColor: color.value }}
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
      <div className={classes.price}>${product?.price}</div>
      <div className={classes.wrapper_submit}>
        <Button handleOnClick={(e) => handleSubmit(e)}>
          <span>
            <ShoppingBagSvg className={classes.shopping_bag_img_btn} />
          </span>
          <div className={classes.wrapper_text_into_btn}>
            <span>Add To Bag</span>
          </div>
        </Button>
      </div>
    </form>
  );
};

export default FormAddProduct;
