import { Button } from "flowbite-react";
import { FaGoogle } from "react-icons/fa";
import { app } from "../utils/firebase";
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth"
import { signInSuccess } from "../utils/redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function GoogleAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogle = async ()=>{
        const auth = getAuth(app)
        // initialize a google auth provider
        const provider = new GoogleAuthProvider()
        // to make Google always prompt the user for a google account
        provider.setCustomParameters({ prompt: "select_account" });

        try {
            // sign in with the google account
            const result = await signInWithPopup(auth, provider);
           const res = await fetch("/api/auth/google", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name: result.user.displayName,
                    email : result.user.email,
                    googlePhoto : result.user.photoURL
                })
            })
            const data = await res.json()
            
            if(res.ok){
                dispatch(signInSuccess(data))
                navigate("/")
                
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Button type='button'gradientDuoTone="greenToBlue" outline onClick={handleGoogle}>
      <FaGoogle className="mr-4" /> Continue with google
    </Button>
  );
}
