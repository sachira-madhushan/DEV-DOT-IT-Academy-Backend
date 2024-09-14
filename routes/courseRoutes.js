import express from 'express';
import {addCourse,asignUser,deleteCourse,updateChapter,dischargeUser,addChapter,listAllCourses,listUserCourses,updateCourse,viewCourse} from '../controllers/courseController.js';
import { authenticateUser } from '../middlewares/authentication.js';

const router =express.Router();

router.post("/add",addCourse);
router.post("/addchapter",addChapter);
router.delete("/delete/:id",deleteCourse);

router.put("/update",updateCourse);
router.put("/updatechapter",updateChapter);

router.post("/asign",asignUser);
router.post("/discharge",dischargeUser);
router.get("/all",listAllCourses);
router.get("/course/:id",viewCourse);

router.get("/courses",authenticateUser,listUserCourses);

export default router;