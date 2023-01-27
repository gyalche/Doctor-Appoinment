import express from 'express';
import { userAuthentication } from '../middleware/authMiddleware';
import { getAllDoctors, getAllUsers } from '../controllers/adminController';

const router = express.Router();

//GET METHOD;
router.get('/getAllUsers', userAuthentication, getAllUsers);
router.get('/getAllDoctors', userAuthentication, getAllDoctors);

export default router;
