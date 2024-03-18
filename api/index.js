import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.mongo)
.then(()=>{
    console.log("Connected to database yeah wooooo hoooo")
}).catch((err)=>{
    console.log(err)
})

const app = express()


app.listen(3000, ()=>{
    console.log("Prime is Back in action once again")
})