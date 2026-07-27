import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

function FloorOccupancyChart() {

  const [data, setData] = useState([]);

  const loadData = async () => {

    try {

      const response = await fetch(
        "http://localhost/DormDesk/backend/charts/get_floor_occupancy.php"
      );

      const result = await response.json();

      if(result.success){

        setData(result.data);

      }

    } catch(error){

      console.log(error);

    }

  };

  useEffect(() => {

    loadData();

  }, []);

  return (

    <div className="bg-white p-6 rounded-3xl shadow">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-xl font-bold">
          Floor Occupancy
        </h2>

        <span className="text-sm text-gray-500">
          Current Hostel Population
        </span>

      </div>

      <div className="h-96">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="floor" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="capacity"
              fill="#fed7aa"
              name="Capacity"
              radius={[8, 8, 0, 0]}
            />

            <Bar
              dataKey="occupied"
              fill="#f97316"
              name="Occupied"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">

        {data.map((floor) => (

          <div
            key={floor.floor}
            className="bg-orange-50 rounded-2xl p-4 text-center"
          >

            <h3 className="font-semibold text-gray-800">
              Floor {floor.floor}
            </h3>

            <p className="text-orange-500 font-bold mt-2">
              {floor.occupied}/{floor.capacity}
            </p>

            <p className="text-sm text-gray-500">
              Students
            </p>

          </div>

        ))}

      </div>

    </div>

  );
}

export default FloorOccupancyChart;