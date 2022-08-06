import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import User from '../models/user.js';

export const protect = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      console.log('No token present!!!');
      return next(new createError(401, 'Unauthorized Request'));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    console.log(error);
    return next(new createError(401, 'Unauthorized Request'));
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new createError(401, `${req.user.role} is not authorized`));
    }
    next();
  };
};
