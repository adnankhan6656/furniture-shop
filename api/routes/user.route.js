import express from 'express';
import { test, updateUser,deleteUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import {isAdmin} from "../utils/isAdmin.js"


const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get("/admin-auth/:id", verifyToken, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
   
  });

export default router;