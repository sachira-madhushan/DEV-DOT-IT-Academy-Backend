import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import hbs from 'nodemailer-express-handlebars';
import path from 'path'

dotenv.config();

const sendPasswordEmail =(to,name,password,res)=>{
    const transport=nodemailer.createTransport({
        host:process.env.SMTP_SERVER,
        port:465,
        secure:true,
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.MAIL_PASSWORD
        }
    })

    const mailOptions={
        from:process.env.SMTP_MAIL,
        to:to,
        subject:"DEV DOT IT Academy - Registration Complete",
        template: 'StudentRegistrationEmail',
        context: {
            name:name,
            password:password,
        },
    }

    const handlebarOptions = {
        viewEngine: {
          partialsDir: path.resolve('../DEV-DOT-IT-Academy-Backend/models/'),
          defaultLayout: false,
        },
        viewPath: path.resolve('../DEV-DOT-IT-Academy-Backend/models/'),
        extName: '.html',
      };

    transport.use('compile', hbs(handlebarOptions));

    transport.sendMail(mailOptions,(err,info)=>{
        if(err){
            res.status(500).send(err+info)
        }else{
            res.status(201).send("Register Success!.Mail was sent successfuly!")
        }
    })

}

export default sendPasswordEmail
