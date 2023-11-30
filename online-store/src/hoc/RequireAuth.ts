import React, { useEffect } from 'react';
import { useAppSelector } from '../hooks/redux';
import { useNavigate, useParams } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const RequireAth: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const id = useAppSelector((state) => state.user.currentUserId)?.toString();
  const { userId } = useParams();

  useEffect(() => {
    if (!userId || userId != id) return navigate('/');
  });

  if (userId === id) return children;
};

export default RequireAth;
