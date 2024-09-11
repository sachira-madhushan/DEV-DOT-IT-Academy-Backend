import express from 'express';
import adminRouter from './routes/adminRoutes.js';

const app=express();
app.use(express.json());
app.use("/api/admin",adminRouter);

app.listen(4000,()=>{
    console.log("Server is running...");
})