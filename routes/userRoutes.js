import express from 'express';
import {registerUser,loginUser,getUser} from '../controllers/userController.js';
import { authenticateUser } from '../middlewares/authentication.js';
const router =express.Router();

router.post("/login",loginUser);
router.post("/register",registerUser);
router.get("/",authenticateUser,getUser);

export default router;