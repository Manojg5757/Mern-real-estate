import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { app } from "../firbase";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError,setFileUploadError] = useState(false)
  const [formData,setFormData] = useState({})
  console.log(filePerc);
  console.log(formData)
  console.log(fileUploadError)
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePerc(Math.round(progress));
    },
    (error)=>{
      setFileUploadError(true)
    },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadUrl)=>{
            setFormData({ ...formData,avatar:downloadUrl})
        })
      }
    );
    
  };
  return (
    <div className="max-w-lg mx-auto">
      <h1 className=" text-xl mt-2 text-center">Profile</h1>
      <form className=" flex flex-col gap-4 mt-5">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full w-24 h-24 self-center"
          src={formData.avatar || currentUser.avatar}
          alt="profile image"
        />
        <p className="self-center">
          {
            fileUploadError ? (
              <span className="text-red-700">Error in Image Upload(Image must be less than 2Mb</span>
            ) : filePerc >0 && filePerc <100 ?(
              <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
            ): filePerc === 100 ?(
              <span className="text-green-700">Uploaded Successfully</span>
            ): (
              ''
            )
          }
        </p>
        <input
          type="text"
          className="p-3 border rounded-lg"
          placeholder="username"
          id="username"
        />
        <input
          type="email"
          className="p-3 border rounded-lg"
          placeholder="email"
          id="email"
        />
        <input
          type="password"
          className="p-3 border rounded-lg"
          placeholder="password"
          id="password"
        />
        <button className="text-white bg-slate-500 p-3 rounded-lg">
          UPDATE
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-400">Delete Account</span>
        <span className="text-red-500">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
