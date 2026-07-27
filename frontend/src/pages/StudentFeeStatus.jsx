import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function StudentFeeStatus() {
  const student =
  JSON.parse(localStorage.getItem("student")) || {};
const [fees, setFees] = useState([]);
const navigate = useNavigate();

 useEffect(() => {

  fetch(
    `http://localhost/DormDesk/backend/fees/get_student_fee.php?student_id=${student.id}`
  )
    .then((res) => res.json())
    .then((data) => {

      if (data.success) {
        setFees(data.fees);
      }

    })
    .catch((err) => console.log(err));

}, []);
const totalFee = fees.reduce(
  (sum, fee) => sum + Number(fee.total_fee),
  0
);

const paidFee = fees.reduce(
  (sum, fee) => sum + Number(fee.paid_fee),
  0
);

const pendingFee = fees.reduce(
  (sum, fee) => sum + Number(fee.pending_fee),
  0
);
  
  return (
    <section className="min-h-screen bg-gray-100 p-6 md:p-8">

      {/* Back Button */}
      <button
        onClick={() => navigate("/student-dashboard")}
        className="mb-6 bg-white border border-orange-500 text-orange-500 px-5 py-2 rounded-xl hover:bg-orange-50"
      >
        ← Back to Dashboard
      </button>

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white p-8 rounded-3xl shadow-lg mb-8">

        <h1 className="text-4xl font-bold">
          Fee Status
        </h1>

        <p className="mt-2 text-orange-100">
          View your hostel fee payment details
        </p>

      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-6 rounded-3xl shadow">
          <p className="text-gray-500">Total Fees</p>
          <h2 className="text-3xl font-bold text-orange-500 mt-2">
         ₹{totalFee.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow">
          <p className="text-gray-500">Paid Amount</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">
          ₹{paidFee.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow">
          <p className="text-gray-500">Pending Amount</p>
          <h2 className="text-3xl font-bold text-red-500 mt-2">
          ₹{pendingFee.toLocaleString()}
          </h2>
        </div>

      </div>

      {/* Fee Table */}
      <div className="bg-white rounded-3xl shadow overflow-hidden">

        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">
            Fee Records
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-orange-500 text-white">

              <tr>
                <th className="p-4 text-left">Semester</th>
                <th className="p-4 text-left">Total Fee</th>
                <th className="p-4 text-left">Paid</th>
                <th className="p-4 text-left">Pending</th>
                <th className="p-4 text-left">Due Date</th>
                <th className="p-4 text-left">Status</th>
              </tr>

            </thead>

            <tbody>

             {fees.map((fee) => (

<tr
  key={fee.id}
  className="border-b hover:bg-gray-50"
>

  <td className="p-4">
    {fee.semester}
  </td>

  <td className="p-4 font-medium">
    ₹{Number(fee.total_fee).toLocaleString()}
  </td>

  <td className="p-4 text-green-600 font-semibold">
    ₹{Number(fee.paid_fee).toLocaleString()}
  </td>

  <td className="p-4 text-red-500 font-semibold">
    ₹{Number(fee.pending_fee).toLocaleString()}
  </td>

  <td className="p-4">
    {new Date(fee.due_date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })}
  </td>

  <td className="p-4">

    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        fee.status === "Paid"
          ? "bg-green-100 text-green-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
    >
      {fee.status}
    </span>

  </td>

</tr>

))}

            </tbody>

          </table>

        </div>

      </div>

    </section>
  );
}

export default StudentFeeStatus;