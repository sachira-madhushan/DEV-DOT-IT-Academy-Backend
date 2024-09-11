import express from 'express';
import adminRouter from './routes/adminRoutes.js';
import userRouter from './routes/userRoutes.js';
import courseRouter from './routes/courseRoutes.js';

const app=express();
app.use(express.json());
app.use("/api/admin",adminRouter);
app.use("/api/user",userRouter);
app.use("/api/course",courseRouter);

app.listen(4000,()=>{
    console.log("Server is running...");
})