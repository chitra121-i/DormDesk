import { useNavigate } from "react-router-dom";

function Topbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmLogout) {

      // Remove login session
      localStorage.removeItem("warden");

      // Go to Home page
      navigate("/", { replace: true });

    }

  };

  return (
    <div className="bg-white p-5 shadow flex justify-between items-center">

      {/* Left Side */}

      <div>

        <h2 className="text-3xl font-bold">
          Warden Dashboard
        </h2>

        <p className="text-gray-500">
          Manage rooms, students, complaints,
          notices and gate passes from one place.
        </p>

      </div>

      {/* Right Side */}

      <div className="flex items-center gap-4">

        {/* Notification */}

        <button
          className="text-2xl hover:scale-110 transition"
        >
          🔔
        </button>

        {/* Warden Badge */}

        <div className="bg-orange-500 text-white px-4 py-2 rounded-xl font-medium">
          Warden
        </div>

        {/* Logout */}

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-medium transition"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Topbar;