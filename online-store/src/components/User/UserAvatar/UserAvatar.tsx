import React from 'react';
import classes from './UserAvatar.module.scss';
import { useAppSelector } from '../../../hooks/redux';
import UserCircleSvg from '../../../assets/icons/user-circle.svg';

const UserAvatar: React.FC = () => {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  return (
    <div className={classes.wrapper}>
      <UserCircleSvg className={classes.avatar_ico} />
      <span>{currentUser ?? 'Guest'}</span>
    </div>
  );
};

export default UserAvatar;
