import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../Components/DashSidebar";
import DashProfile from "../Components/DashProfile";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState();
  
  console.log("useEffect ~ location.search:", location.search);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  }, [location.search]);
  
  return (
    <>
    <div className="min-h-screen  flex flex-col md:flex-row">
      <div className="md:w-56">
      {/* SideBar */}
        <DashSidebar/>
      </div>
      {/* profile */}
      {tab  === 'profile' &&  <DashProfile/>}
    </div>
    </>
  );
};

export default Dashboard;
