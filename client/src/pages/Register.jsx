import React from 'react';
import { Form, Input } from 'antd';
import '../styles/RegisterStyles.css';
import { Link, useNavigate } from 'react-router-dom';
const Register = () => {
  const onfinishHandler = (values) => {};
  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form">
          <h1 className="text-center">Register Form</h1>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <h6 className="m-2">
            <Link to="/login">Already user login here</Link>
          </h6>
          <button className="btn btn-primary">Register</button>
        </Form>
      </div>
    </>
  );
};

export default Register;
