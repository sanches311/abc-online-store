import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useParams } from 'react-router-dom';
import { toggleVisibleUserLoginForm } from '../store/userSlice';

interface Props {
  children: React.ReactNode;
}

const RequireAth: React.FC<Props> = ({ children }) => {
  const id = useAppSelector((state) => state.user.currentUserId)?.toString();
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const showLogin = () => {
    dispatch(toggleVisibleUserLoginForm(true));
  };
  useEffect(() => {
    if (!userId || userId != id) return showLogin();
  });

  if (userId === id) return children;
};

export default RequireAth;
