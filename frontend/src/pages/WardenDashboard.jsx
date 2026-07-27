import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import { useNavigate } from "react-router-dom";
import HostelOccupancyChart from "../components/Charts/HostelOccupancyChart";
import ComplaintStatusChart from "../components/Charts/ComplaintStatusChart";
import ComplaintCategoryChart from "../components/Charts/ComplaintCategoryChart";
import FloorOccupancyChart from "../components/Charts/FloorOccupancyChart";


function WardenDashboard() {
  const navigate = useNavigate();

useEffect(() => {

  const warden = JSON.parse(localStorage.getItem("warden"));

  if (!warden) {

    navigate("/warden-login");

  }

}, [navigate]);
   const [stats, setStats] = useState({
      totalStudents: 0,
      totalRooms: 0,
      pendingComplaints: 0,
      pendingGatepasses: 0,
      approvedToday: 0,
      bedsAvailable: 0,
    });

    const [activities, setActivities] = useState([]);

    const loadDashboardData = async () => {

      try {

        const response = await fetch(
          "http://localhost/DormDesk/backend/dashboard/get_dashboard_stats.php"
        );

        const data = await response.json();

        if (data.success) {

          setStats({
            totalStudents: data.totalStudents,
            totalRooms: data.totalRooms,
            pendingComplaints: data.pendingComplaints,
            pendingGatepasses: data.pendingGatepasses,
            approvedToday: data.approvedToday,
            bedsAvailable: data.bedsAvailable
          });

        }

      } catch (error) {

        console.log(error);

      }

    };
    const loadActivities = async () => {

      try {

        const response = await fetch(
          "http://localhost/DormDesk/backend/dashboard/get_recent_activity.php"
        );

        const data = await response.json();

        if(data.success){

          setActivities(data.activities);

        }

      } catch(error){

        console.log(error);

      }

    };

    useEffect(() => {

      loadDashboardData();
      loadActivities();

    }, []);
  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Topbar />

        <div className="p-8">

          {/* TOP SECTION */}

          <div className="grid lg:grid-cols-2 gap-6">

            {/* LEFT SIDE - STAT CARDS */}

            <div className="grid grid-cols-2 gap-5">

              <StatCard
                title="Total Students"
                value={stats.totalStudents}
                icon="👨‍🎓"
              />

              <StatCard
                title="Rooms"
                value={stats.totalRooms}
                icon="🏠"
              />

              <StatCard
                title="Pending Complaints"
                value={stats.pendingComplaints}
                icon="📝"
              />

              <StatCard
                title="Pending Gate Passes"
                value={stats.pendingGatepasses}
                icon="🎫"
              />

              <StatCard
                title="Approved Passes Today"
                value={stats.approvedToday}
                icon="✅"
              />

              <StatCard
                title="Beds Available"
                value={stats.bedsAvailable}
                icon="🛏️"
              />

            </div>

            {/* RIGHT SIDE - OCCUPANCY CHART */}

            <HostelOccupancyChart />

          </div>

          {/* FLOOR OCCUPANCY + COMPLAINT STATUS */}

          <div className="grid lg:grid-cols-3 gap-6 mt-8">

            <div className="lg:col-span-2">
              <FloorOccupancyChart />
            </div>

            <ComplaintStatusChart />

          </div>

          {/* BOTTOM SECTION */}

          <div className="grid lg:grid-cols-3 gap-6 mt-8">

            {/* LEFT SIDE */}

            <div className="lg:col-span-2 flex flex-col gap-6">

              {/* QUICK ACTIONS */}

              <div className="bg-white rounded-3xl shadow p-6">

                <h2 className="text-2xl font-bold mb-5">
                  Quick Actions
                </h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

                  <Link
                    to="/students"
                    className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-2xl font-semibold transition text-center"
                  >
                    ➕ Add Student
                  </Link>

                  <Link
                    to="/rooms"
                    className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-2xl font-semibold transition text-center"
                  >
                    🏠 Add Room
                  </Link>

                  <Link
                    to="/notices"
                    className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-2xl font-semibold transition text-center"
                  >
                    📢 Post Notice
                  </Link>

                  <Link
                    to="/gatepasses"
                    className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-2xl font-semibold transition text-center"
                  >
                    🎫 View Gate Passes
                  </Link>

                </div>

              </div>

              {/* RECENT ACTIVITY */}

              <div className="bg-white rounded-3xl shadow p-6">

                <h2 className="text-2xl font-bold mb-6">
                  Recent Activity
                </h2>

                <div className="space-y-5">

                  {activities.map((item, index) => (

                    <div
                      key={index}
                      className={`border-l-4 pl-4 py-1 ${
                        item.color === "green"
                          ? "border-green-500"
                          : item.color === "orange"
                          ? "border-orange-500"
                          : item.color === "blue"
                          ? "border-blue-500"
                          : "border-red-500"
                      }`}
                    >

                      <h3 className="font-semibold">
                        {item.title}
                      </h3>

                      <p className="text-gray-500 text-sm">
                        {item.description}
                      </p>

                    </div>

                  ))}

                </div>

              </div>

            </div>

            {/* RIGHT SIDE */}

            <ComplaintCategoryChart />

          </div>

        </div>

      </div>

    </div>
  );
}

export default WardenDashboard;