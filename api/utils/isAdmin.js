import User from "../models/user.model.js";
import {errorHandler} from "./error.js"

export const isAdmin = async (req, res, next) => {
    try {
      
      const user = await User.findById(req.user.id);
    
      if (user.role !== 1) {
        return  next(errorHandler(401, 'Unauthorized access'));
        
      } else {
        next();
      }
    } catch (error) {
      next(error);
    }
  };