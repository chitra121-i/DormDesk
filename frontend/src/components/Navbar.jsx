import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            DD
          </div>

          <h1 className="text-2xl font-bold text-gray-800">
            DormDesk
          </h1>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <li className="hover:text-orange-500 cursor-pointer transition">
          <a href="#home">Home</a>
          </li>

          <li className="hover:text-orange-500 cursor-pointer transition">
           <a href="#features">Features</a>
          </li>

          <li className="hover:text-orange-500 cursor-pointer transition">
          <a href="#about">About</a>
          </li>

          <li className="hover:text-orange-500 cursor-pointer transition">
            <a href="#contact">Contact</a>
          </li>
        </ul>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          
        <Link to="/warden-login">
  <button className="border border-orange-500 text-orange-500 px-5 py-2 rounded-xl font-medium hover:bg-orange-50 transition">
    Warden Login
  </button>
</Link>

          <Link to="/student-login">
  <button className="bg-orange-500 text-white px-5 py-2 rounded-xl font-medium hover:bg-orange-600 transition shadow-md">
    Student Login
  </button>
</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;