import express from 'express';
import {registerUser,loginUser,getUser,listUsers,getUserByID,deleteUser} from '../controllers/userController.js';
import { authenticateUser } from '../middlewares/authentication.js';
const router =express.Router();

router.post("/login",loginUser);
router.post("/register",registerUser);
router.get("/",authenticateUser,getUser);
router.get("/all",listUsers);
router.get("/:id",getUserByID);
router.delete("/:id",deleteUser);

export default router;