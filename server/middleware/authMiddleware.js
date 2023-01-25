import jwt from 'jsonwebtoken';
import User from '../models/userModels.js';

export const userAuthentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization.splite(' ')[1];
    if (token) {
      const verifyToken = jwt.verify(token, 'dawadon');
      if (verifyToken) {
        // const user = await User.findById(verifyToken.id).select('-password');
        // if (!user) {
        //   res.status(403).send({ msg: 'You are not authencated' });
        // }
        req.body.userId = verifyToken.id;
        next();
      }
    }
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};
