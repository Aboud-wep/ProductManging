import { Outlet } from "react-router-dom";
import DashboardHeader from "../../Conmponants/DashboardHeader";
import DashboardSidbar from "../../Conmponants/DashboardSidbar";

export default function Dashboard() {
  return (
    <div>
      <DashboardHeader />
      <DashboardSidbar />
      <div className="Users">
        <Outlet />
      </div>
    </div>
  );
}
