import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import axios from '../axios';
import { setUser } from '../redux/features/userSlice';
const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  //get user;
  //eslint-disable-next-line
  const getUser = async () => {
    try {
      dispatch(showLoading);
      const response = await axios.post(
        '/user/getUser',
        {
          token: localStorage.getItem('token'),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading);
      if (response.data.success) {
        dispatch(setUser({ payload: response.data.data }));
      } else {
        <Navigate to="/login" />;
        localStorage.clear('token');
      }
    } catch (error) {
      console.log(error);
      localStorage.clear('token');
    }
  };
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);
  if (localStorage.getItem('token')) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
