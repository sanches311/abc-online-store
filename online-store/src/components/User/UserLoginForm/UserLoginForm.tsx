import React, { useState } from 'react';
import classes from './UserLoginForm.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  delCurrentUser,
  setCurrentUser,
  toggleVisibleUserLoginForm,
  toggleVisibleUserSignInForm,
  useUserLoginMutation,
} from '../../../store/userSlice';
import { parseJwt } from '../../../utils/utils';

interface ILoginForm extends HTMLFormControlsCollection {
  password: HTMLInputElement;
  username: HTMLInputElement;
}
interface IParams extends HTMLFormElement {
  readonly elements: ILoginForm;
}

const UserLoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const active = useAppSelector((state) => state.user.loginForm);

  const dispatch = useAppDispatch();
  const [loginUser, { error, isError, isUninitialized, isSuccess, reset }] = useUserLoginMutation();
  console.log(isUninitialized);
  const closeUserLoginForm = () => {
    dispatch(toggleVisibleUserLoginForm(false));
    setUsername('');
    setPassword('');
  };
  const showUserSignInForm = () => {
    closeUserLoginForm();
    dispatch(toggleVisibleUserSignInForm(true));
  };
  const authUser: React.FormEventHandler<HTMLFormElement> = (event: React.FormEvent<IParams>) => {
    event.preventDefault();
    loginUser({ username, password })
      .unwrap()
      .then((token) => {
        const { id } = parseJwt(token.token);
        dispatch(delCurrentUser());
        dispatch(setCurrentUser(id));
        closeUserLoginForm();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className={
        active ? `${classes.overlay} ${classes.active}` : `${classes.overlay} ${classes.inactive} `
      }
      onClick={closeUserLoginForm}
    >
      <div className={classes.content} onClick={(event) => event.stopPropagation()}>
        <h2>Log in</h2>
        {isError ? (
          <div className={classes.message}>
            <div className={classes.error}>Error message</div>
          </div>
        ) : (
          ''
        )}
        <span className={classes.x} onClick={closeUserLoginForm}></span>
        <form onSubmit={(e) => authUser(e)}>
          <input
            name="username"
            type="text"
            placeholder="User name"
            value={username}
            autoComplete="off"
            onChange={(event) => {
              setUsername(event.currentTarget.value);
              reset();
            }}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.currentTarget.value);
              reset();
            }}
            required
          />
          <div className={classes.layout_2_column}>
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <span>Forgot your password ?</span>
          </div>
          <div className={classes.layout_2_column}>
            <span>Are you not registered?</span>{' '}
            <span className={classes.sign_in} onClick={showUserSignInForm}>
              Sign in
            </span>
          </div>
          <button type="submit">
            {isUninitialized || isError || isSuccess ? 'Log in' : 'Processing..'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserLoginForm;
