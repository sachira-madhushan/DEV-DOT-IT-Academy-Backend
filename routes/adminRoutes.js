import express from 'express';
import {registerAdmin,loginAdmin,getAdmin,deleteAdmins,editAdmin,getAdminByID,listAdmins} from '../controllers/adminController.js';
import { authenticateUser } from '../middlewares/authentication.js';

const router =express.Router();

router.post("/login",loginAdmin);
router.post("/register",registerAdmin);


router.get("/all",listAdmins);
router.get("/:id",getAdminByID);
router.delete("/:id",deleteAdmins);
router.put("/:id",editAdmin);

router.get("/",authenticateUser,getAdmin);



export default router;