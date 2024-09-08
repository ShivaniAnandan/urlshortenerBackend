import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB  from './Database/config.js';
import userRoutes from './Routers/authRouter.js';
import urlRoutes from './Routers/urlRouter.js'
import crypto from 'crypto';
dotenv.config();

const app = express();
const port = process.env.PORT;
connectDB();

app.use(express.json())

app.use(cors());

app.use( '/api/auth',  userRoutes  );
app.use( '/api/url',  urlRoutes  );

app.use('/', (req,res)=>{
    res.status(200).send("example")
    
})


app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})