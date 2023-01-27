import express from 'express';
import {
  applyDoctor,
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

export default router;
