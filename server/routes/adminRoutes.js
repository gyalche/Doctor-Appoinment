import express from 'express';
import { userAuthentication } from '../middleware/authMiddleware.js';
import {
  changeAccountStatus,
  getAllDoctors,
  getAllUsers,
} from '../controllers/adminController.js';

const router = express.Router();

//GET METHOD;
router.get('/getAllUsers', userAuthentication, getAllUsers);
router.get('/getAllDoctors', userAuthentication, getAllDoctors);

//POST METHOD;
router.post('/changeAccountStatus', userAuthentication, changeAccountStatus);
export default router;
