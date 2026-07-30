import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import ComplaintStatusChart from "../components/Charts/ComplaintStatusChart";
import ComplaintCategoryChart from "../components/Charts/ComplaintCategoryChart";

function ComplaintsPage() {

  const [complaints, setComplaints] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [sortOrder, setSortOrder] = useState("Newest");

  const loadComplaints = async () => {

    try {

      const response = await fetch(
        "http://localhost/DormDesk/backend/complaints/get_complaints.php"
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
        "http://localhost/DormDesk/backend/complaints/update_complaint_status.php",
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
        "http://localhost/DormDesk/backend/complaints/update_complaint_reply.php",
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
        "http://localhost/DormDesk/backend/complaints/delete_complaint.php",
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

  const filteredComplaints =
    selectedCategory === "All"
      ? complaints
      : complaints.filter(
          (item) => item.category === selectedCategory
        );

  const displayComplaints = [...filteredComplaints].sort((a, b) => {

    const aRagging =
      a.category === "Bullying and Ragging";

    const bRagging =
      b.category === "Bullying and Ragging";

    // Ragging complaints always first

    if (aRagging && !bRagging) return -1;

    if (!aRagging && bRagging) return 1;

    const dateA = new Date(a.created_at);

    const dateB = new Date(b.created_at);

    if (sortOrder === "Newest") {

      return dateB - dateA;

    }

    return dateA - dateB;

  });
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

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

              <h2 className="text-3xl font-bold">

              Student Complaints

            </h2>

            <div className="flex items-center gap-4">

              <select
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(e.target.value)
                }
                className="border rounded-xl px-4 py-2 bg-white"
              >

                <option value="All">
                  All Categories
                </option>

                <option value="Electrical & Internet">
                  Electrical & Internet
                </option>

                <option value="Bathroom & Washroom">
                  Bathroom & Washroom
                </option>

                <option value="Mess">
                  Mess
                </option>

                <option value="Theft">
                  Theft
                </option>

                <option value="Bullying and Ragging">
                  Bullying and Ragging
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

              <button
                onClick={() =>
                  setSortOrder(
                    sortOrder === "Newest"
                      ? "Oldest"
                      : "Newest"
                  )
                }
                className="bg-white border border-orange-300 text-orange-500 px-4 py-2 rounded-xl hover:bg-orange-50 transition"
              >

                {sortOrder === "Newest"
                  ? "⬇ Newest First"
                  : "⬆ Oldest First"}

              </button>

              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-xl font-medium">

                {displayComplaints.length} Complaints

              </span>

            </div>

            </div>

            <div className="space-y-5">

              {displayComplaints.map((item) => (

                <div
                  key={item.id}
                  className={`rounded-3xl shadow p-6 transition ${
                    item.category === "Bullying and Ragging"
                      ? "border-2 border-red-500 bg-red-50"
                      : "bg-white"
                  }`}
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

                        {item.category === "Bullying and Ragging" && (
                          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                            HIGH PRIORITY
                          </span>
                        )}

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
