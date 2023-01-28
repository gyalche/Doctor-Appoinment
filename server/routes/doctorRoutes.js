import express from 'express';
import { userAuthentication } from '../middleware/authMiddleware.js';
import {
  getDoctorInfo,
  updateProfile,
} from '../controllers/doctorController.js';

const router = express.Router();

//get single doctor
router.post('/getDoctorInfo', userAuthentication, getDoctorInfo);

//update;
router.post('/updateProfile', userAuthentication, updateProfile);

//get single doc info;
router.post('/getDoctorById', userAuthentication, getDoctorById);
export default router;
