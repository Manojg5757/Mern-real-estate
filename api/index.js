import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.router.js'
import authRouter from './routes/auth.route.js'
dotenv.config()

mongoose.connect(process.env.mongo)
.then(()=>{
    console.log("Connected to database yeah wooooo hoooo")
}).catch((err)=>{
    console.log(err)
})

const app = express()
app.use(express.json())


app.listen(3000, ()=>{
    console.log("Prime is Back in action once again")
})

app.use('/api/user',userRouter)

app.use('/api/auth',authRouter)