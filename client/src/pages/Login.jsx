import React from 'react';
import { Form, Input, message } from 'antd';
import '../styles/RegisterStyles.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axios';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/user/login', values);
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        message.success('sucessfully logged in');
        navigate('/');
      }
    } catch (error) {
      message.error('Somethind went wrong');
      dispatch(hideLoading());
    }
  };

  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form">
          <h1 className="text-center">Login</h1>

          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <h6 className="m-2">
            <Link to="/register">Dont have an account?</Link>
          </h6>
          <button className="btn btn-primary">Login</button>
        </Form>
      </div>
    </>
  );
};

export default Login;
