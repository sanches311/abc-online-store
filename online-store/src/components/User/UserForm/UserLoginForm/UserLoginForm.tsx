import React, { useState } from 'react';
import classes from './UserLogInForm.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import {
  delCurrentUser,
  setCurrentUser,
  toggleVisibleUserLoginForm,
  toggleVisibleUserSignInForm,
  useUserLoginMutation,
} from '../../../../store/userSlice';
import { parseJwt } from '../../../../utils/utils';
import { isErrorWithMessage, isFetchBaseQueryError } from '../../../../utils/helpers';
import LogInSignInBtn from '../../../buttons/LogInSigInBtn';
import SideBar from '../../../popUp/SideBarRight/SideBar';

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
  const [errMsg, setErrMsg] = useState<string>('');

  const visible = useAppSelector((state) => state.user.loginForm);
  const dispatch = useAppDispatch();

  const [loginUser, { isError, isUninitialized, isSuccess, reset }] = useUserLoginMutation();

  const closeUserLoginForm = () => {
    dispatch(toggleVisibleUserLoginForm(false));
    setUsername('');
    setPassword('');
    reset();
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
        const { sub } = parseJwt(token.token);
        dispatch(delCurrentUser());
        dispatch(setCurrentUser(sub));
        closeUserLoginForm();
      })
      .catch((err) => {
        if (isFetchBaseQueryError(err)) {
          setErrMsg('error' in err ? err.error : JSON.stringify(err.data));
        } else if (isErrorWithMessage(err)) {
          setErrMsg(err.message);
        }
      });
  };

  return (
    <SideBar visible={visible} handleOnClick={closeUserLoginForm}>
      <h2>Log in</h2>
      {isError ? <div className={classes.error}>{errMsg}</div> : ''}
      <form className={classes.userLoginForm} onSubmit={(e) => authUser(e)}>
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
          <span>Are you not registered?</span>
          <span className={classes.sign_in} onClick={showUserSignInForm}>
            Sign in
          </span>
        </div>
        <LogInSignInBtn
          isError={isError}
          isSuccess={isSuccess}
          isUninitialized={isUninitialized}
          name={'Log in'}
        />
      </form>
    </SideBar>
  );
};

export default UserLoginForm;
