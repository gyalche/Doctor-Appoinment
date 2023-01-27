import { Layout, Tabs, message } from 'antd';
import React from 'react';
import {} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import axios from '../axios';
import { Navigate } from 'react-router-dom';
const NotificationPage = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        '/user/get-all-notification',
        {
          userId: user._id,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      dispatch(hideLoading());

      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('something went wrong');
    }
  };

  const deleteMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        '/delete-all-notification',
        {
          userId: user._id,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error('something went wrong');
    }
  };
  return (
    <Layout>
      <h4 className="mt-2 text-center p-3">NotificationPage</h4>
      <Tabs>
        <Tabs.TabPane tab="unRead" key={0}>
          <div className="d-flex justify-content-end">
            <h4 className="p-2" onClick={handleMarkAllRead}>
              Mark All Read
            </h4>
          </div>
          {user?.notification.map((notificationMsg) => (
            <div
              className="card"
              onClick={() => {
                Navigate(notificationMsg.data.onClickPath);
              }}>
              <div className="card-text">{notificationMsg.message}</div>
            </div>
          ))}
        </Tabs.TabPane>

        <Tabs.TabPane tab="unRead" key={0}>
          <div className="d-flex justify-content-end">
            <h4 className="p-2" onClick={handleMarkAllRead}>
              Mark All Read
            </h4>
          </div>
          {user?.seennotification.map((notificationMsg) => (
            <div
              className="card"
              onClick={() => {
                Navigate(notificationMsg.data.onClickPath);
              }}>
              <div className="card-text">{notificationMsg.message}</div>
            </div>
          ))}
        </Tabs.TabPane>

        <Tabs.TabPane tab="Delete" key={1}>
          <div className="d-flex justify-content-end">
            <h4 className="p-2" onClick={deleteMarkAllRead}>
              Delete All Read
            </h4>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default NotificationPage;
