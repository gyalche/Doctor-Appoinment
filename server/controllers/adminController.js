import doctorModel from '../models/doctorModel.js';
import User from '../models/User.js';
export const getAllUsers = async (req, res) => {
  try {
    const res = await User.find();
    res.status(201).send({ success: true, message: 'user data', data: res });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: 'error while fetching users' });
  }
};
export const getAllDoctors = async (req, res) => {
  try {
    const res = await doctorModel.find();
    res
      .status(201)
      .send({ success: true, message: 'doctor data list', data: res });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: 'error while fetching doctors' });
  }
};
