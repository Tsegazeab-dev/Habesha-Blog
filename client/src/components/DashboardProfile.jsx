import { Button, TextInput } from "flowbite-react"
import { useSelector } from "react-redux"

function DashboardProfile() {
    const {userData} = useSelector(state => state.persistedReducer.user)
    console.log(userData)
  return (
    <div className="max-w-lg mx-auto p-3 w-full ">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="p-3 w-32 h-32 self-center">
          <img
            src={userData.profilePicture}
            alt="Profile Picture"
            className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
          />
        </div>

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