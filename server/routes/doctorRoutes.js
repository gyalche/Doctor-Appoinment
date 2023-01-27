import express from 'express';
import { userAuthentication } from '../middleware/authMiddleware';
import { getDoctorInfo, updateProfile } from '../controllers/doctorController';

const router = express.Router();

//get single doctor
router.post('/getDoctorInfo', userAuthentication, getDoctorInfo);

//update;
router.post('/updateProfile', userAuthentication, updateProfile);

//get single doc info;
router.post('/getDoctorById', userAuthentication, getDoctorById);
export default router;
