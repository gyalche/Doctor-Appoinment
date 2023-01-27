import React from 'react';
import Layout from '../components/Layout';
import { Col, Form, Input, Row, TimePicker, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import axios from '../axios';

const ApplyDoctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        '/user/applydoctor',
        { ...values, userId: user._id },
        {
          headers: {
            Authorzation: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate('/');
      } else {
        message.error(res.data.error);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
      message.error('something went wrong');
    }
  };
  return (
    <Layout>
      <h1 className="text-center">
        <Form layout="vertical" onFinish={handleFinish} className="m-3">
          <Row gutter={20}>
            <h4>Personal Details</h4>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="First name"
                name="firstName"
                required
                rules={[{ required: true }]}>
                <Input type="text" placeholder="your name" />
              </Form.Item>

              <Form.Item
                label="Last Name"
                name="lastName"
                required
                rules={[{ required: true }]}>
                <Input type="text" placeholder="your LastName" />
              </Form.Item>

              <Form.Item
                label="Phone No"
                name="phoneNumber"
                required
                rules={[{ required: true }]}>
                <Input type="text" placeholder="number" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                required
                rules={[{ required: true }]}>
                <Input type="email" placeholder="email" />
              </Form.Item>
              <Form.Item
                label="Website"
                name="website"
                required
                rules={[{ required: true }]}>
                <Input type="text" placeholder="Website" />
              </Form.Item>
              <Form.Item
                label="Address"
                name="address"
                required
                rules={[{ required: true }]}>
                <Input type="text" placeholder="your address" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <h4>Personal Details</h4>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Specilization"
                name="specilization"
                required
                rules={[{ required: true }]}>
                <Input type="text" placeholder="your specilization" />
              </Form.Item>

              <Form.Item
                label="Experience"
                name="experience"
                required
                rules={[{ required: true }]}>
                <Input type="text" placeholder="your experience" />
              </Form.Item>

              <Form.Item
                label="Fees Per Consultation"
                name="feesperconsultation"
                required
                rules={[{ required: true }]}>
                <Input type="text" placeholder="Your fees" />
              </Form.Item>

              <Form.Item
                label="Timings"
                name="timings"
                required
                rules={[{ required: true }]}>
                <TimePicker.RangePicker format="HH:mm" />{' '}
              </Form.Item>
            </Col>
          </Row>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary form-btn" type="submit">
              Submit
            </button>
          </div>
        </Form>
      </h1>
    </Layout>
  );
};

export default ApplyDoctor;
