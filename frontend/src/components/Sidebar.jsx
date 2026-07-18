import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-72 bg-white shadow-xl min-h-screen p-6">

      <h1 className="text-3xl font-bold text-orange-500 mb-10">
        DormDesk
      </h1>

      <div className="space-y-3">

        <Link
          to="/warden-dashboard"
          className="block p-4 rounded-xl hover:bg-orange-50"
        >
          Dashboard
        </Link>

        <Link
          to="/rooms"
          className="block p-4 rounded-xl hover:bg-orange-50"
        >
          Room Management
        </Link>

        <Link
          to="/students"
          className="block p-4 rounded-xl hover:bg-orange-50"
        >
          Students
        </Link>

        <Link
          to="/alumni"
          className="block p-4 rounded-xl hover:bg-orange-50"
        >
          Alumni
        </Link>

        <Link
          to="/complaints"
          className="block p-4 rounded-xl hover:bg-orange-50"
        >
          Complaints
        </Link>

        <Link
          to="/gatepasses"
          className="block p-4 rounded-xl hover:bg-orange-50"
        >
          Gate Pass Requests
        </Link>

        <Link
          to="/notices"
          className="block p-4 rounded-xl hover:bg-orange-50"
        >
          Notices
        </Link>

      </div>

    </div>
  );
}

export default Sidebar;