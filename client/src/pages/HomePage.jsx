import { Row, message } from 'antd';
import axios from '../axios';
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import DoctorList from '../components/DoctorList';

const HomePage = () => {
  const [doctor, setDoctor] = useState([]);
  const getUserData = async () => {
    try {
      const res = await axios.get('/user/getAllDoctors', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      if (res.data.success) {
        setDoctor(res.data.data);
      }
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
        <h1 className="text-center">Homepage</h1>
        <Row>
          {doctor.map((doctor) => (
            <DoctorList doctor={doctor} />
          ))}
        </Row>
      </Layout>
    </div>
  );
};

export default HomePage;
