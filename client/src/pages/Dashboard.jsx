import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardSideBar from "../components/DashboardSideBar";
import DashboardProfile from "../components/DashboardProfile";
function Dashboard() {
const location = useLocation();
const [tab, setTab] = useState()
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    if(urlParams) {
      const tabQuery =  urlParams.get("tab");
      setTab(tabQuery);
    }
  },[location.search])
  return <div className="min-h-screen flex flex-col md:flex-row">
    {/* Dashboard sidebar */}
    <div className="md:w-56"><DashboardSideBar/></div>
    
    {/* Dashboard profile */}
    {tab === "profile" && <DashboardProfile/>}
  </div>;
}

export default Dashboard;
