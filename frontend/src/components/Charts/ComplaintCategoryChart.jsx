import { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

function ComplaintCategoryChart() {

  const [data, setData] = useState([]);

  const COLORS = [
    "#f97316",
    "#ea580c",
    "#fb923c",
    "#fdba74",
    "#fed7aa",
    "#ffedd5",
  ];

  const loadCategoryData = async () => {

    try {

      const response = await fetch(
        "http://localhost/DormDesk/backend/complaints/get_complaint_categories.php"
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

    loadCategoryData();

  }, []);

  return (

    <div className="bg-white p-6 rounded-3xl shadow">

      <div className="flex justify-between items-center mb-4">

        <h2 className="text-xl font-bold">
          Complaint Categories
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

      <div className="grid grid-cols-2 gap-3 mt-4">

        {data.map((item) => (

          <div
            key={item.name}
            className="flex justify-between bg-orange-50 px-4 py-2 rounded-xl"
          >

            <span className="text-gray-700">
              {item.name}
            </span>

            <span className="font-semibold text-orange-500">
              {item.value}
            </span>

          </div>

        ))}

      </div>

    </div>

  );
}

export default ComplaintCategoryChart;