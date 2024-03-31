import {Sidebar, SidebarItem, SidebarItemGroup} from 'flowbite-react'
import { useEffect, useState } from 'react';
import { HiUser, HiArrowSmRight } from "react-icons/hi";
import { Link, useLocation } from 'react-router-dom';
export default function DashboardSideBar() {
    const location = useLocation()
    const [tab, setTab] = useState();
    useEffect(()=>{
        const  urlParams = new URLSearchParams(location.search)
        if(urlParams){
            const tabQuery = urlParams.get("tab")
            setTab(tabQuery)
        }

    },[location.search])
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

          <SidebarItem icon={HiArrowSmRight} className="cursor-pointer">
            Sign Out
          </SidebarItem>
        </SidebarItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
