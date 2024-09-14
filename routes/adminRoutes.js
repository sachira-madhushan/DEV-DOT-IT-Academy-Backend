import express from 'express';
import {registerAdmin,loginAdmin,getAdmin} from '../controllers/adminController.js';
import { authenticateUser } from '../middlewares/authentication.js';

const router =express.Router();

router.post("/login",loginAdmin);
router.post("/register",registerAdmin);


router.get("/",authenticateUser,getAdmin);


export default router;