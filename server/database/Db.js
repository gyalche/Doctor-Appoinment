import mongoose from 'mongoose';

export const mongoDb = () => {
  const conn = mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return conn;
};
