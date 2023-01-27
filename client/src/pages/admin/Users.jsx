import { Layout, Table } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from '../../axios';

const Doctors = () => {
  const [users, setUsers] = useState([]);
  //get users;
  const getUsers = async () => {
    try {
      const res = await axios.get('/admin/getAllUsers', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  //antD table Col
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Doctor',
      dataIndex: 'doctor',
      render: (text, record) => {
        <span>{record.isDoctor ? 'Yes' : 'No'}</span>;
      },
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger">Block</button>
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1 className="text-center m-2">Users</h1>
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
};

export default Doctors;
