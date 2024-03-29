import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null)
  const[loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value.trim()})
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    // check if the user inputs are all filled
    if(!formData.username || !formData.email || !formData.password){
      setErrorMessage("Please fill out all fields")
      return
    }
    try {
      setLoading(true)
      setErrorMessage(null)
      // we add the proxy inside vite configuration file to send our request to the backend  server port.
     let response = await fetch('/api/auth/signup', {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(formData)
      })

      let data = await response.json()

      if(data.success === false){
        setErrorMessage(data.message)
        setLoading(false)
        return
      }
      setLoading(false)
      navigate('/signin')
    } catch (error) {
      setErrorMessage(error.message)
      setLoading(false)
    }
console.log(formData)
  }
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 flex-col md:flex-row max-w-3xl mx-auto gap-10 md:items-center">
        {/* left side */}
        <div className="flex-1">
          {/* Logo */}
          <Link to="/" className="text-4xl font-bold">
            <span className="px-2 py-1 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-lg text-white">
              Habesha&apos;s
            </span>
            Blog
          </Link>
          <p className="mt-5 text-sm">
            This is a demo project. You can sign up with your username, email and password
            or with Google.
          </p>
        </div>
        {/* right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div>
              <Label value="your username" htmlFor="username" />
              <TextInput
                id="username"
                type="text"
                placeholder="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="your email" htmlFor="email" />
              <TextInput
                id="email"
                type="email"
                placeholder="test@example.com"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="your password" htmlFor="name" />
              <TextInput
                id="password"
                type="password"
                placeholder="password"
                onChange={handleChange}
              />
            </div>
            <Button
              type="submit"
              gradientDuoTone="tealToLime"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <GoogleAuth/>
          </form>
          <div className="flex gap-2 mt-5">
            <p>Already have an account?</p>
            <Link to='/signin'className="text-blue-400">Sign In</Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
