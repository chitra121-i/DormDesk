import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StudentComplaints() {

  const navigate = useNavigate();

  const student =
    JSON.parse(localStorage.getItem("student")) || {};

  const [complaints, setComplaints] = useState([]);

  const [category, setCategory] = useState("Electrical");

  const [description, setDescription] = useState("");

  const loadComplaints = async () => {

  try {

    const response = await fetch(
      `http://localhost/hostel_api/complaints/get_student_complaints.php?student_id=${student.id}`
    );

    const data = await response.json();

    if (data.success) {

      setComplaints(data.complaints);

    }

  } catch (error) {

    console.error(error);

  }

};
  useEffect(() => {

    loadComplaints();

  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost/hostel_api/complaints/add_complaint.php",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            student_id: student.id,

            category,

            description,

          }),

        }
      );

      const data = await response.json();

      if (data.success) {

        alert("Complaint submitted successfully.");

        setCategory("Electrical");

        setDescription("");

        loadComplaints();

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log(error);

      alert("Server Error");

    }

  };

  return (

    <section className="min-h-screen bg-gray-100 p-6 md:p-10">

      {/* Back Button */}

      <button

        onClick={() => navigate("/student-dashboard")}

        className="mb-6 bg-white border border-orange-500 text-orange-500 px-5 py-2 rounded-xl hover:bg-orange-50"

      >

        ← Back to Dashboard

      </button>

      {/* Header */}

      <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-3xl shadow-lg p-8 mb-8">

        <h1 className="text-4xl font-bold">

          Complaint Portal

        </h1>

        <p className="mt-2 text-orange-100">

          Submit complaints and track their progress.

        </p>

      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Complaint Form */}

        <div className="bg-white rounded-3xl shadow-md p-8">

          <h2 className="text-2xl font-bold mb-6">

            Submit Complaint

          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>

              <label className="block mb-2 font-medium text-gray-700">

                Category

              </label>

              <select

  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-orange-400"
>
  <option value="Electrical">Electrical</option>
  <option value="Bathroom and Washroom">Bathroom and Washroom</option>
  <option value="Theft">Theft</option>
  <option value="Mess and Food">Mess and Food</option>
  <option value="Internet">Internet</option>
  <option value="Other">Other</option>

              </select>

            </div>

            <div>

              <label className="block mb-2 font-medium text-gray-700">

                Complaint Description

              </label>

              <textarea

                rows="6"

                value={description}

                onChange={(e) => setDescription(e.target.value)}

                placeholder="Describe your issue in detail..."

                className="w-full border border-gray-300 rounded-xl p-3 resize-none focus:ring-2 focus:ring-orange-400"

                required

              />

            </div>

            <button

              type="submit"

              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold"

            >

              Submit Complaint

            </button>

          </form>

        </div>

        {/* Summary */}

        <div className="bg-white rounded-3xl shadow-md p-8">

          <h2 className="text-2xl font-bold mb-6">

            Complaint Summary

          </h2>

          <div className="grid grid-cols-3 gap-5">

            <div className="bg-yellow-50 rounded-2xl p-5 text-center">

              <h3 className="text-3xl font-bold text-yellow-600">

                {
                  complaints.filter(
                    c => c.status === "Pending"
                  ).length
                }

              </h3>

              <p className="mt-2 text-gray-600">

                Pending

              </p>

            </div>

            <div className="bg-blue-50 rounded-2xl p-5 text-center">

              <h3 className="text-3xl font-bold text-blue-600">

                {
                  complaints.filter(
                    c => c.status === "Working"
                  ).length
                }

              </h3>

              <p className="mt-2 text-gray-600">

                Working

              </p>

            </div>

            <div className="bg-green-50 rounded-2xl p-5 text-center">

              <h3 className="text-3xl font-bold text-green-600">

                {
                  complaints.filter(
                    c => c.status === "Resolved"
                  ).length
                }

              </h3>

              <p className="mt-2 text-gray-600">

                Resolved

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* My Complaints */}

      <div className="bg-white rounded-3xl shadow-md p-8 mt-8">

        <h2 className="text-2xl font-bold mb-6">

          My Complaints

        </h2>
        {complaints.length === 0 ? (

  <div className="text-center py-16">

    <div className="text-6xl mb-4">
      📭
    </div>

    <h3 className="text-2xl font-semibold text-gray-700">
      No Complaints Yet
    </h3>

    <p className="text-gray-500 mt-2">
      You haven't submitted any complaints.
    </p>

  </div>

) : (

  <div className="space-y-5">

    {complaints.map((complaint) => (

      <div
        key={complaint.id}
        className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-md transition"
      >

        {/* Top Row */}

        <div className="flex justify-between items-start flex-wrap gap-3">

          <div>

            <h3 className="text-xl font-bold text-gray-800">

              {complaint.category}

            </h3>

            <p className="text-sm text-gray-500 mt-1">

              Submitted on{" "}
              {new Date(
                complaint.created_at
              ).toLocaleDateString("en-IN", {

                day: "numeric",
                month: "short",
                year: "numeric",

              })}

            </p>

          </div>

          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold

            ${
              complaint.status === "Resolved"

                ? "bg-green-100 text-green-700"

                : complaint.status === "Working"

                ? "bg-blue-100 text-blue-700"

                : "bg-yellow-100 text-yellow-700"

            }`}
          >

            {complaint.status}

          </span>

        </div>

        {/* Description */}

        <div className="mt-5">

          <p className="text-gray-700 leading-7">

            {complaint.description}

          </p>

        </div>

        {/* Reply */}

        {complaint.reply && (

          <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">

            <h4 className="font-semibold text-green-700">

              Warden's Reply

            </h4>

            <p className="text-gray-700 mt-2">

              {complaint.reply}

            </p>

          </div>

        )}

      </div>

    ))}

  </div>

)}

      </div>

    </section>

  );

}

export default StudentComplaints;