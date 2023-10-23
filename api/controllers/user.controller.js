import  bcryptjs from "bcrypt";
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const test = (req, res) => {
  res.json({
    message: 'Api route is working!',
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only update your own account!'));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    if (!req.body.username) {
      const existingUser = await User.findById(req.params.id);
      req.body.username = existingUser.username;
    }
    if (!req.body.email) {
      // Assuming you have an existingUser object to get the email
      const existingUser = await User.findById(req.params.id);
      if (existingUser) {
        req.body.email = existingUser.email;
      } 
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};