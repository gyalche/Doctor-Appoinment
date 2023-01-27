import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import colors from 'colors';
import { mongoDb } from './database/Db.js';
import userRoute from './routes/userRoutes.js';
import adminRoute from './routes/adminRoutes.js';
const app = express();
dotenv.config();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());

//Databse connection;
mongoDb();

app.use('/api/v1/user', userRoute);
app.use('/api/v1/admin', adminRoute);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on localhost://${PORT}`.bgCyan.white);
});
