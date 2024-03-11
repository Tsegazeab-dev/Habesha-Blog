import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 flex-col md:flex-row max-w-3xl mx-auto gap-10 items-center">
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
            This is a demo project. You can sign in with your email and password
            or with Google.
          </p>
        </div>
        {/* right side */}
        <div className="flex-1">
            <form className="flex flex-col gap-5">
            <div>
                <Label value="your username" htmlFor="name"/>
                <TextInput id='name' type="text" placeholder="username" />
            </div>
            <div>
                <Label value="your email" htmlFor="email"/>
                <TextInput id='email' type="email" placeholder="test@example.com"/>
            </div>
            <div>
                <Label value="your password" htmlFor="name"/>
                <TextInput id='password' type="password" placeholder="password" />
            </div>
            <Button type="submit" gradientDuoTone="tealToLime"> Sign Up</Button>
            </form>
            <div className="flex gap-2 mt-5">
                <p>Already have an account?</p>
                <Link className="text-blue-400">
                Sign In
                </Link>
                
            </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
