import User from '../models/userModels.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import doctorModel from '../models/doctorModel.js';
import appoinmentModel from '../models/appoinmentModel.js';
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
      const token = jwt.sign({ id: user._id }, 'dawadon', {
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
    const user = await User.findById({ _id: req.body.userId });
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
//apply doctor
export const applyDoctor = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: 'pending' });
    await newDoctor.save();

    const adminUser = await User.findOne({ isAdmin: true });
    const notification = await adminUser.notification;
    notification.push({
      type: 'apply-doctor-request',
      message: `${newDoctor.firstName} ${newDoctor.lastName} has apply for a doctor account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + ' ' + newDoctor.lastName,
        onClickPath: '/admin/doctors',
      },
    });

    await User.findByIdAndUpdate(adminUser._id, { notification });
    res
      .status(201)
      .send({ success: true, message: 'Doctor account applied successfully' });
  } catch (error) {
    res.status(400).send({ msg: 'unable to apply', success: false });
  }
};

//get notification;
export const applyDoctorController = async (req, res) => {
  try {
    const user = await User.find({ _id: req.body.userId });
    const seennotification = user.seennotification;
    const notification = user.notification;
    seennotification.push(...notification);
    user.notification = [];
    user.seennotification = notification;
    const updateUser = await user.save();

    res.status(200).send({
      success: true,
      message: 'all notification read',
      data: updateUser,
    });
  } catch (error) {
    res.status(500).send({ msg: 'error in notification', success: false });
  }
};

//delte notification;
export const deleteAllNotifications = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seennotification = [];

    const updateUser = await user.save();
    updateUser.password = undefined;
    res
      .status(200)
      .send({ success: true, message: 'Notification delted successfully' });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, msg: 'Unable to delte all notifications' });
  }
};

export const getAllDoc = async (req, res) => {
  try {
    const doctor = await doctorModel.find({ status: 'approved' });
    res
      .status(200)
      .send({ success: true, message: 'Doct fetched', data: doctor });
  } catch (error) {
    console.log(error);
    res.status(404).send({ success: false, message: 'Something went wrong' });
  }
};

export const bookAppoinment = async (req, res) => {
  try {
    req.body.date = moment(req.body.date, 'DD-MM-YYYY').toISOString();
    req.body.time = moment(req.body.time, 'HH:mm').toISOString();
    req.body.status = 'pending';
    const newAppoinment = new appoinmentModel(req.body);
    await newAppoinment.save();
    const user = await User.findOne({ _id: req.body.doctorInfo.userId });
    user.notification.push({
      type: `new Appoinment requres ${req.body.userInfo.name}`,
      onClickPath: '/user/appoinments',
    });
    await user.save();
    res.status(200).send({ success: true, message: 'Booked successfylly' });
  } catch (error) {
    console.log(error);
    res.status(404).send({ success: false, message: 'Something went wrong' });
  }
};

//bookinga vailabeity cltr
export const bookingAvailablity = async (req, res) => {
  try {
    const data = moment(req.body.date, 'DD-MM-YYYY').toISOString();
    const fromTime = moment(req.body.time, 'HH:mm')
      .subtract(1, 'hours')
      .toISOString();
    const toTime = moment(req.body.time, 'HH:mm').add(1, 'hours').toISOString();

    const doctorId = req.body.doctorId;
    const appoinments = await appoinmentModel.find({
      doctorId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });

    if (appoinments.length > 0) {
      return res.status(200).send({
        message: 'Appoinments not Available at this time',
        success: true,
      });
    } else {
      return res
        .status(200)
        .send({ message: 'Appoinments available', success: true });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({ success: false, message: 'Something went wrong' });
  }
};
