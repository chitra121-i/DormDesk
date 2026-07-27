import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
function StudentLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const handleLogin = async (e) => {

  e.preventDefault();

  try {

    const response = await fetch(
      "http://localhost/DormDesk/backend/students/student_login.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      }
    );

    const data = await response.json();

    if(data.success){

      localStorage.setItem(
        "student",
        JSON.stringify(data.student)
      );

      navigate("/student-dashboard");

    }
    else{

      alert("Invalid Credentials");

    }

  }
  catch(error){

    console.error(error);
    alert("Server Error");

  }

};
  return (
    <section className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white shadow-2xl rounded-3xl overflow-hidden">
        
        {/* LEFT SIDE */}
        <div className="bg-orange-500 text-white p-12 flex flex-col justify-center relative overflow-hidden">
          
          {/* Background Circle */}
          <div className="absolute w-72 h-72 bg-orange-400 rounded-full top-[-80px] right-[-80px] opacity-30"></div>

          <div className="relative z-10">
            
            <p className="uppercase tracking-widest text-orange-100 mb-4">
              DormDesk Student Portal
            </p>

            <h1 className="text-5xl font-bold leading-tight mb-6">
              Welcome Back Student
            </h1>

            <p className="text-orange-100 text-lg leading-8 mb-10">
              Access hostel notices, complaints, room details,
              fee information, and all hostel services through
              your personalized student dashboard.
            </p>

            {/* Features */}
            <div className="space-y-5">
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white text-orange-500 rounded-xl flex items-center justify-center font-bold">
                  ✓
                </div>

                <p className="text-lg">
                  Raise Complaints Easily
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white text-orange-500 rounded-xl flex items-center justify-center font-bold">
                  ✓
                </div>

                <p className="text-lg">
                  View Hostel Notices
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white text-orange-500 rounded-xl flex items-center justify-center font-bold">
                  ✓
                </div>

                <p className="text-lg">
                  Track Fees & Room Details
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-10 md:p-14 flex flex-col justify-center">
          
          {/* Heading */}
          <div className="mb-10">
            
            <h2 className="text-4xl font-bold text-gray-800 mb-3">
              Student Login
            </h2>

            <p className="text-gray-500 text-lg">
              Login to access the student dashboard
            </p>

          </div>

          {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
             
              <label className="block text-gray-700 font-medium mb-3">
                Student Email
              </label>
            {/* Email */}
           <input
  type="text"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Enter email"
  className="w-full border border-gray-300 rounded-2xl px-5 py-4"
/>
 <label className="block text-gray-700 font-medium mb-3">
                Password
              </label>

            {/* Password */}
           <div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Enter password"
    className="w-full border border-gray-300 rounded-2xl px-5 py-4 pr-14"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500"
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </button>
</div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg transition duration-300"
            >
              Login
            </button>
            <div className="text-center mt-6">

  <p className="text-gray-600">

    Don't have an account?{" "}

    <span
      onClick={() => navigate("/student-register")}
      className="text-orange-500 font-semibold cursor-pointer hover:underline"
    >
      Register Here
    </span>

  </p>

</div>

          </form>

          {/* Back Home */}
          <div className="mt-8 text-center">
            
            <Link
              to="/"
              className="text-gray-600 hover:text-orange-500 transition"
            >
              ← Back to Homepage
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}

export default StudentLogin;