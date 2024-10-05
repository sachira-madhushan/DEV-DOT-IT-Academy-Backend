import express from 'express';
import {addCourse,asignUser,deleteCourse,checkEnrollment,updateChapter,dischargeUser,deleteEnrollment,listEnrollments,addChapter,listAllCourses,courseCount,listUserCourses,updateCourse,viewCourse} from '../controllers/courseController.js';
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
router.get("/count",courseCount);

router.get("/courses/:id",listUserCourses);

router.get("/enrollments",listEnrollments)
router.post("/check",checkEnrollment)
router.delete("/enrollments/:id",deleteEnrollment)

export default router;