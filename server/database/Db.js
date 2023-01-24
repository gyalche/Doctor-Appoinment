import mongoose from 'mongoose';
import colors from 'colors';
export const mongoDb = async () => {
  await mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`monodb is connect to ${data.connection.host}`.bgGreen.white);
    })
    .catch((err) => {
      console.log(err.bgRed.white);
    });
};
