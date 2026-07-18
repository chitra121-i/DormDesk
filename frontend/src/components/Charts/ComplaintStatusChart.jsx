import { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

function ComplaintStatusChart() {

  const [data, setData] = useState([]);

  const COLORS = [
    "#f59e0b",
    "#3b82f6",
    "#22c55e",
  ];

  const loadStatusData = async () => {

    try {

      const response = await fetch(
        "http://localhost/hostel_api/complaints/get_complaint_status.php"
      );

      const result =
        await response.json();

      if (result.success) {

        setData(result.data);

      }

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    loadStatusData();

  }, []);

  const pendingCount =
    data.find(
      (item) => item.name === "Pending"
    )?.value || 0;

  const workingCount =
    data.find(
      (item) => item.name === "Working"
    )?.value || 0;

  const resolvedCount =
    data.find(
      (item) => item.name === "Resolved"
    )?.value || 0;

  return (

    <div className="bg-white p-6 rounded-3xl shadow">

      <div className="flex justify-between items-center mb-4">

        <h2 className="text-xl font-bold">
          Complaint Status
        </h2>

        <span className="text-sm text-gray-500">
          Live Data
        </span>

      </div>

      <div className="h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={3}
            >

              {data.map(
                (entry, index) => (

                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                        COLORS.length
                      ]
                    }
                  />

                )
              )}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="grid grid-cols-3 gap-4 mt-4 text-center">

        <div>

          <p className="text-yellow-500 font-bold">
            {pendingCount}
          </p>

          <p className="text-sm text-gray-500">
            Pending
          </p>

        </div>

        <div>

          <p className="text-blue-500 font-bold">
            {workingCount}
          </p>

          <p className="text-sm text-gray-500">
            Working
          </p>

        </div>

        <div>

          <p className="text-green-500 font-bold">
            {resolvedCount}
          </p>

          <p className="text-sm text-gray-500">
            Resolved
          </p>

        </div>

      </div>

    </div>

  );
}

export default ComplaintStatusChart;