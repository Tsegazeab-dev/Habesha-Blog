import { useLocation } from "react-router-dom";
function Dashboard() {
  console.log(useLocation());
  return <div>Dashboard</div>;
}

export default Dashboard;
