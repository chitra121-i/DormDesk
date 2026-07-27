import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";

import FloorOccupancyChart from "../components/Charts/FloorOccupancyChart";

function RoomsPage() {

  const [rooms, setRooms] = useState([]);

  const [roomNo, setRoomNo] = useState("");

  const [capacity, setCapacity] = useState("1");

  const loadRooms = async () => {

    try {

      const response = await fetch(
        "http://localhost/DormDesk/backend/rooms/get_rooms.php"
      );

      const data = await response.json();

      if (data.success) {
        setRooms(data.rooms);
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const addRoom = async () => {

    if (!roomNo.trim()) {
      alert("Enter Room Number");
      return;
    }

    const floorNo = parseInt(
      roomNo.toString().charAt(0)
    );

    try {

      const response = await fetch(
        "http://localhost/DormDesk/backend/rooms/add_room.php",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            room_no: roomNo,
            floor_no: floorNo,
            capacity: capacity,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      if (data.success) {

        setRoomNo("");
        setCapacity("1");

        loadRooms();
      }

    } catch (error) {

      console.log(error);
    }
  };

  const deleteRoom = async (roomNo) => {

    const confirmDelete = window.confirm(
      `Delete Room ${roomNo}?`
    );

    if (!confirmDelete) return;

    try {

      const response = await fetch(
        "http://localhost/DormDesk/backend/rooms/delete_room.php",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            room_no: roomNo,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      if (data.success) {
        loadRooms();
      }

    } catch (error) {

      console.log(error);
    }
  };

  const totalRooms = rooms.length;

  const totalBeds = rooms.reduce(
    (sum, room) => sum + room.capacity,
    0
  );

  const occupiedBeds = rooms.reduce(
    (sum, room) => sum + room.currentStudents,
    0
  );

  const availableBeds =
    totalBeds - occupiedBeds;

  return (
    <div className="flex bg-gray-100">

      <Sidebar />

      <div className="flex-1">

        <Topbar />

        <div className="p-8 space-y-8">

          <div className="grid md:grid-cols-4 gap-6">

            <StatCard
              title="Total Rooms"
              value={totalRooms}
            />

            <StatCard
              title="Total Beds"
              value={totalBeds}
            />

            <StatCard
              title="Occupied Beds"
              value={occupiedBeds}
            />

            <StatCard
              title="Available Beds"
              value={availableBeds}
            />

          </div>

          <FloorOccupancyChart />

          <div className="bg-white rounded-3xl p-6 shadow">

            <h2 className="text-2xl font-bold mb-5">
              Add Room
            </h2>

            <div className="grid md:grid-cols-3 gap-4">

              <input
                value={roomNo}
                onChange={(e) =>
                  setRoomNo(e.target.value)
                }
                placeholder="Room Number"
                className="border p-3 rounded-xl"
              />

              <select
                value={capacity}
                onChange={(e) =>
                  setCapacity(e.target.value)
                }
                className="border p-3 rounded-xl"
              >
                <option value="1">
                  1 Student
                </option>

                <option value="2">
                  2 Students
                </option>

                <option value="3">
                  3 Students
                </option>
              </select>

              <button
                onClick={addRoom}
                className="bg-orange-500 text-white rounded-xl"
              >
                Add Room
              </button>

            </div>

          </div>

          <div>

            <h2 className="text-2xl font-bold mb-5">
              All Rooms
            </h2>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

              {rooms.map((room) => (

                <div
                  key={room.roomNo}
                  className="bg-white rounded-3xl shadow p-6"
                >

                  <div className="flex justify-between items-center mb-4">

                    <h3 className="text-2xl font-bold text-orange-500">
                      Room {room.roomNo}
                    </h3>

                    <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
                      {room.currentStudents}/
                      {room.capacity}
                    </span>

                  </div>

                  <p className="text-gray-600">
                    Capacity: {room.capacity}
                  </p>

                  <p className="text-gray-600 mb-4">
                    Occupied: {room.currentStudents}
                    /{room.capacity}
                  </p>

                  <h4 className="font-semibold mb-2">
                    Students
                  </h4>

                  {room.students.length > 0 ? (

                    <ul className="space-y-2 mb-4">

                      {room.students.map(
                        (student) => (

                          <li
                            key={student}
                            className="bg-orange-50 px-3 py-2 rounded-xl"
                          >
                            {student}
                          </li>

                        )
                      )}

                    </ul>

                  ) : (

                    <p className="text-gray-400 mb-4">
                      No students assigned
                    </p>

                  )}

                  <button
                    onClick={() =>
                      deleteRoom(room.roomNo)
                    }
                    className="w-full bg-red-500 text-white py-2 rounded-xl"
                  >
                    Delete Room
                  </button>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default RoomsPage;