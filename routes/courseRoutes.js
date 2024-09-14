import express from 'express';
import {addCourse,asignUser,deleteCourse,dischargeUser,listAllCourses,listUserCourses,updateCourse,viewCourse} from '../controllers/courseController.js';

const router =express.Router();

router.post("/add",addCourse);
router.delete("/delete/:id",deleteCourse);
router.put("/update",updateCourse);
router.post("/asign",asignUser);
router.post("/discharge",dischargeUser);
router.get("/all",listAllCourses);
router.get("/courses",listUserCourses);
router.get("/course",viewCourse);

export default router;