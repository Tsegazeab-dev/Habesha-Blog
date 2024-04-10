import {Sidebar, SidebarItem, SidebarItemGroup} from 'flowbite-react'
import { useEffect, useState } from 'react';
import { HiUser, HiArrowSmRight } from "react-icons/hi";
import { Link, useLocation } from 'react-router-dom';
import { signOutSuccess } from '../utils/redux/user/userSlice';
import {useDispatch} from 'react-redux'
export default function DashboardSideBar() {
    const location = useLocation()
    const [tab, setTab] = useState();
    const dispatch = useDispatch()
    useEffect(()=>{
        const  urlParams = new URLSearchParams(location.search)
        if(urlParams){
            const tabQuery = urlParams.get("tab")
            setTab(tabQuery)
        }

    },[location.search])

     const handleSignout = async () => {
       try {
         const res = await fetch("/api/user/signout");
         const data = await res.json();
         if (!res.ok) {
           console.log(data.message);
         } else {
           dispatch(signOutSuccess());
         }
       } catch (error) {
         console.log(error.message);
       }
     };
  return (
    <Sidebar className="w-full">
      <Sidebar.Items>
        <SidebarItemGroup className="flex flex-col gap-1">
          <Link to="/dashboard?tab=profile">
            <SidebarItem
              icon={HiUser}
              label="user"
              labelColor="dark"
              active={tab === "profile"}
              as="div"
            >
              Profile
            </SidebarItem>
          </Link>

          <SidebarItem
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignout}
          >
            Sign Out
          </SidebarItem>
        </SidebarItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
