import express from 'express'

import cors from 'cors'
import morgan from 'morgan';
import { connectDB } from './config/dbconfig.js';

const server = express();
const PORT = process.env.PORT||8000;

//connection to database
// connectDB();
connectDB().then(()=>{server.listen(PORT, error => {
    error? console.log(error):console.log("Server is running at http://localhost:"+PORT)
})}).catch((error)=>console.log(error))


// middlewares
server.use(cors())
server.use(morgan('dev'))
server.use(express.json())

server.get('/', (req, res) => {
    res.json({
        
        message:"server is live"
    })
})
