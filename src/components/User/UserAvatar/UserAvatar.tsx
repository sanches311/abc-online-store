import React from 'react';
import classes from './UserAvatar.module.scss';
import { useAppSelector } from '../../../hooks/redux';
import { useGetUserQuery } from '../../../store/userSlice';
import Avatar from '@mui/material/Avatar';

interface Props {
  onClick: () => void;
}
const UserAvatar: React.FC<Props> = ({ onClick }) => {
  const id = useAppSelector((state) => state.user.currentUserId);
  const { data: user } = useGetUserQuery(id, { skip: !id });
  const username = id ? `${user?.username}` : 'Guest';
  return (
    <div className={classes.wrapper} onClick={onClick}>
      <Avatar src="" alt={username} />
    </div>
  );
};

export default UserAvatar;
