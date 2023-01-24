import express from 'express';
import { login, register } from '../controllers/userController.js';
const router = express.Router();

//routes for login;
router.post('/login', login);

//routers for register;
router.post('/register', register);

export default router;
