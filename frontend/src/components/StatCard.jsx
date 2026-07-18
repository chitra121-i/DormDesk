function StatCard({
  title,
  value,
  icon
}) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow hover:shadow-xl transition">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-orange-500 mt-2">
            {value}
          </h2>

        </div>

        <div className="text-4xl">
          {icon}
        </div>

      </div>

    </div>
  );
}

export default StatCard;