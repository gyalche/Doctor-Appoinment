import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      required: true,
    },
    feesPerConsultation: {
      type: Number,
      required: true,
    },
    timings: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

const doctorModel = mongoose.model('users', doctorSchema);
export default doctorModel;
