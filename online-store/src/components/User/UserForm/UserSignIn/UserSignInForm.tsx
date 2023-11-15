import React, { useState } from 'react';
import classes from './UserSignInForm.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import {
  setCurrentUser,
  toggleVisibleUserSignInForm,
  useUserSignInMutation,
} from '../../../../store/userSlice';
import LogInSignInBtn from '../../../buttons/LogInSigInBtn';
import SideBar from '../../../SideBarRight/SideBar';

interface IUserSignInForm extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  username: HTMLInputElement;
  password: HTMLInputElement;
  first_name: HTMLInputElement;
  last_name: HTMLInputElement;
  city: HTMLInputElement;
  street: HTMLInputElement;
  number: HTMLInputElement;
  zip_code: HTMLInputElement;
  phone: HTMLInputElement;
}

interface IParams extends HTMLFormElement {
  readonly elements: IUserSignInForm;
}

const UserSignInForm: React.FC = () => {
  const visible = useAppSelector((state) => state.user.SignInForm);

  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [zipcode, setZipcode] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const dispatch = useAppDispatch();
  const [createUser, { error, isError, isSuccess, isUninitialized }] = useUserSignInMutation();

  const handlerSubmit: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<IParams>
  ): void => {
    e.preventDefault();
    const long = 'long';
    const lat = 'lat';
    const newUser = {
      email,
      username,
      password,
      name: {
        firstname,
        lastname,
      },
      address: {
        city,
        street,
        number: Number(number),
        zipcode,
        geolocation: {
          lat,
          long,
        },
      },
      phone,
    };
    createUser(newUser)
      .unwrap()
      .then((res) => {
        const { id } = res;
        dispatch(setCurrentUser(id));
        closeUserSignInForm();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const closeUserSignInForm = () => {
    dispatch(toggleVisibleUserSignInForm(false));
    setEmail('');
    setUsername('');
    setPassword('');
    setFirstname('');
    setLastname('');
    setCity('');
    setStreet('');
    setNumber('');
    setZipcode('');
    setPhone('');
  };
  return (
    <SideBar visible={visible} handleOnClick={closeUserSignInForm}>
      <h2>Sign in</h2>
      {error ? (
        <div className={classes.message}>
          <div className={classes.error}></div>
        </div>
      ) : (
        ''
      )}
      <span className={classes.x} onClick={closeUserSignInForm}></span>
      <form className={classes.userSignInForm} onSubmit={(e) => handlerSubmit(e)}>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          name="username"
          placeholder="User name"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          name="first_name"
          placeholder="First name"
          autoComplete="off"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last name"
          autoComplete="off"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          autoComplete="off"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          name="street"
          placeholder="Street"
          autoComplete="off"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <input
          type="number"
          name="number"
          placeholder="Number"
          autoComplete="off"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <input
          type="number"
          name="zip_code"
          placeholder="Zip code"
          autoComplete="off"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          autoComplete="off"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <LogInSignInBtn
          isError={isError}
          isSuccess={isSuccess}
          isUninitialized={isUninitialized}
          name={'Sign in'}
        />
      </form>
    </SideBar>
  );
};

export default UserSignInForm;
