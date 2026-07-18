import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import ComplaintStatusChart from "../components/Charts/ComplaintStatusChart";
import ComplaintCategoryChart from "../components/Charts/ComplaintCategoryChart";

function ComplaintsPage() {

  const [complaints, setComplaints] =
    useState([]);

  const loadComplaints = async () => {

    try {

      const response = await fetch(
        "http://localhost/hostel_api/complaints/get_complaints.php"
      );

      const data = await response.json();

      if (data.success) {

        setComplaints(data.complaints);

      }

    } catch (error) {

      console.log(error);

    }

  };
  const [replyText, setReplyText] = useState({});
  const [replyingId, setReplyingId] = useState(null);

  useEffect(() => {

    loadComplaints();

  }, []);

  const updateStatus = async (
    id,
    status
  ) => {

    try {

      const response = await fetch(
        "http://localhost/hostel_api/complaints/update_complaint_status.php",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            id,
            status,
          }),
        }
      );

      const data =
        await response.json();

      if (data.success) {

        loadComplaints();

      }

    } catch (error) {

      console.log(error);

    }

  };

  const saveReply = async (id) => {

    try {

      const response = await fetch(
        "http://localhost/hostel_api/complaints/update_complaint_reply.php",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            id,
            reply: replyText[id] || "",
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      if (data.success) {

        setReplyingId(null);

        loadComplaints();

      }

    } catch (error) {

      console.log(error);

    }

  };

  const deleteComplaint = async (
    id
  ) => {

    const confirmDelete =
      window.confirm(
        "Delete Complaint?"
      );

    if (!confirmDelete) return;

    try {

      const response = await fetch(
        "http://localhost/hostel_api/complaints/delete_complaint.php",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            id,
          }),
        }
      );

      const data =
        await response.json();

      alert(data.message);

      if (data.success) {

        loadComplaints();

      }

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="flex bg-gray-100">

      <Sidebar />

      <div className="flex-1">

        <Topbar />

        <div className="p-8 space-y-8">

          {/* Charts */}

          <div className="grid lg:grid-cols-2 gap-6">

            <ComplaintStatusChart />

            <ComplaintCategoryChart />

          </div>

          {/* Complaints List */}

          <div>

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-3xl font-bold">

                Student Complaints

              </h2>

              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-xl font-medium">

                {complaints.length} Complaints

              </span>

            </div>

            <div className="space-y-5">

              {complaints.map((item) => (

                <div
                  key={item.id}
                  className="bg-white rounded-3xl shadow p-6"
                >

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                    {/* Left Side */}

                    <div className="flex-1">

                      <div className="flex flex-wrap items-center gap-3 mb-3">

                        <h3 className="text-xl font-bold text-orange-500">

                          {item.student_name}

                        </h3>

                        <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">

                          Room {item.room_no}

                        </span>

                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">

                          {item.category}

                        </span>

                      </div>

                      <p className="text-gray-700 mb-3">

                        {item.description}

                      </p>

                      {item.reply && (

                        <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-3">

                          <p className="font-semibold text-green-700">
                            Warden Reply:
                          </p>

                          <p>
                            {item.reply}
                          </p>

                        </div>

                      )}

                      <p className="text-sm text-gray-500">

                        Submitted on {item.created_at}

                      </p>

                    </div>

                    {/* Right Side */}

                    <div className="flex flex-col gap-3">

                      <select
                        value={item.status}
                        onChange={(e) =>
                          updateStatus(
                            item.id,
                            e.target.value
                          )
                        }
                        className="border rounded-xl px-4 py-2"
                      >
                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Working">
                          Working
                        </option>

                        <option value="Resolved">
                          Resolved
                        </option>
                      </select>

                      <button
                        onClick={() =>
                          setReplyingId(item.id)
                        }
                        className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl"
                      >
                        Reply
                      </button>

                      <button
                        onClick={() =>
                          deleteComplaint(item.id)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
                      >
                        Delete
                      </button>

                    </div>

                    {replyingId === item.id && (

                      <div className="mt-4 border-t pt-4">

                        <textarea
                          value={
                            replyText[item.id] ||
                            item.reply ||
                            ""
                          }
                          onChange={(e) =>
                            setReplyText({
                              ...replyText,
                              [item.id]: e.target.value,
                            })
                          }
                          placeholder="Write your reply..."
                          className="w-full border rounded-xl p-3 mb-3"
                          rows="4"
                        />

                        <div className="flex gap-3">

                          <button
                            onClick={() =>
                              saveReply(item.id)
                            }
                            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl"
                          >
                            Save Reply
                          </button>

                          <button
                            onClick={() =>
                              setReplyingId(null)
                            }
                            className="bg-gray-300 hover:bg-gray-400 px-5 py-2 rounded-xl"
                          >
                            Cancel
                          </button>

                        </div>

                      </div>

                    )}

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default ComplaintsPage;