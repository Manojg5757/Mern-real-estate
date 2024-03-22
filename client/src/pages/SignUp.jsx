import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Oauth from "../components/Oauth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error,setError] = useState(null)
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

   try {
    setLoading(true)
    const res =await fetch('/api/auth/signup',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(formData)
    })
    const data =await res.json();

    if(data.success === false){
      setLoading(false)
      setError(data.message)
      
      return
    }
    setLoading(false)
    setError(null)
    navigate('/signin')
    console.log(data)
    
   } catch (error) {
    setLoading(false)
    setError(error.message)
   }
  }

  console.log(formData);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-lg font-semibold text-center">SignUp</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        <input
          type="text"
          placeholder="username..."
          className="border p-3 rounded-lg "
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email..."
          className="border p-3 rounded-lg "
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password..."
          className="border p-3 rounded-lg "
          id="password"
          onChange={handleChange}
        />
        <button disabled={loading}
          className="bg-slate-700 rounded-lg uppercase p-3 text-white"
          type="submit" 
        >
          {loading ? "Loading..": "Sign Up"}
        </button>
        <Oauth />
      </form>
      <div className="flex gap-2">
        <p>Have an account?</p>
        <p className="text-blue-400">SignIn</p>
      </div>
     {error && <p className=" text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default SignUp;
