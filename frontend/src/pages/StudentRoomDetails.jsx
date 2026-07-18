import { useNavigate } from "react-router-dom";

function StudentRoomDetails() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gray-100 p-6 md:p-8">

      {/* Back Button */}
      <button
        onClick={() => navigate("/student-dashboard")}
        className="mb-6 bg-white border border-orange-500 text-orange-500 px-5 py-2 rounded-xl hover:bg-orange-50 transition"
      >
        ← Back to Dashboard
      </button>

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-3xl p-8 shadow-lg mb-8">

        <h1 className="text-4xl font-bold">
          Room Details 🏠
        </h1>

        <p className="mt-2 text-orange-100">
          View your room and roommate information
        </p>

      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Room Information */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-md p-8">

          <h2 className="text-2xl font-bold mb-6">
            Room Information
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <div className="bg-orange-50 p-5 rounded-2xl">
              <p className="text-gray-500 text-sm">
                Room Number
              </p>

              <h3 className="text-2xl font-bold text-orange-500 mt-2">
                A-204
              </h3>
            </div>

            <div className="bg-orange-50 p-5 rounded-2xl">
              <p className="text-gray-500 text-sm">
                Floor
              </p>

              <h3 className="text-2xl font-bold text-orange-500 mt-2">
                2nd Floor
              </h3>
            </div>

            <div className="bg-orange-50 p-5 rounded-2xl">
              <p className="text-gray-500 text-sm">
                Capacity
              </p>

              <h3 className="text-2xl font-bold text-orange-500 mt-2">
                3 Students
              </h3>
            </div>

            <div className="bg-orange-50 p-5 rounded-2xl">
              <p className="text-gray-500 text-sm">
                Occupied
              </p>

              <h3 className="text-2xl font-bold text-orange-500 mt-2">
                3 Students
              </h3>
            </div>

          </div>

        </div>

        {/* Room Status */}
        <div className="bg-white rounded-3xl shadow-md p-8">

          <h2 className="text-2xl font-bold mb-6">
            Room Status
          </h2>

          <div className="space-y-4">

            <div className="bg-green-50 p-4 rounded-xl">
              ✅ Electricity Active
            </div>

            <div className="bg-green-50 p-4 rounded-xl">
              🌐 WiFi Connected
            </div>

            <div className="bg-green-50 p-4 rounded-xl">
              🚿 Water Supply Available
            </div>

            <div className="bg-blue-50 p-4 rounded-xl">
              🧹 Cleaning Scheduled
            </div>

          </div>

        </div>

      </div>

      {/* Roommates */}
      <div className="bg-white rounded-3xl shadow-md p-8 mt-8">

        <h2 className="text-2xl font-bold mb-6">
          Roommates
        </h2>

        <div className="grid md:grid-cols-3 gap-5">

          <div className="bg-gray-50 p-5 rounded-2xl">

            <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3">
              A
            </div>

            <h3 className="font-semibold">
              Aman Sharma
            </h3>

            <p className="text-sm text-gray-500">
              B.Tech CSE
            </p>

          </div>

          <div className="bg-gray-50 p-5 rounded-2xl">

            <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3">
              R
            </div>

            <h3 className="font-semibold">
              Rahul Singh
            </h3>

            <p className="text-sm text-gray-500">
              B.Tech CSE
            </p>

          </div>

          <div className="bg-gray-50 p-5 rounded-2xl">

            <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3">
              S
            </div>

            <h3 className="font-semibold">
              Student (You)
            </h3>

            <p className="text-sm text-gray-500">
              B.Tech CSE
            </p>

          </div>

        </div>

      </div>

      {/* Hostel Rules */}
      <div className="bg-white rounded-3xl shadow-md p-8 mt-8">

        <h2 className="text-2xl font-bold mb-6">
          Hostel Rules
        </h2>

        <div className="space-y-4">

          <div className="bg-orange-50 p-4 rounded-xl">
            ⏰ Hostel Entry Time: 10:00 PM
          </div>

          <div className="bg-orange-50 p-4 rounded-xl">
            🚪 Gate Pass Required For Overnight Leave
          </div>

          <div className="bg-orange-50 p-4 rounded-xl">
            🔇 Maintain Silence After 11:00 PM
          </div>

          <div className="bg-orange-50 p-4 rounded-xl">
            🚭 Smoking And Alcohol Are Strictly Prohibited
          </div>

        </div>

      </div>

    </section>
  );
}

export default StudentRoomDetails;