import User from '../models/user.js';
import CreateError from 'http-errors';

// @desc Register
// @route POST/auth/
// @access Public
export const register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    sendtokenResponse(user, 200, res);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) next(new CreateError(400, 'duplicate user'));
    next(new CreateError(404, error.message));
  }
};

// @desc Login
// @route POST/auth/
// @access Public
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new CreateError(404, 'Kindly provide all input fields'));
  }
  try {
    const logedInUser = await User.findOne({ email }).select('+password');

    if (!logedInUser) {
      return next(new CreateError(401, 'Enter valid credentials'));
    }

    const isMatch = await logedInUser.matchPassword(password);

    if (!isMatch) {
      return next(new CreateError(401, 'Enter valid credentials'));
    }

    sendtokenResponse(logedInUser, 200, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const sendtokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ success: true, token });
};
