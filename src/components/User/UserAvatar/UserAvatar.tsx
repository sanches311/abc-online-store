import React from 'react';
import classes from './UserAvatar.module.scss';
import { useAppSelector } from '../../../hooks/redux';
import { useGetUserQuery } from '../../../store/userSlice';
import Avatar from '@mui/material/Avatar';

const UserAvatar: React.FC = () => {
  const id = useAppSelector((state) => state.user.currentUserId);
  const { data: user } = useGetUserQuery(id, { skip: !id });
  const username = id ? `${user?.username}` : 'Guest';
  return (
    <div className={classes.wrapper}>
      <Avatar src="" alt={username} />
    </div>
  );
};

export default UserAvatar;
