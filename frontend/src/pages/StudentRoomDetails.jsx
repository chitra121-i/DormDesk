import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentRoomDetails() {
  const navigate = useNavigate();

  const [rules, setRules] = useState([]);
  const [loadingRules, setLoadingRules] = useState(true);

  const [roomData, setRoomData] = useState(null);
  const [loadingRoom, setLoadingRoom] = useState(true);

  useEffect(() => {

    fetch(
      "http://localhost/DormDesk/backend/rules/get_rules.php"
    )

      .then((response) => response.json())

      .then((data) => {

        if (data.success) {

          setRules(data.rules);

        }

        setLoadingRules(false);

      })

      .catch((error) => {

        console.log(
          "Error loading hostel rules:",
          error
        );

        setLoadingRules(false);

      });

  }, []);

  useEffect(() => {

      const student = JSON.parse(
          localStorage.getItem("student")
      );

      if (!student) {
          setLoadingRoom(false);
          return;
      }

      fetch(
          `http://localhost/DormDesk/backend/rooms/get_student_room_details.php?student_id=${student.id}`
      )

          .then(res => res.json())

          .then(data => {

              if (data.success) {

                  setRoomData(data);

              }

              setLoadingRoom(false);

          })

          .catch(error => {

              console.log(error);

              setLoadingRoom(false);

          });

  }, []);

  if (loadingRoom) {

      return (

          <div className="min-h-screen flex justify-center items-center text-xl font-semibold">

              Loading Room Details...

          </div>

      );

  }

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

      {/* LEFT COLUMN */}
      <div className="lg:col-span-2 flex flex-col gap-8">

        {/* Room Information */}
        <div className="bg-white rounded-3xl shadow-md p-8">

          <h2 className="text-2xl font-bold mb-6">
            Room Information
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <div className="bg-orange-50 p-5 rounded-2xl">
              <p className="text-gray-500 text-sm">
                Room Number
              </p>

              <h3 className="text-2xl font-bold text-orange-500 mt-2">
                {roomData?.room.room_no}
              </h3>
            </div>

            <div className="bg-orange-50 p-5 rounded-2xl">
              <p className="text-gray-500 text-sm">
                Floor
              </p>

              <h3 className="text-2xl font-bold text-orange-500 mt-2">
                {roomData?.room.floor_no}
                {roomData?.room.floor_no === 1
                  ? "st"
                  : roomData?.room.floor_no === 2
                  ? "nd"
                  : roomData?.room.floor_no === 3
                  ? "rd"
                  : "th"}{" "}
                Floor
              </h3>
            </div>

            <div className="bg-orange-50 p-5 rounded-2xl">
              <p className="text-gray-500 text-sm">
                Capacity
              </p>

              <h3 className="text-2xl font-bold text-orange-500 mt-2">
                {roomData?.room.capacity} Students
              </h3>
            </div>

            <div className="bg-orange-50 p-5 rounded-2xl">
              <p className="text-gray-500 text-sm">
                Occupied
              </p>

              <h3 className="text-2xl font-bold text-orange-500 mt-2">
                {roomData?.room.current_students} Students
              </h3>
            </div>

          </div>

        </div>

        {/* Roommates */}
        <div className="bg-white rounded-3xl shadow-md p-8">

          <h2 className="text-2xl font-bold mb-6">
            Roommates
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            {roomData?.roommates.map((roommate) => (

              <div
                key={roommate.id}
                className="bg-gray-50 p-5 rounded-2xl hover:shadow-md transition"
              >

                <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3">

                  {roommate.name.charAt(0).toUpperCase()}

                </div>

                <h3 className="font-semibold text-lg">

                  {roommate.name}

                  {Number(roommate.id) === Number(roomData.student.id) && (
                    <span className="text-orange-500 ml-2">
                      (You)
                    </span>
                  )}

                </h3>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* RIGHT COLUMN */}
      <div className="bg-white rounded-3xl shadow-md p-8 h-fit">

        <h2 className="text-2xl font-bold mb-6">
          Furniture Available
        </h2>

        <div className="space-y-4">

          <div className="flex justify-between items-center bg-orange-50 p-4 rounded-xl">
            <span>🛏 Beds</span>
            <span className="font-bold text-orange-500">
              {roomData?.room.current_students}
            </span>
          </div>

          <div className="flex justify-between items-center bg-orange-50 p-4 rounded-xl">
            <span>🛏 Mattresses</span>
            <span className="font-bold text-orange-500">
              {roomData?.room.current_students}
            </span>
          </div>

          <div className="flex justify-between items-center bg-orange-50 p-4 rounded-xl">
            <span>🪑 Study Tables</span>
            <span className="font-bold text-orange-500">
              {roomData?.room.current_students}
            </span>
          </div>

          <div className="flex justify-between items-center bg-orange-50 p-4 rounded-xl">
            <span>🪑 Chairs</span>
            <span className="font-bold text-orange-500">
              {roomData?.room.current_students}
            </span>
          </div>

          <div className="flex justify-between items-center bg-orange-50 p-4 rounded-xl">
            <span>🚪 Almirahs</span>
            <span className="font-bold text-orange-500">
              {roomData?.room.current_students}
            </span>
          </div>

          <div className="flex justify-between items-center bg-orange-50 p-4 rounded-xl">
            <span>🌀 Ceiling Fans</span>
            <span className="font-bold text-orange-500">
              1
            </span>
          </div>

          <div className="flex justify-between items-center bg-orange-50 p-4 rounded-xl">
            <span>💡 Tube Lights</span>
            <span className="font-bold text-orange-500">
              1
            </span>
          </div>

        </div>

      </div>

    </div>

      {/* Hostel Rules */}

      <div className="bg-white rounded-3xl shadow-md p-8 mt-8">

        <h2 className="text-2xl font-bold mb-6">
          Hostel Rules
        </h2>


        {loadingRules ? (

          <p className="text-gray-500">

            Loading rules...

          </p>

        ) : rules.length === 0 ? (

          <p className="text-gray-500">

            No hostel rules have been added yet.

          </p>

        ) : (

          <div className="space-y-4">

            {rules.map((rule, index) => (

              <div

                key={rule.id}

                className="bg-orange-50 p-4 rounded-xl flex items-start gap-3"

              >

                <span className="font-bold text-orange-500">

                  {index + 1}.

                </span>


                <span className="text-gray-700">

                  {rule.rule_text}

                </span>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}

export default StudentRoomDetails;