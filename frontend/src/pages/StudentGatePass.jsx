import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StudentGatePass() {
  const navigate = useNavigate();
const student = JSON.parse(localStorage.getItem("student"));
  const [requests, setRequests] = useState([]);

  const [fromDate, setFromDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toDate, setToDate] = useState("");
  const [toTime, setToTime] = useState("");
  const [reason, setReason] = useState("");

  const loadGatepasses = async () => {

  try {

    const response = await fetch(
      `http://localhost/hostel_api/gatepasses/get_student_gatepasses.php?student_id=${student.id}`
    );

    const data = await response.json();

    console.log("Gatepasses API:", data);

    if (data.success) {
      setRequests(data.gatepasses);
    }

  } catch (error) {

    console.error("Load Error:", error);

  }

};
useEffect(() => {

    loadGatepasses();
}, []);
const handleSubmit = async (e) => {
  e.preventDefault();

   if (
  !fromDate ||
  !fromTime ||
  !toDate ||
  !toTime
  ) {
    alert(
      "Out Date, Out Time, Return Date, Return Time and Reason are mandatory."
    );
    return;
  }

  const outDateTime = new Date(
    `${fromDate}T${fromTime}`
  );

  const returnDateTime = new Date(
    `${toDate}T${toTime}`
  );

  if (returnDateTime <= outDateTime) {
    alert(
      "Return date and time must be later than Out date and time."
    );
    return;
  }

  try {

    const response = await fetch(
      "http://localhost/hostel_api/gatepasses/apply_gatepass.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_id: student.id,
          reason,
          out_date: fromDate,
          out_time: fromTime,
          return_date: toDate,
          return_time: toTime,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {

      alert("Gatepass Submitted Successfully");

      setFromDate("");
      setFromTime("");
      setToDate("");
      setToTime("");
      setReason("");

      loadGatepasses();

    } else {

      alert(data.message);

    }

  } catch (error) {

    console.error(error);
    alert("Server Error");

  }
};
console.log("Requests State:", requests);
  return (
    <section className="min-h-screen bg-gray-100 p-6 md:p-8">

      {/* Back Button */}
      <button
        onClick={() => navigate("/student-dashboard")}
        className="mb-5 bg-white border border-orange-500 text-orange-500 px-5 py-2 rounded-xl hover:bg-orange-50 transition"
      >
        ← Back to Dashboard
      </button>

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-3xl p-8 shadow-lg mb-8">

        <h1 className="text-4xl font-bold">
          Gate Pass Request 🚪
        </h1>

        <p className="text-orange-100 mt-2">
          Apply for permission to leave the hostel
        </p>

      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-md p-8">

          <h2 className="text-2xl font-bold mb-6">
            New Request
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <div>
                <label className="font-medium">
                Out Date
              </label>
            
          <input
          type="date"
          required
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="w-full border p-3 rounded-xl mt-2"
          />
            </div>

            <div>
              <label className="font-medium">
                Out Time
              </label>

             <input
             type="time"
             required
             value={fromTime}
             onChange={(e) => setFromTime(e.target.value)}
             className="w-full border p-3 rounded-xl mt-2"
            />
            </div>

            <div>
              <label className="font-medium">
                Return Date
              </label>

            <input
             type="date"
            required
            min={fromDate}
            value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="w-full border p-3 rounded-xl mt-2"
          />
            </div>

            <div>
              <label className="font-medium">
                Return Time
              </label>

             <input
  type="time"
  required
  value={toTime}
  onChange={(e) => setToTime(e.target.value)}
  className="w-full border p-3 rounded-xl mt-2"
/>
            </div>

            <div>
              <label className="font-medium">
                Reason
              </label>

              <textarea
                rows="4"
                placeholder="Enter reason"
                value={reason}
                onChange={(e) =>
                  setReason(e.target.value)
                }
                className="w-full border p-3 rounded-xl mt-2"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold"
            >
              Submit Request
            </button>

          </form>

        </div>

        {/* History */}
        <div className="bg-white rounded-3xl shadow-md p-8">

          <h2 className="text-2xl font-bold mb-6">
            My Requests
          </h2>

          {requests.length === 0 ? (
            <div className="text-gray-500">
              No gate pass requests found.
            </div>
          ) : (
            <div className="space-y-4">

              {requests.map((request) => (
                <div
                  key={request.id}
                  className="border rounded-2xl p-4"
                >

                 <div className="flex justify-between items-center">

  <h3 className="font-bold">
    Gate Pass Request
  </h3>

  <span
    className={`font-semibold ${
      request.status === "Approved"
        ? "text-green-600"
        : request.status === "Rejected"
        ? "text-red-600"
        : "text-yellow-500"
    }`}
  >
    {request.status}
  </span>

</div>

                  <p className="text-sm text-gray-500 mt-2">
 <h3> Out: {request.out_date} </h3>
 <h3>Time: {request.out_time}</h3>
</p>

                 <p className="mt-3 text-gray-700">
  <strong>Reason:</strong> {request.reason}
 </p>
{request.status === "Rejected" &&
 request.rejection_reason && (
  <div className="mt-3 bg-red-50 border border-red-200 rounded-xl p-3">
    <p className="font-semibold text-red-600">
      Rejection Reason
    </p>

    <p className="text-red-500">
      {request.rejection_reason}
    </p>
  </div>
)}
                </div>
              ))}

            </div>
          )}

        </div>

      </div>

    </section>
  );
}

export default StudentGatePass;