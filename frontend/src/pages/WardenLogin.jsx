import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
function WardenLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost/hostel_api/warden_login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const text = await response.text();

      console.log("RAW RESPONSE:", text);

      const data = JSON.parse(text);

    if (data.success) {

  localStorage.setItem(
    "warden",
    JSON.stringify(data.warden)
  );

  navigate("/warden-dashboard");

} else {

  alert(data.message);

}

    } catch (error) {

      console.log("ERROR:", error);

      alert("Server Error");

    }
  };
  return (
    <section className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white shadow-2xl rounded-3xl overflow-hidden">
        
        {/* LEFT SIDE */}
        <div className="bg-gray-900 text-white p-12 flex flex-col justify-center relative overflow-hidden">
          
          {/* Background Circle */}
          <div className="absolute w-72 h-72 bg-orange-500 rounded-full top-[-80px] right-[-80px] opacity-20"></div>

          <div className="relative z-10">
            
            <p className="uppercase tracking-widest text-orange-300 mb-4">
              DormDesk Warden Portal
            </p>

            <h1 className="text-5xl font-bold leading-tight mb-6">
              Warden Control Panel
            </h1>

            <p className="text-gray-300 text-lg leading-8 mb-10">
              Monitor hostel activities, manage students,
              allocate rooms, resolve complaints, and
              supervise hostel operations efficiently.
            </p>

            {/* Features */}
            <div className="space-y-5">
              
              <div className="flex items-center gap-4">
                
                <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center font-bold">
                  ✓
                </div>

                <p className="text-lg">
                  Manage Student Records
                </p>

              </div>

              <div className="flex items-center gap-4">
                
                <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center font-bold">
                  ✓
                </div>

                <p className="text-lg">
                  Monitor Complaints & Requests
                </p>

              </div>

              <div className="flex items-center gap-4">
                
                <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center font-bold">
                  ✓
                </div>

                <p className="text-lg">
                  Access Hostel Analytics Dashboard
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
              Warden Login
            </h2>

            <p className="text-gray-500 text-lg">
              Login to access the warden dashboard
            </p>

          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleLogin}>
            
            {/* Email */}
            <div>
              
              <label className="block text-gray-700 font-medium mb-3">
                Warden Email
              </label>

              <input
                type="text"
                placeholder="Enter your warden ID or email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
              />

            </div>

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

export default WardenLogin;