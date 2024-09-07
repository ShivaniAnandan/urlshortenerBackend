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

// app.use(cors({
//     origin: 'http://localhost:5173', // Allow requests from this origin
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed methods
//     credentials: true, // Include credentials like cookies in requests
// }));

// app.set('view engine', "ejs");

app.use( '/api/auth',  userRoutes  );
app.use( '/api/url',  urlRoutes  );

app.use('/', (req,res)=>{
    res.status(200).send("example")
    // res.render('home')
})



// // Generate a random secret key
// const jwtSecret = crypto.randomBytes(64).toString('hex');

// // Print the generated secret key to the console
// console.log('Your JWT Secret Key:', jwtSecret);

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})