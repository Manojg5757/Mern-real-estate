import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firbase';
import { signInSuccess } from '../redux/user/userSlice';
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';

export default function Oauth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleChange = async()=>{
        try {
            const provider =new GoogleAuthProvider();
            const auth = getAuth(app)

            const result = await signInWithPopup(auth,provider)
            
            console.log(result)
             
            const res = await fetch('/api/auth/google',{
                method:'POST',
                headers:{
                    'Content-Type':"application/json"
                },
                body:JSON.stringify({name:result.user.displayName,email:result.user.email,photo:result.user.photoURL})
            })
            
            const data = await res.json()
            console.log(data)
            dispatch(signInSuccess(data))
            navigate('/')
        } catch (error) {
            console.log("Signin error with google",error)
        }
    }
  return (
    <button type='button' onClick={handleChange} className='bg-red-700 p-3 rounded-lg hover:opacity-95 uppercase text-white'>sign in with Google</button>
  )
}
