import express from 'express';
import {registerUser,loginUser,getUser,listUsers,getUserByID,deleteUser,editUser,userCount} from '../controllers/userController.js';
import { authenticateUser } from '../middlewares/authentication.js';
const router =express.Router();

router.post("/login",loginUser);
router.post("/register",registerUser);
router.get("/count",userCount);
router.get("/",authenticateUser,getUser);
router.get("/all",listUsers);
router.get("/:id",getUserByID);
router.delete("/:id",deleteUser);
router.put("/:id",editUser);


export default router;