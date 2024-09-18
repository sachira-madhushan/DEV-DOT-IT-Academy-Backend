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
                        a_id:data[0].a_id,
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

//@des Get Authenticated admin details
//@route POST /api/admin/
//@access private
export const getAdmin=(req,res)=>{
    const admin=req.user;

    const getAdminQuery="select * from admins where a_id=?";

    db.query(getAdminQuery,[admin.id],async (err,data)=>{
        res.json(
            {
                a_id:data[0].a_id,
                a_username:data[0].a_username,
                a_email:data[0].a_email,
            }
        ).status(200);

    })
}



//@des Get Admin By ID
//@route POST /api/admin/:id
//@access public
export const getAdminByID = async (req, res) => {
    const userID = req.params['id'];

    const getUserQuery = "select * from admins where a_id=?";

    db.query(getUserQuery, [userID], async (err, data) => {
        res.json(
            {
                user: {
                    a_username: data[0].a_username,
                    a_email: data[0].a_email,
                }
            }
        ).status(200);

    })
}

//@des Delete Admin
//@route POST /api/admin/:id
//@access public
export const deleteAdmins = async (req, res) => {
    const userID = req.params['id'];

    const getUserQuery = "DELETE from admins where a_id=?";

    db.query(getUserQuery, [userID], async (err, data) => {
        res.json(
            {
                message: "Admin Deleted!"
            }
        ).status(200);

    })
}

//@des List Admins
//@route POST /api/admin/all
//@access public
export const listAdmins = (req, res) => {
    const getUsersQuery = "select a_id,a_username,a_email from admins";

    db.query(getUsersQuery, [], async (err, data) => {
        res.json(
            {
                admins: data
            }
        ).status(200);

    })
}

//@desc Edit Admin details
//@route PUT api/admin/:id
//@access Public
export const editAdmin = async (req, res) => {
    const { id } = req.params;
    const { a_username, a_email } = req.body;

    try {
        const checkUserQuery = "SELECT * FROM admins WHERE a_id = ?";
        db.query(checkUserQuery, [id], async (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Internal server error" });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: "User not found" });
            }


            const updateQuery = `
                UPDATE admins 
                SET a_username = ?,a_email = ?
                WHERE a_id = ?
            `;
            const values = [
                a_username || results[0].a_username,
                a_email || results[0].a_email,
                id
            ];

            db.query(updateQuery, values, (err, data) => {
                if (err) {
                    return res.status(500).json({ message: "Internal server error" });
                } else {
                    res.status(200).json({
                        message: "Admin updated successfully",
                    });
                }
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'});
}