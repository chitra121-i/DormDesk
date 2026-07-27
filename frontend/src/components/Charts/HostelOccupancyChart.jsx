import { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

function HostelOccupancyChart() {

  const [capacity, setCapacity] = useState(0);
  const [living, setLiving] = useState(0);
  const [present, setPresent] = useState(0);

  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

    try {

      const response = await fetch(
        "http://localhost/DormDesk/backend/charts/get_hostel_occupancy.php"
      );

      const data = await response.json();

      if (data.success) {

        setCapacity(Number(data.capacity));
        setLiving(Number(data.living));
        setPresent(Number(data.present));

      }

    } catch (error) {

      console.log(error);

    }

  };

  const outerRing = [
    {
      name: "Capacity",
      value: capacity,
    },
  ];

  const middleRing = [
    {
      name: "Living",
      value: living,
    },
    {
      name: "Remaining",
      value: Math.max(capacity - living, 0),
    },
  ];

  const innerRing = [
    {
      name: "Present",
      value: present,
    },
    {
      name: "Remaining",
      value: Math.max(capacity - present, 0),
    },
  ];

  return (

    <div className="bg-white p-6 rounded-3xl shadow">

      <h2 className="text-xl font-bold mb-4">
        Hostel Occupancy
      </h2>

      <div className="h-80 relative">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={outerRing}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={110}
              innerRadius={95}
            >
              <Cell fill="#fed7aa" />
            </Pie>

            <Pie
              data={middleRing}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={90}
              innerRadius={75}
            >
              <Cell fill="#f97316" />
              <Cell fill="#f3f4f6" />
            </Pie>

            <Pie
              data={innerRing}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={70}
              innerRadius={55}
            >
              <Cell fill="#ea580c" />
              <Cell fill="#f3f4f6" />
            </Pie>

          </PieChart>

        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center">

          <h2 className="text-3xl font-bold text-orange-500">
            {present}
          </h2>

          <p className="text-gray-500">
            Present Now
          </p>

        </div>

      </div>

      <div className="grid grid-cols-3 gap-4 mt-4 text-center">

        <div>

          <p className="text-gray-500 text-sm">
            Capacity
          </p>

          <p className="font-bold">
            {capacity}
          </p>

        </div>

        <div>

          <p className="text-gray-500 text-sm">
            Living
          </p>

          <p className="font-bold">
            {living}
          </p>

        </div>

        <div>

          <p className="text-gray-500 text-sm">
            Present
          </p>

          <p className="font-bold">
            {present}
          </p>

        </div>

      </div>

    </div>

  );
}

export default HostelOccupancyChart;