import jwt from 'jsonwebtoken';
import { Auth } from '../model/auth.model.js';

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'Login required' });
    }
    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    req.user = await Auth.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};
