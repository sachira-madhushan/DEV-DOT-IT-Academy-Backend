import connectDB from "../config/database.js";

const db=connectDB();

export const addCourse=(req,res)=>{
    const {c_title,c_description,c_price,c_instructor,c_banner,c_intro} =req.body;

    const saveQuery="insert into courses(c_title,c_description,c_price,c_instructor,c_banner,c_intro) values(?)";

    const values=[
        c_title,
        c_description,
        c_price,
        c_instructor,
        c_banner,
        c_intro
    ];

    db.query(saveQuery,[values],(err,data)=>{
        if(!err){
            res.status(201).json({
                message:"Course created"
            })
        }else{
            res.status(500).json({
                message:"Internal server error"
            })
        }
    })
}
export const addChapter=(req,res)=>{
    const {c_id,chap_title,chap_description,chap_video} =req.body;
    const values=[
        c_id,chap_title,chap_description,chap_video
    ];

    const existQuery="select * from courses where c_id=?";
    
    db.query(existQuery,[c_id],(err,data)=>{
        if(data.length===0){
            res.status(404).json({
                message:"Course not found"
            })
        }else{
            const saveQuery="insert into course_chapters(c_id,chap_title,chap_description,chap_video) values(?)";
            
            db.query(saveQuery,[values],(err,data)=>{
                if(!err){
                    res.status(201).json({
                        message:"New chaper added"
                    })
                }else{
                    res.status(500).json({
                        message:"Internal server error",
                    })
                }
            })
        }
    })
    
    

    
    
}

export const deleteCourse=(req,res)=>{
    const courseID=req.params['id'];
    const existQuery="select * from courses where c_id=?";
    db.query(existQuery,[courseID],(err,data)=>{
        if(data.length===0){
            res.status(404).json({
                message:"Course not found"
            });
        }else{
            const deleteQuery="delete from courses where c_id=?";
            db.query(deleteQuery,[courseID],(err,data)=>{
                if(err){
                    res.status(500).json({
                        message:"Internal server error"
                    })
                }else{
                    res.status(201).json({
                        message:"Course deleted"
                    })
                }
            })            
        
        }
    })
}

export const updateCourse=(req,res)=>{

}

export const listAllCourses=(req,res)=>{
    const listQuery="select * from courses";

    db.query(listQuery,[],(err,data)=>{
        res.status(200).json({
            course:data
        })
    })
}

export const viewCourse=(req,res)=>{
    const courseID=req.params['id'];

    const existQuery="SELECT * FROM courses WHERE c_id = ?;";

    db.query(existQuery,[courseID],(err,data)=>{

        if(data.length===0){
            res.status(404).json({
                message:"Course not found"
            })
        }else{
            const chaptersQuery="SELECT * FROM course_chapters WHERE c_id = ?;";
            db.query(chaptersQuery,[courseID],(err,chap)=>{
                res.status(200).json({
                    course:data,
                    chapters:chap
                })
            })
            
        }
    })
}

export const asignUser=(req,res)=>{

}

export const dischargeUser=(req,res)=>{
    
}
export const listUserCourses=(req,res)=>{

}