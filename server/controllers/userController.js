import User from '../models/userModels.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //find user if exist;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(200)
        .send({ msg: 'User already exists', success: false });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = new User({
      name,
      email,
      password: hashPassword,
    });

    await user
      .save()
      .then((data) => {
        res
          .status(201)
          .send({ msg: 'Sucessfully registerd', success: true, data: data });
      })
      .catch((err) => {
        res.status(404).send({ msg: 'unable to register' });
      });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: `register controller ${error}` });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  //check if email exist or not;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).send({ msg: 'Unable to find user', success: false });
    }
    //if email  exist now compare the password
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      res.status(500).send({ msg: 'Password doesnt match', success: false });
    } else {
      const token = jwt.sign({ userId: user._id }, 'dawadon', {
        expiresIn: '1d',
      });
      res.status(201).send({ msg: 'Login Sucessfull', success: true, token });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

//getUserData
export const getUserData = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({ msg: 'User not Found', success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    res.status(500).send({ msg: 'unable to get user', success: false });
  }
};
