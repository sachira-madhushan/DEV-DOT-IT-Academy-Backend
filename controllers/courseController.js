import connectDB from "../config/database.js";

const db = connectDB();

export const addCourse = (req, res) => {
    const { c_title, c_description, c_price, c_instructor, c_banner, c_intro } = req.body;

    const saveQuery = "insert into courses(c_title,c_description,c_price,c_instructor,c_banner,c_intro) values(?)";

    const values = [
        c_title,
        c_description,
        c_price,
        c_instructor,
        c_banner,
        c_intro
    ];

    db.query(saveQuery, [values], (err, data) => {
        if (!err) {
            res.status(201).json({
                message: "Course created"
            })
        } else {
            res.status(500).json({
                message: "Internal server error"
            })
        }
    })
}
export const addChapter = (req, res) => {
    const { c_id, chap_title, chap_description, chap_video } = req.body;
    const values = [
        c_id, chap_title, chap_description, chap_video
    ];

    const existQuery = "select * from courses where c_id=?";

    db.query(existQuery, [c_id], (err, data) => {
        if (data.length === 0) {
            res.status(404).json({
                message: "Course not found"
            })
        } else {
            const saveQuery = "insert into course_chapters(c_id,chap_title,chap_description,chap_video) values(?)";

            db.query(saveQuery, [values], (err, data) => {
                if (!err) {
                    res.status(201).json({
                        message: "New chaper added"
                    })
                } else {
                    res.status(500).json({
                        message: "Internal server error",
                    })
                }
            })
        }
    })

}

export const deleteCourse = (req, res) => {
    const courseID = req.params['id'];
    const existQuery = "select * from courses where c_id=?";
    db.query(existQuery, [courseID], (err, data) => {
        if (data.length === 0) {
            res.status(404).json({
                message: "Course not found"
            });
        } else {
            const deleteQuery = "delete from courses where c_id=?";
            db.query(deleteQuery, [courseID], (err, data) => {
                if (err) {
                    res.status(500).json({
                        message: "Internal server error"
                    })
                } else {
                    res.status(201).json({
                        message: "Course deleted"
                    })
                }
            })

        }
    })
}

export const updateCourse = (req, res) => {
    const { c_id, c_title, c_description, c_price, c_instructor, c_banner, c_intro } = req.body;

    const existQuery = "SELECT * FROM courses WHERE c_id = ?";

    db.query(existQuery, [c_id], (err, data) => {
        if (err) {
            return res.status(500).json({
                message: "Internal server error",
                error: err
            });
        }

        if (data.length === 0) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        const updateQuery = `UPDATE courses 
                             SET c_title = ?, c_description = ?, c_price = ?, c_instructor = ?, c_banner = ?, c_intro = ? 
                             WHERE c_id = ?`;

        const values = [
            c_title,
            c_description,
            c_price,
            c_instructor,
            c_banner,
            c_intro,
            c_id
        ];

        db.query(updateQuery, values, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Internal server error",
                    //error: err
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Course not updated"
                });
            }

            res.status(200).json({
                message: "Course updated successfully"
            });
        });
    });
}

export const updateChapter = (req, res) => {
    const { chap_id, c_id, chap_title, chap_description, chap_video } = req.body;
    const existCourseQuery = "SELECT * FROM courses WHERE c_id = ?";

    db.query(existCourseQuery, [c_id], (err, courseData) => {
        if (courseData.length === 0) {
            res.status(404).json({
                message: "Course not found"
            });
        } else {
            const existChapterQuery = "SELECT * FROM course_chapters WHERE chap_id = ? AND c_id = ?";

            db.query(existChapterQuery, [chap_id, c_id], (err, chapterData) => {
                if (chapterData.length === 0) {
                    res.status(404).json({
                        message: "Chapter not found for the given course"
                    });
                } else {
                    const updateQuery = `UPDATE course_chapters 
                                         SET chap_title = ?, chap_description = ?, chap_video = ? 
                                         WHERE chap_id = ? AND c_id = ?`;

                    db.query(updateQuery, [chap_title, chap_description, chap_video, chap_id, c_id], (err, result) => {
                        if (!err) {
                            res.status(200).json({
                                message: "Chapter updated successfully"
                            });
                        } else {
                            res.status(500).json({
                                message: "Internal server error",
                                //error: err
                            });
                        }
                    });
                }
            });
        }
    });
}

export const listAllCourses = (req, res) => {
    const listQuery = "select * from courses";

    db.query(listQuery, [], (err, data) => {
        res.status(200).json({
            course: data
        })
    })
}

export const viewCourse = (req, res) => {
    const courseID = req.params['id'];

    const existQuery = "SELECT * FROM courses WHERE c_id = ?;";

    db.query(existQuery, [courseID], (err, data) => {

        if (data.length === 0) {
            res.status(404).json({
                message: "Course not found"
            })
        } else {
            const chaptersQuery = "SELECT * FROM course_chapters WHERE c_id = ?;";
            db.query(chaptersQuery, [courseID], (err, chap) => {
                res.status(200).json({
                    course: data,
                    chapters: chap
                })
            })

        }
    })
}

export const asignUser = (req, res) => {
    const { c_id, u_id } = req.body;
    const existQuery = "select * from enrollments where c_id=? and u_id=?";
    db.query(existQuery, [c_id, u_id], (err, enroll) => {
        if (enroll.length === 0) {
            const assignQuery = "Insert into enrollments(c_id,u_id) values(?,?)";

            db.query(assignQuery, [c_id, u_id], (err, data) => {
                if (!err) {
                    res.status(200).json({
                        message: "User assigned to course"
                    })
                } else {
                    res.status(500).json({
                        message: "Internal server error",
                        //err:err
                    })
                }
            })
        } else {
            res.status(500).json({
                message: "Already exist"
            })
        }
    })

}

export const dischargeUser = (req, res) => {
    const { c_id, u_id } = req.body;
    const existQuery = "select * from enrollments where c_id=? and u_id=?";
    db.query(existQuery, [c_id, u_id], (err, enroll) => {
        if (enroll.length === 0) {
            res.status(404).json({
                message: "Not found"
            })
        } else {

            const discharge = "delete from enrollments where c_id=? and u_id=?";

            db.query(discharge, [c_id, u_id], (err, data) => {
                if (!err) {
                    res.status(200).json({
                        message: "User discharged from course"
                    })
                } else {
                    res.status(500).json({
                        message: "Internal server error",
                        //err:err
                    })
                }
            })
        }
    })
}

export const listUserCourses = (req, res) => {
    const { id } = req.params;

    const listQuery = `
        SELECT c.* 
        FROM courses AS c 
        INNER JOIN enrollments AS e ON c.c_id = e.c_id 
        WHERE e.u_id = ?;
    `;

    db.query(listQuery, [id], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching user courses" });
        }

        return res.status(200).json({
            course: data
        });
    });
}

export const listEnrollments = (req, res) => {

    const listQuery = "select * from enrollments"

    db.query(listQuery, [], (err, data) => {
        res.status(200).json({
            enrollments: data
        })
    })
}
export const deleteEnrollment = (req, res) => {
    const { id } = req.params;
    const deleteQuery = "delete from enrollments where e_id=?"

    db.query(deleteQuery, [id], (err, data) => {
        res.status(200).json({
            message: "Enrollment Deleted!"
        })
    })
}
export const courseCount = async (req, res) => {
    const countCourses = "select count(c_id) as numberOfCourses from courses";

    db.query(countCourses, [], async (err, data) => {
        res.json(
            {
                count: data
            }
        ).status(200);

    })
}