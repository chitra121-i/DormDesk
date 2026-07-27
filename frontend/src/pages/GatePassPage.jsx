import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";

function GatePassPage() {

  const [searchTerm, setSearchTerm] = useState("");

  const [requests, setRequests] = useState([]);

  const [activeTab, setActiveTab] = useState("Pending");
  const loadGatepasses = async () => {

    try {

      const response = await fetch(
        "http://localhost/DormDesk/backend/gatepasses/get_gatepasses.php"
      );

      const data = await response.json();

      if (data.success) {

        setRequests(data.gatepasses);

      }

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    loadGatepasses();

  }, []);

  const approveRequest = async (id) => {

    try {

      const response = await fetch(
        "http://localhost/DormDesk/backend/gatepasses/approve_gatepass.php",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            id,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      if (data.success) {

        loadGatepasses();

      }

    } catch (error) {

      console.log(error);

    }

  };

  const rejectRequest = async (id) => {

    const reason = prompt(
      "Enter reason for rejection"
    );

    if (!reason) return;

    try {

      const response = await fetch(
        "http://localhost/DormDesk/backend/gatepasses/reject_gatepass.php",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            id,
            reason,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      if (data.success) {

        loadGatepasses();

      }

    } catch (error) {

      console.log(error);

    }

  };

  const getStatusColor = (status) => {

    switch (status) {

      case "Pending":
        return "bg-yellow-500";

      case "Approved":
        return "bg-green-500";

      case "Rejected":
        return "bg-red-500";

      case "Expired":
        return "bg-gray-500";

      case "Completed":
        return "bg-blue-500";

      default:
        return "bg-gray-500";
    }
  };

  const filteredRequests = requests
    .filter((req) => {

      if (activeTab === "Pending")
        return req.status === "Pending";

      if (activeTab === "Approved")
        return req.status === "Approved";

      return (
        req.status === "Rejected" ||
        req.status === "Expired" ||
        req.status === "Completed"
      );
    })
    .filter((req) =>
      req.student_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

      req.roll_no
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

      req.room_no
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort(
      (a, b) =>
        new Date(a.requestDate) -
        new Date(b.requestDate)
    );

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Topbar />

        <div className="p-8">

          <h1 className="text-3xl font-bold mb-6">
            Gate Pass Requests
          </h1>

          {/* Statistics Cards */}

          <div className="grid md:grid-cols-4 gap-6 mb-8">

            <StatCard
              title="Pending Requests"
              value={
                requests.filter(
                  (r) => r.status === "Pending"
                ).length
              }
            />

            <StatCard
              title="Approved Passes"
              value={
                requests.filter(
                  (r) => r.status === "Approved"
                ).length
              }
            />

            <StatCard
              title="Rejected Requests"
              value={
                requests.filter(
                  (r) => r.status === "Rejected"
                ).length
              }
            />

            <StatCard
              title="Expired Requests"
              value={
                requests.filter(
                  (r) => r.status === "Expired"
                ).length
              }
            />

          </div>

          {/* Search */}

          <div className="mb-6">

            <input
              type="text"
              placeholder="Search by Student, Student ID or Room..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full md:w-96 bg-white border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
            />

          </div>

          {/* Tabs */}

          <div className="flex gap-4 mb-8">

            <button
              onClick={() => setActiveTab("Pending")}
              className={`px-5 py-3 rounded-xl ${
                activeTab === "Pending"
                  ? "bg-orange-500 text-white"
                  : "bg-white"
              }`}
            >
              Pending
            </button>

            <button
              onClick={() => setActiveTab("Approved")}
              className={`px-5 py-3 rounded-xl ${
                activeTab === "Approved"
                  ? "bg-orange-500 text-white"
                  : "bg-white"
              }`}
            >
              Approved
            </button>

            <button
              onClick={() => setActiveTab("History")}
              className={`px-5 py-3 rounded-xl ${
                activeTab === "History"
                  ? "bg-orange-500 text-white"
                  : "bg-white"
              }`}
            >
              History
            </button>

          </div>

          {/* Requests */}

          <div className="space-y-5">

            {filteredRequests.map((req) => (

              <div
                key={req.id}
                className="bg-white rounded-3xl shadow p-6"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {req.student_name}
                    </h2>

                    <p className="text-gray-600">
                      <span className="font-semibold">
                        Student ID:
                      </span>{" "}
                      {req.roll_no}
                    </p>

                    <p className="text-gray-600">
                      <span className="font-semibold">
                        Room Number:
                      </span>{" "}
                      {req.room_no}
                    </p>

                    <p className="text-gray-600">
                      <span className="font-semibold">
                        Requested On:
                      </span>{" "}
                      {req.created_at}
                    </p>

                    <p className="mt-3">
                      <span className="font-semibold">
                        Reason:
                      </span>{" "}
                      {req.reason}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Out:
                      </span>{" "}
                      {req.out_date} {req.out_time}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Return:
                      </span>{" "}
                      {req.return_date} {req.return_time}
                    </p>

                    {req.rejection_reason && (
                      <p className="text-red-500 mt-2">
                        <span className="font-semibold">
                          Rejection Reason:
                        </span>{" "}
                        {req.rejection_reason}
                      </p>
                    )}

                  </div>

                  <div>

                    <span
                      className={`px-4 py-2 rounded-full text-white ${getStatusColor(req.status)}`}
                    >
                      {req.status}
                    </span>

                  </div>

                </div>

                {req.status === "Pending" && (

                  <div className="mt-5 flex gap-3">

                    <button
                      onClick={() =>
                        approveRequest(req.id)
                      }
                      className="bg-green-500 text-white px-5 py-2 rounded-xl hover:bg-green-600"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        rejectRequest(req.id)
                      }
                      className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600"
                    >
                      Reject
                    </button>

                  </div>

                )}

              </div>

            ))}

            {filteredRequests.length === 0 && (
              <div className="bg-white rounded-3xl p-10 text-center text-gray-500 shadow">
                No requests found.
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default GatePassPage;