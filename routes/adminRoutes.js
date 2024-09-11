import express from 'express';
import {registerAdmin,loginAdmin,logoutAdmin,getAdmin} from '../controllers/adminController.js';

const router =express.Router();

router.post("/login",loginAdmin);
router.post("/register",registerAdmin);
router.post("/logout",logoutAdmin);
router.get("/",getAdmin);

export default router;