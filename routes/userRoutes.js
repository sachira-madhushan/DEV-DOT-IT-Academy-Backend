import express from 'express';
import {registerUser,loginUser,logoutUser,getUser} from '../controllers/userController.js';

const router =express.Router();

router.post("/login",loginUser);
router.post("/register",registerUser);
router.post("/logout",logoutUser);
router.get("/",getUser);

export default router;