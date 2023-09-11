import express from 'express';
import cors from 'cors';
import colors from 'colors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./Routes/userRoutes.js";
import chatRoutes from "./Routes/chatRoutes.js";
import messageRoutes from "./Routes/messageRoutes.js";


//env config
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.get("/", (req, res) => {
      res.send("API is running123");
    });
    
app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);
    
// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

//Port
const PORT = process.env.PORT || 8080;
const DEV_MODE = process.env.DEV_MODE;

//listen
app.listen(PORT,() =>{
      console.log(`Server Running on ${DEV_MODE} mode Port on ${PORT}`.bgCyan.white)
})