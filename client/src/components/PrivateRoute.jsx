import {  useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
function PrivateRoute() {
    const { userData } = useSelector((state) => state.persistedReducer.user);
    console.log(userData)
  return (
    <div>
        {userData ? <Outlet/> : <Navigate to='/signin'/>}
    </div>
  )
}

export default PrivateRoute