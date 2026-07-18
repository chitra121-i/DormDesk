import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import HostelOccupancyChart from "../components/Charts/HostelOccupancyChart";

function StudentsPage() {

  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const loadStudents = async () => {

    try {

      const response = await fetch(
        "http://localhost/hostel_api/students/get_students.php"
      );

      const data = await response.json();

      if (data.success) {
        setStudents(
          data.students.sort((a, b) =>
            a.name.localeCompare(b.name)
          )
        );
      }

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    loadStudents();

  }, []);

  const autoSelectRoom = async () => {

    try {

      const response = await fetch(
        "http://localhost/hostel_api/students/auto_assign_room.php"
      );

      const data = await response.json();

      if (data.success) {

        setRoomNo(data.room_no);

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log(error);

    }

  };

  const clearForm = () => {

    setName("");
    setRollNo("");
    setPhone("");
    setEmail("");
    setRoomNo("");

    setIsEditing(false);
    setEditingId(null);

  };

  const addStudent = async () => {

    if (
      !name ||
      !rollNo ||
      !phone ||
      !email ||
      !roomNo
    ) {
      alert("Fill All Fields");
      return;
    }

    try {

      const response = await fetch(
        "http://localhost/hostel_api/students/add_student.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            roll_no: rollNo,
            phone,
            email,
            room_no: roomNo,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      if (data.success) {

        setName("");
        setRollNo("");
        setPhone("");
        setEmail("");
        setRoomNo("");

        loadStudents();

      }

    } catch (error) {

      console.log(error);

    }

  };

  const startEdit = (student) => {

    setEditingId(student.id);

    setName(student.name);
    setRollNo(student.roll_no);
    setPhone(student.phone);
    setEmail(student.email);
    setRoomNo(student.room_no);

    setIsEditing(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  const updateStudent = async () => {

    try {

      const response = await fetch(
        "http://localhost/hostel_api/students/update_student.php",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            id: editingId,
            name,
            roll_no: rollNo,
            phone,
            email,
            room_no: roomNo,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      if (data.success) {

        clearForm();

        loadStudents();

      }

    } catch (error) {

      console.log(error);

    }

  };

  const removeStudent = async (id) => {

    const confirmRemove = window.confirm(
      "Move Student To Alumni?"
    );

    if (!confirmRemove) return;

    try {

      const response = await fetch(
        "http://localhost/hostel_api/students/remove_student.php",
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

        loadStudents();

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

          {/* Top Section */}

          <div className="grid lg:grid-cols-3 gap-6">

            {/* Add Student */}

            <div className="bg-white rounded-3xl p-6 shadow">

              <h2 className="text-2xl font-bold mb-6">

                {isEditing
                  ? "Edit Student"
                  : "Add Student"}

              </h2>

              <div className="space-y-4">

                <input
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Student Name"
                  className="border p-3 rounded-xl w-full"
                />

                <input
                  value={rollNo}
                  onChange={(e) =>
                    setRollNo(e.target.value)
                  }
                  placeholder="Roll Number"
                  className="border p-3 rounded-xl w-full"
                />

                <input
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  placeholder="Phone Number"
                  className="border p-3 rounded-xl w-full"
                />

                <input
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Email Address"
                  className="border p-3 rounded-xl w-full"
                />

                <div className="grid grid-cols-3 gap-3">

                  <input
                    value={roomNo}
                    onChange={(e) =>
                      setRoomNo(e.target.value)
                    }
                    placeholder="Room Number"
                    className="col-span-2 border p-3 rounded-xl"
                  />

                  <button
                    type="button"
                    onClick={autoSelectRoom}
                    className="bg-orange-100 text-orange-600 rounded-xl font-medium hover:bg-orange-200 transition"
                  >

                    Auto Select

                  </button>

                </div>

                <button
                  onClick={
                    isEditing
                      ? updateStudent
                      : addStudent
                  }
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
                >

                  {isEditing
                  ? "Update Student"
                  : "Add Student"}

                </button>

              </div>

            </div>

            {/* Hostel Occupancy */}

            <div className="lg:col-span-2">

              <div className="bg-white rounded-3xl shadow p-4 h-full">

                <HostelOccupancyChart />

              </div>

            </div>

          </div>

          {/* Student List */}

          <div>

            <div className="flex items-center justify-between mb-5">

              <h2 className="text-2xl font-bold">

                All Students

              </h2>

              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-xl font-medium">

                {students.length} Students

              </span>

            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

              {students.map((student) => (

                <div
                  key={student.id}
                  className="bg-white rounded-3xl shadow p-6 hover:shadow-lg transition"
                >

                  <div className="flex justify-between items-center mb-4">

                    <h3 className="text-xl font-bold text-orange-500">

                      {student.name}

                    </h3>

                    <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">

                      Room {student.room_no}

                    </span>

                  </div>

                  <div className="space-y-2 text-gray-700">

                    <p>

                      <strong>Roll No:</strong>{" "}
                      {student.roll_no}

                    </p>

                    <p>

                      <strong>Phone:</strong>{" "}
                      {student.phone}

                    </p>

                    <p>

                      <strong>Email:</strong>{" "}
                      {student.email}

                    </p>

                  </div>

                  <div className="flex gap-3 mt-5">

                    <button
                      onClick={() => startEdit(student)}
                      className="flex-1 bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        removeStudent(student.id)
                      }
                      className="flex-1 border border-red-500 text-red-500 py-2 rounded-xl hover:bg-red-50 transition"
                    >

                      Remove

                    </button>

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

export default StudentsPage;