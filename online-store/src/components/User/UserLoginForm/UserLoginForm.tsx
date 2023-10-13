import React from 'react';
import classes from './UserLoginForm.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { togleUserLoginForm } from '../../../store/userSlice';

const UserLoginForm: React.FC = () => {
  const active = useAppSelector((state) => state.user.loginForm);
  const dispatch = useAppDispatch();
  const closeUserLoginForm = () => {
    dispatch(togleUserLoginForm(false));
  };
  return (
    <div
      className={active ? `${classes.overlay} ${classes.active}` : classes.inactive}
      onClick={closeUserLoginForm}
    >
      <div className={classes.wrapper} onClick={(e) => e.stopPropagation()}>
        <span className={classes.x} onClick={closeUserLoginForm}></span>
        <form action="">
          <input type="text" placeholder="User name" />
          <input type="password" placeholder="Password" />
          <div className={classes.forgot}>
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <span>Forgot your password ?</span>
          </div>
          <button>Log in</button>
        </form>
      </div>
    </div>
  );
};

export default UserLoginForm;
