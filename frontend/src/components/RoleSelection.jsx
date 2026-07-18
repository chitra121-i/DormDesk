import { useNavigate } from "react-router-dom";
function RoleSelection() {
    const navigate = useNavigate();
  return (
    <section id="about" className="w-full bg-white py-24">
      
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <div className="text-center mb-16">
          
          <p className="text-orange-500 font-semibold text-lg mb-4">
            Access Portals
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
            Choose Your Portal
          </h2>

          <p className="text-gray-600 text-lg mt-6 max-w-3xl mx-auto leading-8">
            Separate portals are available for students and wardens
            to ensure secure access and efficient hostel management.
          </p>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Student Card */}
          <div className="bg-orange-50 border border-orange-100 rounded-3xl p-10 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            
            {/* Icon */}
            <div className="w-20 h-20 bg-orange-500 rounded-2xl flex items-center justify-center text-white text-4xl mb-8">
              🎓
            </div>

            {/* Title */}
            <h3 className="text-3xl font-bold text-gray-800 mb-5">
              Student Portal
            </h3>

            {/* Description */}
            <p className="text-gray-600 leading-8 text-lg mb-8">
              Students can access notices, attendance records,
              complaints, room details and hostel-related updates through a secure dashboard.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-10">
              
              <div className="flex items-center gap-3">
                <span className="text-orange-500 text-xl">✔</span>
                <p className="text-gray-700">
                  Raise Complaints Online
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-orange-500 text-xl">✔</span>
                <p className="text-gray-700">
                  View Hostel Notices
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-orange-500 text-xl">✔</span>
                <p className="text-gray-700">
                  Track Fees
                </p>
              </div>

            </div>

            <button
  onClick={() => navigate("/student-login")}
  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg transition duration-300"
>
  Student Login
</button>
          </div>

          {/* Warden Card */}
          <div className="bg-white border-2 border-orange-200 rounded-3xl p-10 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            
            {/* Icon */}
            <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center text-4xl mb-8">
              🛡
            </div>

            {/* Title */}
            <h3 className="text-3xl font-bold text-gray-800 mb-5">
              Warden Portal
            </h3>

            {/* Description */}
            <p className="text-gray-600 leading-8 text-lg mb-8">
              Wardens can manage students, allocate rooms,
              monitor complaints, maintain attendance,
              and control hostel operations efficiently.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-10">
              
              <div className="flex items-center gap-3">
                <span className="text-orange-500 text-xl">✔</span>
                <p className="text-gray-700">
                  Manage Student Records
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-orange-500 text-xl">✔</span>
                <p className="text-gray-700">
                  Monitor Complaints & Requests
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-orange-500 text-xl">✔</span>
                <p className="text-gray-700">
                  Handle Notices & Attendance
                </p>
              </div>

            </div>

            {/* Button */}
           <button
  onClick={() => navigate("/warden-login")}
  className="w-full border-2 border-orange-500 text-orange-500 hover:bg-orange-50 py-4 rounded-2xl font-semibold text-lg transition duration-300"
>
  Warden Login
</button>
          </div>

        </div>

      </div>
    </section>
  );
}

export default RoleSelection;