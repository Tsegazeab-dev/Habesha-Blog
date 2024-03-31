import { Alert, Button, TextInput } from "flowbite-react"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../utils/firebase.js'
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function DashboardProfile() {
    const {userData} = useSelector(state => state.persistedReducer.user);

    const imagePickerRef = useRef()
    const[imageFile, setImageFile] = useState(null)
    const[imageFileUrl, setImageFileUrl] = useState(null)
    const[imageUploadProgress, setImageUploadProgress] = useState(null)
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    
// onchange even triggered when user choose a file so handleImageChange function invoked
    const handleImageChange = (e)=>{
      const file = e.target.files[0];  // get the file from event.
    
      if(file){
        setImageFile(file)
      }
      
    }

    useEffect(()=>{
      if(imageFile){
        uploadImage()
      }
    },[imageFile]);

    const uploadImage = async ()=>{
      setImageFileUploadError(null)
      const storage = getStorage(app);
      const fileName = new Date().getTime() + imageFile.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on('state_changed', (snapshot)=>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
        setImageUploadProgress(progress.toFixed(0))
      },
      (error)=> {
        setImageFileUploadError("File must be image and less than 2MB")
        setImageFile(null)
        setImageFileUrl(null)
        setImageUploadProgress(null)
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUploadProgress(null)
          setImageFileUrl(downloadURL);
      }
      )}
      )

    }

  return (
    <div className="max-w-lg mx-auto p-3 w-full ">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={imagePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center"
          onClick={() => imagePickerRef.current.click()}
        >
          {imageUploadProgress && (
            <CircularProgressbar
              value={imageUploadProgress || 0}
              text={`${imageUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  border: "none",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${imageUploadProgress / 100})`,
                },
              }}
            />
          )}

          <img
            src={imageFileUrl || userData.profilePicture}
            alt="Profile Picture"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageUploadProgress && imageUploadProgress < 100 &&"opacity-60"
            }`}
          />
        </div>

        {imageFileUploadError && (
          <Alert className="text-center" color="failure">
            {imageFileUploadError}
          </Alert>
        )}

        <TextInput
          type="name"
          placeholder="username"
          id="username"
          defaultValue={userData.username}
        />
        <TextInput
          type="email"
          placeholder="email"
          id="email"
          defaultValue={userData.email}
        />
        <TextInput type="password" placeholder="******" id="password" />
        <Button gradientDuoTone="tealToLime">Update</Button>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-500 cursor-pointer">Delete Account</span>
        <span className="text-red-500 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}

export default DashboardProfile

