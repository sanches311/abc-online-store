import React from 'react';
import SideBar from '../SideBarRight/SideBar';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { toggleVisibleBurgerMenu } from '../../../store/userSlice';
import NavCategories from '../../NavCategories/NavCategories';

const BurgerMenuSideBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const visible = useAppSelector((state) => state.user.burgerMenu);
  const hideSideBar = () => {
    dispatch(toggleVisibleBurgerMenu(false));
  };
  return (
    <SideBar visible={visible} handleOnClick={hideSideBar}>
      <div>fdgdfgdfgdfgdfgdf
        <button></button>
      </div>
    </SideBar>
  );
};

export default BurgerMenuSideBar;
