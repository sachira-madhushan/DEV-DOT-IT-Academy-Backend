import express from 'express';
import {addCourse,asignUser,deleteCourse,dischargeUser,addChapter,listAllCourses,listUserCourses,updateCourse,viewCourse} from '../controllers/courseController.js';

const router =express.Router();

router.post("/add",addCourse);
router.post("/addchapter",addChapter);
router.delete("/delete/:id",deleteCourse);
router.put("/update",updateCourse);
router.post("/asign",asignUser);
router.post("/discharge",dischargeUser);
router.get("/all",listAllCourses);
router.get("/courses",listUserCourses);
router.get("/course/:id",viewCourse);

export default router;