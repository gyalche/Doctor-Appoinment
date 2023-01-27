import express from 'express';
import {
  applyDoctor,
  applyDoctorController,
  bookAppoinment,
  deleteAllNotifications,
  getAllDoc,
  getUserData,
  login,
  register,
} from '../controllers/userController.js';
import { userAuthentication } from '../middleware/authMiddleware.js';
const router = express.Router();

//routes for login;
router.post('/login', login);

//routers for register;
router.post('/register', register);

//auth
router.get('/getUserData', userAuthentication, getUserData);

// apply doctor
router.post('/applydoctor', userAuthentication, applyDoctor);

//notification post;
router.post('/get-all-notification', userAuthentication, applyDoctorController);

router.post(
  '/delete-all-notification',
  userAuthentication,
  deleteAllNotifications
);
//getAllDoc
router.get('/getAllDoctor', userAuthentication, getAllDoc);

//book appoinment;
router.post('/book-appoinment', userAuthentication, bookAppoinment);

export default router;
