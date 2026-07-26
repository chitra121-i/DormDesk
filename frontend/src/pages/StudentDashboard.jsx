import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function StudentDashboard() {

  const navigate = useNavigate();
const handleLogout = () => {

    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmLogout) {

      localStorage.removeItem("student");

      navigate("/student-login");

    }

  };
  const student =
    JSON.parse(localStorage.getItem("student")) || {};
const [pendingComplaints, setPendingComplaints] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
const [activities, setActivities] = useState([]);
const [pendingFee, setPendingFee] = useState(0);
  const [gatePassStatus, setGatePassStatus] =
    useState("Nil");

  const [noticeCount, setNoticeCount] =
    useState(0);
  useEffect(() => {
  fetch("http://localhost/hostel_api/notices/get_notices.php")
    .then((res) => res.json())
   .then((data) => {
  if (data.success) {
    setNoticeCount(data.notices.length);
  }
})
    .catch((err) => console.log(err));
}, []);
useEffect(() => {

  fetch(
    `http://localhost/hostel_api/fees/get_student_fee.php?student_id=${student.id}`
  )
    .then((res) => res.json())
    .then((data) => {

      if (data.success) {

        const totalPending = data.fees.reduce(
          (sum, fee) => sum + Number(fee.pending_fee),
          0
        );

        setPendingFee(totalPending);

      }

    })
    .catch((err) => console.log(err));

}, []);
useEffect(() => {

  fetch(
    `http://localhost/hostel_api/fees/get_student_fee.php?student_id=${student.id}`
  )
    .then((res) => res.json())
    .then((data) => {

      if(data.success){

        setPendingFee(data.fee.pending_fee);

      }

    })
    .catch((err) => console.log(err));

}, []);
useEffect(() => {

 fetch(
  `http://localhost/hostel_api/complaints/get_student_complaints.php?student_id=${student.id}`
)
    .then((res) => res.json())
    .then((data) => {

      if (data.success) {

        const pending = data.complaints.filter(
          (c) => c.status === "Pending"
        ).length;

        setPendingComplaints(pending);

      }

    })
    .catch((err) => console.log(err));

}, []);
useEffect(() => {

  const loadLatestGatepass = async () => {

    try {

      const response = await fetch(
        `http://localhost/hostel_api/gatepasses/get_student_gatepasses.php?student_id=${student.id}`
      );

      const data = await response.json();

      if (
        data.success &&
        data.gatepasses.length > 0
      ) {

        setGatePassStatus(
          data.gatepasses[0].status
        );

      }

    } catch (error) {

      console.error(error);

    }

  };

  if (student.id) {
    loadLatestGatepass();
  }

}, [student.id]);
useEffect(() => {

  fetch(
  `http://localhost/hostel_api/dashboard/get_student_activities.php?student_id=${student.id}`
)
    .then((res) => res.json())
    .then((data) => {

      if (data.success) {

        setActivities(data.activities);

      }

    })
    .catch((err) => console.log(err));

}, []);
  return (
    <section className="min-h-screen bg-gray-100 overflow-x-hidden">

      {/* SIDEBAR OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* HAMBURGER SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-screen w-80 bg-white shadow-xl z-50 transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 h-full flex flex-col justify-between">

          <div>

            {/* LOGO */}
            <div className="flex justify-between items-center mb-10">

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                  D
                </div>

                <h1 className="text-3xl font-bold text-gray-800">
                  DormDesk
                </h1>

              </div>

              <button
                onClick={() => setMenuOpen(false)}
               className="text-2xl mr-4"
              >
               ✕
              </button>

            </div>

            {/* MENU */}
            <div className="space-y-3">

              <button className="w-full bg-orange-100 text-gray-800 py-3 px-4 rounded-xl text-left font-medium">
                Dashboard
              </button>

              <button
                onClick={() => navigate("/student-complaints")}
                className="w-full hover:bg-orange-100 py-3 px-4 rounded-xl text-left"
              >
                Complaints
              </button>
              <button
                onClick={() => navigate("/community-requests")}
                className="w-full hover:bg-orange-100 py-3 px-4 rounded-xl text-left"
              >
                Community Requests
              </button>
              <button
                onClick={() =>navigate("/student-notices")}
                className="w-full hover:bg-orange-100 py-3 px-4 rounded-xl text-left"
              >
                Notices
              </button>

              <button
                onClick={() => navigate("/student-gatepass")}
                className="w-full hover:bg-orange-100 py-3 px-4 rounded-xl text-left"
              >
                Gate Pass
              </button>

              <button 
              onClick={() => navigate("/room-details")}
              className="w-full hover:bg-orange-100 py-3 px-4 rounded-xl text-left">
                Room Details
              </button>

              <button
              onClick={() =>  navigate("/fee-status")}
              className="w-full hover:bg-orange-100 py-3 px-4 rounded-xl text-left">
                Fee Status
              </button>

            </div>

          </div>

        </div>
      </div>

      {/* MAIN CONTENT */}
      <div
        className={`transition-all duration-300 ${
          menuOpen ? "ml-72" : "ml-0"
        }`}
       >

        {/* TOPBAR */}
        <div className="bg-white shadow-sm px-8 py-5 flex justify-between items-center">

          <div className="flex items-center gap-4">

            <button
              onClick={() => setMenuOpen(true)}
              className="bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600"
            >
              ☰
            </button>

            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Student Dashboard
              </h2>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <div className="bg-gray-100 px-4 py-2 rounded-xl flex items-center gap-2">

              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                S
              </div>

              <div>
                <p className="font-semibold text-sm">
                  Student
                </p>

                <p className="text-xs text-gray-500">
                 {student.email}
                </p>
              </div>

            </div>
            <button
  onClick={handleLogout}
  className="w-full border border-orange-500 text-orange-500 py-4 px-6 rounded-xl text-lg font-semibold hover:bg-orange-50 transition"
>
  Logout
</button>
          </div>

        </div>

        {/* PAGE CONTENT */}
        <div className="p-8 space-y-8">

          {/* HERO */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-3xl p-8 text-white shadow-lg">

            <div className="flex justify-between items-center flex-wrap gap-6">

              <div>

                <h1 className="text-4xl font-bold">
                  Welcome Back  {student.name}👋
                </h1>

                <p className="mt-2 text-orange-100">
                  Manage your hostel life from one place
                </p>

                <div className="flex gap-3 mt-5 flex-wrap">

                  <span className="bg-white/20 px-4 py-2 rounded-xl">
                   Room {student.room_no}
                  </span>

                  <span className="bg-white/20 px-4 py-2 rounded-xl">
                    B.Tech CSE
                  </span>

                  <span className="bg-white/20 px-4 py-2 rounded-xl">
                    2nd Year
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            <div className="bg-white p-6 rounded-3xl shadow hover:shadow-xl transition">
              <h3 className="font-semibold">Gate Pass</h3>

              <h2
                className={`text-2xl font-bold mt-2 ${
                  gatePassStatus === "Approved"
                    ? "text-green-600"
                    : gatePassStatus === "Rejected"
                    ? "text-red-500"
                    : gatePassStatus === "Pending"
                    ? "text-yellow-500"
                    : "text-gray-400"
                }`}
              >
                {gatePassStatus}
              </h2>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow hover:shadow-xl transition">
              <h3 className="font-semibold">Complaints Pending</h3>

              <p className="text-3xl font-bold text-yellow-500">
  {pendingComplaints}
</p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow hover:shadow-xl transition">
              <h3 className="font-semibold">Notices</h3>

              <h2 className="text-3xl font-bold text-orange-500 mt-2">
             {noticeCount}
              </h2>
            </div>

           <div className="bg-white p-6 rounded-2xl shadow-md">

  <h3 className="text-lg font-semibold text-gray-700">
    Pending Fees
  </h3>

  <p className="text-3xl font-bold text-red-500 mt-2">
    ₹{pendingFee}
  </p>

</div>

          </div>

      <div className="bg-white rounded-3xl shadow-md p-6">

  <h2 className="text-2xl font-bold mb-6">
    Recent Activities
  </h2>

  {activities.length === 0 ? (

    <div className="text-center py-8 text-gray-500">
      <p>No recent activities yet.</p>
    </div>

  ) : (

    <div className="space-y-4">

      {activities.map((activity) => {

        const icon =
          activity.title === "Notice Published" ? "📢" :
          activity.title === "Complaint Submitted" ? "📝" :
          activity.title === "Complaint In Progress" ? "🔧" :
          activity.title === "Complaint Resolved" ? "✅" :
          activity.title === "Gatepass Approved" ? "🚪" :
          activity.title === "Gatepass Rejected" ? "❌" :
          activity.title === "Fee Updated" ? "💰" :
          "📌";

        const borderColor =
          activity.title === "Notice Published" ? "border-orange-500" :
          activity.title === "Complaint Submitted" ? "border-yellow-500" :
          activity.title === "Complaint In Progress" ? "border-blue-500" :
          activity.title === "Complaint Resolved" ? "border-green-500" :
          activity.title === "Gatepass Approved" ? "border-green-500" :
          activity.title === "Gatepass Rejected" ? "border-red-500" :
          activity.title === "Fee Updated" ? "border-purple-500" :
          "border-gray-400";

        return (

          <div
            key={activity.id}
            className={`border-l-4 ${borderColor} bg-gray-50 rounded-xl px-4 py-3 hover:shadow-md transition`}
          >

            <div className="flex justify-between items-start">

              <div>

                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <span className="text-xl">{icon}</span>
                  {activity.title}
                </h3>

                <p className="text-gray-600 text-sm mt-1">
                  {activity.description}
                </p>

              </div>

              <span className="text-xs text-gray-400 whitespace-nowrap">
                {new Date(activity.created_at).toLocaleString([], {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>

            </div>

          </div>

        );

      })}

    </div>

  )}

</div>

  </div>
</div>
   </section>
);
}

export default StudentDashboard;