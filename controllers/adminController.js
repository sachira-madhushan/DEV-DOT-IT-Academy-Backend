import connectDB from "../config/database.js";
import bcrypt from 'bcryptjs'

const db=connectDB();

//@des register new admin
//@route api/admin/register
//@access public
export const registerAdmin=async(req,res)=>{
    const {a_username,a_email,a_password}=req.body;
    
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(a_password,salt);
    
    const saveQuery="insert into admins(a_username,a_email,a_password) values(?)";
    
    const values=[
        a_username,
        a_email,
        hashedPassword
    ];

    db.query(saveQuery,[values],(err,data)=>{
        if(err){
            res.status(500).json({
                message:"Internal server error",
                error:err
            })
        }else{
            res.status(201).json({
                message:"Admin created",
            })
        }
    })
}

export const loginAdmin=(req,res)=>{

}

export const getAdmin=(req,res)=>{

}

export const logoutAdmin=(req,res)=>{
    
}