import { Layout, message } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from '../../axios';
const Doctors = () => {
  const [doctor, setDoctors] = useState([]);
  //get doctors;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getDoctors = async () => {
    try {
      const res = await axios.get('/admin/getAllDoctors', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDoctors();
  }, [getDoctors]);

  //handle account status
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        '/admin/changeAccountStatus',
        {
          doctorId: record._id,
          userId: record.userId,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      message.error('Something went wrong');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => (
        <div className="d-flex">
          {record.status === 'pending' ? (
            <button
              className="btn btn-success"
              onClick={() => {
                handleAccountStatus(record, 'approved');
              }}>
              Approve
            </button>
          ) : (
            <button className="btn btn-danger">Reject</button>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1>Doctor lists</h1>
    </Layout>
  );
};

export default Doctors;
