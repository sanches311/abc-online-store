import React, { useState } from 'react';
import classes from './UserLoginForm.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  delCurrentUser,
  setCurrentUser,
  toggleUserLoginForm,
  toggleUserSignInForm,
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
  const [auth, setAuth] = useState<boolean>(false);

  const active = useAppSelector((state) => state.user.loginForm);

  const dispatch = useAppDispatch();
  const [loginUser, isLoading, error, isError] = useUserLoginMutation();
  const closeUserLoginForm = () => {
    dispatch(toggleUserLoginForm(false));
    setAuth(false);
    setUsername('');
    setPassword('');
  };
  const showUserSignInForm = () => {
    closeUserLoginForm();
    dispatch(toggleUserSignInForm(true));
  };
  const authUser: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<IParams>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const username = form.elements.username.value;
    const password = form.elements.password.value;
    loginUser({ username, password })
      .unwrap()
      .then((token) => {
        dispatch(delCurrentUser());
        dispatch(setCurrentUser({ username }));
        closeUserLoginForm();
        console.log(parseJwt(token.token));
      })
      .catch((err) => {
        setAuth(true);
      });
  };

  return (
    <div
      className={
        active ? `${classes.overlay} ${classes.active}` : `${classes.overlay} ${classes.inactive} `
      }
      onClick={closeUserLoginForm}
    >
      <div className={classes.content} onClick={(e) => e.stopPropagation()}>
        <h2>Log in</h2>
        {auth ? (
          <div className={classes.message}>
            <div className={classes.error}>{error}</div>
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
            onChange={(e) => {
              setUsername(e.currentTarget.value);
              setAuth(false);
            }}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
              setAuth(false);
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
          <>{isLoading ? <div></div> : <div>Loading...</div>}</>
          <input type="submit" value="Log in" />
        </form>
      </div>
    </div>
  );
};

export default UserLoginForm;
