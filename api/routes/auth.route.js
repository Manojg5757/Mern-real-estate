import express from 'express'
import { signup,signin } from '../controllers/auth.controller.js'


const auth = express.Router()

auth.post('/signup',signup)
auth.post('/signin',signin)

export default auth;