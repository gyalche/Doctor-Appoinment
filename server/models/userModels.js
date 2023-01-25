import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name is requried'],
    },
    email: {
      type: String,
      required: [true, 'email is required'],
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isDoctor: {
      type: Boolean,
      default: false,
    },
    notification: {
      type: Array,
      default: [],
    },
    seennotification: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     next();
//   }
//   //hash the password
//   const salt = genSalt(10);
//   const hashPassword = await bcrypt.hash(this.password, salt);
//   this.password = hashPassword;
//   next();
// });

const userModel = mongoose.model('users', userSchema);
export default userModel;
