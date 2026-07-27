import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentNotices() {
  const navigate = useNavigate();

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost/DormDesk/backend/notices/get_notices.php")
      .then((res) => res.json())
      .then((data) => {
  if (data.success) {
    setNotices(data.notices);
  }

  setLoading(false);
})
      .catch((error) => {
        console.error("Error fetching notices:", error);
        setLoading(false);
      });
  }, []);

  return (
    <section className="min-h-screen bg-gray-100 p-6 md:p-8">

      {/* Back Button */}
      <button
        onClick={() => navigate("/student-dashboard")}
        className="mb-5 bg-white border border-orange-500 text-orange-500 px-5 py-2 rounded-xl hover:bg-orange-50 transition"
      >
        ← Back to Dashboard
      </button>

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-3xl p-8 shadow-lg mb-8">
        <h1 className="text-4xl font-bold">
          Hostel Notices 📢
        </h1>

        <p className="mt-2 text-orange-100">
          Stay updated with the latest hostel announcements.
        </p>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="bg-white rounded-3xl p-8 shadow-md text-center">
          <p className="text-gray-500 text-lg">
            Loading notices...
          </p>
        </div>
      ) : notices.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 shadow-md text-center">
          <p className="text-gray-500 text-lg">
            No notices available.
          </p>
        </div>
      ) : (
        <div className="space-y-6">

          {notices.map((notice) => (
            <div
              key={notice.id}
              className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-start flex-wrap gap-3 mb-3">

                <h2 className="text-xl font-bold text-gray-800">
                  {notice.title}
                </h2>

               <span className="text-sm text-gray-500">
  {new Date(notice.created_at).toLocaleString([], {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  })}
</span>

              </div>

              <p className="text-gray-600 leading-7">
                {notice.description}
              </p>

            </div>
          ))}

        </div>
      )}

    </section>
  );
}

export default StudentNotices;