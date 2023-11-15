import React from 'react';
import classes from './UserAvatar.module.scss';
import { useAppSelector } from '../../../hooks/redux';
import UserCircleSvg from '../../../assets/icons/user-circle.svg';
import { useGetUserQuery } from '../../../store/userSlice';

const UserAvatar: React.FC = () => {
  const id = useAppSelector((state) => state.user.currentUser);
  const { data } = useGetUserQuery(id, { skip: id === null });
  return (
    <div className={classes.wrapper}>
      <UserCircleSvg className={classes.avatar_ico} />
      <span>{id === null ? 'Guest' : `${data?.username}`}</span>
    </div>
  );
};

export default UserAvatar;
