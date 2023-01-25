import { message } from 'antd';
import axios from '../axios';
import React, { useEffect } from 'react';
import Layout from '../components/Layout';

const HomePage = () => {
  const getUserData = async () => {
    try {
      await axios.get('/user/getUserData', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
    } catch (error) {
      message.error('unable to fetch data');
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div>
      <Layout>
        <h1>Homepage</h1>
      </Layout>
    </div>
  );
};

export default HomePage;
