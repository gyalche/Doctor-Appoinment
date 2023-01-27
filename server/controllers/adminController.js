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

export const changeAccountStatus = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    const user = await User.findOne({ _id: doctor.userId });
    const notification = user.notification;
    notification.push({
      type: 'doctor requrest  updated',
      message: `Your doctor account request had ${status}`,
      onClickPath: '/notification',
    });
    user.isDoctor = status === 'approved' ? true : false;
    await user.save();
    res.status(201).send({
      success: true,
      message: 'Account status Updated',
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: 'error while changing' });
  }
};
