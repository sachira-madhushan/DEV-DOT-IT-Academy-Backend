import connectDB from "../config/database.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

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
                //error:err
            })
        }else{
            res.status(201).json({
                message:"Admin created",
            })
        }
    })
}

//@des Authenticate a admin
//@route POST /api/admin/login
//@access public
export const loginAdmin=async(req,res)=>{
    const {a_email,a_password}=req.body;
    const existQuery="select * from admins where a_email=?";

    db.query(existQuery,[a_email],async (err,data)=>{
        if(data.length===0){
            res.status(401).json({
                message:"Incorrect email or password",
            })
        }else{
            if(await bcrypt.compare(a_password,data[0].a_password)){
                res.json(
                    {
                        a_username:data[0].a_username,
                        a_email:data[0].a_email,
                        token:generateToken(data[0].a_id)
                    }
                ).status(200);
            }else{
                res.json("Internal server error").status(500);
            }
        }
    })
 
}

export const getAdmin=(req,res)=>{
    
}

export const logoutAdmin=(req,res)=>{
    
}

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'});
}