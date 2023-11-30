import React from 'react';
import classes from './UserAvatar.module.scss';
import { useAppSelector } from '../../../hooks/redux';
import UserCircleSvg from '../../../assets/icons/user-circle.svg';
import { useGetUserQuery } from '../../../store/userSlice';

const UserAvatar: React.FC = () => {
  const id = useAppSelector((state) => state.user.currentUserId);
  console.log(id);
  const { data: user } = useGetUserQuery(id, { skip: !id });
  return (
    <div className={classes.wrapper}>
      <UserCircleSvg className={classes.avatar_ico} />
      <span>{!id ? 'Guest' : `${user?.username}`}</span>
    </div>
  );
};

export default UserAvatar;
