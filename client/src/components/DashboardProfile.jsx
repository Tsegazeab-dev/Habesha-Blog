import { Alert, Button, TextInput } from "flowbite-react"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../utils/firebase.js'
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { updateStart, updateSuccess, updateFailure } from "../utils/redux/user/userSlice.js"
import {useNavigate} from 'react-router-dom'

function DashboardProfile() {
    const {userData, error, loading} = useSelector(state => state.persistedReducer.user);

    const imagePickerRef = useRef()
    const[imageFile, setImageFile] = useState(null)
    const[imageFileUrl, setImageFileUrl] = useState(null)
    const[imageUploadProgress, setImageUploadProgress] = useState(null)
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [updateSuccessFlag, setUpdateSuccessFlag] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
// onchange event triggered when user choose a file so handleImageChange function invoked
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
      // to remove the upload error when someone try to upload new image
      setImageFileUploadError(null);
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
          // to clear 100% progress  after successful uploading of image
          setImageUploadProgress(null)
          // set the download url of the uploaded image to the state
          setImageFileUrl(downloadURL);
          setFormData({...formData, profilePicture: downloadURL})
      }
      )}
      )

    }

    const handleChange = (e)=>{
      setFormData({...formData, [e.target.id]: e.target.value})
    }

   const handleSubmit = async (e)=>{
    e.preventDefault();
    // check if there is no change to be updated by checking if there is key in the formData object
    if(Object?.keys(formData).length === 0){
      dispatch(updateFailure("No change made"))
      return;
    }
    try {
      dispatch(updateStart())
      const res = await fetch(`api/user/update/${userData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(res)
      if(!res.ok){
        if(res.status === 401){
          // redirect to sign in page since the token is cleared or expired
          navigate("/signin", {
            state: {
              msg: "please sign in first to update!",
              redirect: "/dashboard?tab=profile",
            },
          });

          dispatch(updateFailure(null));
          return;
        }
        dispatch(updateFailure(data.message))
        
      }
      else{
        
        dispatch(updateSuccess(data));
        setUpdateSuccessFlag(true)
      }
    } catch (error) {
      dispatch(updateFailure(error))
    }
   }
   
  return (
    <div className="max-w-lg mx-auto p-3 w-full ">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageUploadProgress && imageUploadProgress < 100 && "opacity-60"
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
          onChange={handleChange}
        />
        <TextInput
          type="email"
          placeholder="email"
          id="email"
          defaultValue={userData.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          placeholder="******"
          id="password"
          onChange={handleChange}
        />
        <Button gradientDuoTone="tealToLime" type="submit">
          Update
        </Button>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-500 cursor-pointer">Delete Account</span>
        <span className="text-red-500 cursor-pointer">Sign Out</span>
      </div>

      {updateSuccessFlag && (
        <Alert className="mt-5" color="success">Profile Updated Successfully</Alert>
      )}

      {error && (
        <Alert className="mt-5" color="failure">
          {error}
        </Alert>
      )}
    </div>
  );
}

export default DashboardProfile

