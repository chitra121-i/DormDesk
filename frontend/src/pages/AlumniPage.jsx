import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function AlumniPage() {

  const [alumniStudents, setAlumniStudents] = useState([]);
  const [search, setSearch] = useState("");

  const [rejoinStudentId, setRejoinStudentId] =
    useState(null);

  const [selectedRoom, setSelectedRoom] =
    useState("");

  const loadAlumni = async () => {

    try {

      const response = await fetch(
        "http://localhost/DormDesk/backend/students/get_alumni.php"
      );

      const data = await response.json();

      if (data.success) {

        setAlumniStudents(data.students);

      }

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    loadAlumni();

  }, []);

  const autoSelectRoom = async () => {

    try {

      const response = await fetch(
        "http://localhost/DormDesk/backend/students/auto_assign_room.php"
      );

      const data = await response.json();

      if (data.success) {

        setSelectedRoom(data.room_no);

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log(error);

    }

  };

  const handleRejoin = async (student) => {

    if (!selectedRoom) {

      alert("Select Room First");
      return;

    }

    try {

      const response = await fetch(
        "http://localhost/DormDesk/backend/students/rejoin_student.php",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            id: student.id,
            room_no: selectedRoom,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      if (data.success) {

        setRejoinStudentId(null);
        setSelectedRoom("");

        loadAlumni();

      }

    } catch (error) {

      console.log(error);

    }

  };

  const filteredStudents =
    alumniStudents.filter(
      (student) =>
        student.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        student.roll_no
          .toLowerCase()
          .includes(search.toLowerCase())
    );

  return (

    <div className="flex bg-gray-100">

      <Sidebar />

      <div className="flex-1">

        <Topbar />

        <div className="p-8">

          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

            <div>

              <h1 className="text-3xl font-bold">

                Alumni Students

              </h1>

              <p className="text-gray-500 mt-1">

                Students who have left the hostel

              </p>

            </div>

            <div className="bg-white rounded-3xl shadow px-8 py-5">

              <p className="text-gray-500">

                Total Alumni

              </p>

              <h2 className="text-3xl font-bold text-orange-500">

                {alumniStudents.length}

              </h2>

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow p-6 mb-8">

            <input
              type="text"
              placeholder="Search by name or roll number"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border p-4 rounded-xl"
            />

          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {filteredStudents.map((student) => (

              <div
                key={student.id}
                className="bg-white rounded-3xl shadow p-6"
              >

                <div className="flex justify-between items-center mb-4">

                  <h3 className="text-xl font-bold text-orange-500">

                    {student.name}

                  </h3>

                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">

                    Left {student.left_at}

                  </span>

                </div>

                <div className="space-y-2 text-gray-700">

                  <p>
                    <strong>Roll No:</strong>{" "}
                    {student.roll_no}
                  </p>

                  <p>
                    <strong>Last Room:</strong>{" "}
                    {student.room_no}
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

                {rejoinStudentId === student.id ? (

                  <div className="mt-5 space-y-3 border-t pt-5">

                    <input
                      type="text"
                      value={selectedRoom}
                      onChange={(e) =>
                        setSelectedRoom(
                          e.target.value
                        )
                      }
                      placeholder="Enter Room Number"
                      className="w-full border p-3 rounded-xl"
                    />

                    <button
                      onClick={autoSelectRoom}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl"
                    >

                      Auto Select Room

                    </button>

                    <button
                      onClick={() =>
                        handleRejoin(student)
                      }
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl"
                    >

                      Confirm Rejoin

                    </button>

                    <button
                      onClick={() => {

                        setRejoinStudentId(
                          null
                        );

                        setSelectedRoom("");

                      }}
                      className="w-full bg-gray-300 py-3 rounded-xl"
                    >

                      Cancel

                    </button>

                  </div>

                ) : (

                  <button
                    onClick={() =>
                      setRejoinStudentId(
                        student.id
                      )
                    }
                    className="mt-5 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl"
                  >

                    Rejoin Hostel

                  </button>

                )}

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );
}

export default AlumniPage;