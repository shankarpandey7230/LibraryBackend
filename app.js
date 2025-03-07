import express from 'express'

import cors from 'cors'
import morgan from 'morgan';
const server = express();
const PORT = process.env.PORT||8000;





// middlewares
server.use(cors())
server.use(morgan('dev'))
server.use(express.json())

server.get('/', (req, res) => {
    res.json({
        
        message:"server is live"
    })
})
server.listen(PORT, error => {
    error? console.log(error):console.log("Server is running at http://localhost:"+PORT)
})