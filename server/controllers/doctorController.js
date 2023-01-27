import doctorModel from '../models/doctorModel.js';
export const getDoctorInfo = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: 'data fetch successfully',
      data: doctor,
    });
  } catch (error) {
    res.status(404).send({ success: false, message: 'something went wrong' });
  }
};
//update;
export const updateProfile = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      {
        userId: req.body.userId,
      },
      req.body
    );
    res
      .status(201)
      .send({ success: true, message: 'Doctor Profile Updated', data: doctor });
  } catch (error) {
    res.status(404).send({ success: false, message: 'something went wrong' });
  }
};

//get single doctor
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: 'Single doc Info Fetched',
      data: doctor,
    });
  } catch (error) {
    res.status(404).send({ success: false, message: 'something went wrong' });
  }
};
