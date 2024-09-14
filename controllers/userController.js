import connectDB from "../config/database.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const db=connectDB();

//@des register new user
//@route api/user/register
//@access public
export const registerUser = async (req, res) => {
    const { u_username, u_email, u_password, u_fullname, u_phone, u_birthday } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(u_password, salt);

    const saveQuery = "insert into users(u_username,u_fullname,u_birthday,u_phone,u_email,u_password) values(?)";

    const values = [
        u_username,
        u_fullname,
        u_birthday,
        u_phone,
        u_email,
        hashedPassword
    ];

    db.query(saveQuery, [values], (err, data) => {
        if (err) {
            res.status(500).json({
                message: "Internal server error",
                //error:err
            })
        } else {
            res.status(201).json({
                message: "User created",
            })
        }
    })
}

//@des Authenticate a user
//@route POST /api/user/login
//@access public
export const loginUser = async (req, res) => {
    const { u_email, u_password } = req.body;
    const existQuery = "select * from users where u_email=?";

    db.query(existQuery, [u_email], async (err, data) => {
        if (data.length === 0) {
            res.status(401).json({
                message: "Invalid email or password",
            })
        } else {
            if (await bcrypt.compare(u_password, data[0].u_password)) {
                res.json(
                    {
                        u_username:data[0].u_username,
                        u_fullname:data[0].u_fullname,
                        u_birthday:data[0].u_birthday,
                        u_phone:data[0].u_phone,
                        u_email:data[0].u_email,
                        token: generateToken(data[0].u_id)
                    }
                ).status(200);
            } else {
                res.json("Internal server error").status(500);
            }
        }
    })
}

//@des Get Authenticated user details
//@route POST /api/user/
//@access private
export const getUser = async (req, res) => {
    const user = req.user;

    const getUserQuery = "select * from users where u_id=?";

    db.query(getUserQuery, [user.id], async (err, data) => {
        res.json(
            {
                u_username:data[0].u_username,
                u_fullname:data[0].u_fullname,
                u_birthday:data[0].u_birthday,
                u_phone:data[0].u_phone,
                u_email:data[0].u_email,
            }
        ).status(200);

    })
}

export const listUsers=(req,res)=>{
    const getUsersQuery = "select u_username,u_fullname,u_birthday,u_phone,u_email from users";

    db.query(getUsersQuery, [], async (err, data) => {
        res.json(
            {
                users:data
            }
        ).status(200);

    })
}
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'});
}