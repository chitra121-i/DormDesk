function Footer() {
  return (
    <footer id="contact" className="w-full bg-gray-900 text-white pt-20 pb-10">
      
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div>
            
            <div className="flex items-center gap-3 mb-6">
              
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-2xl font-bold">
                DD
              </div>
              <h3 className="text-3xl font-bold">
                DormDesk
              </h3>

            </div>

            <p className="text-gray-400 leading-8">
              A modern hostel management platform designed to simplify
              hostel operations for students and wardens through a
              secure and user-friendly digital system.
            </p>

          </div>
        
          {/* Quick Links */}
          <div>
            
            <h3 className="text-xl font-semibold mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4 text-gray-400">
              
              <li className="hover:text-orange-400 cursor-pointer transition">
                Home
              </li>

              <li className="hover:text-orange-400 cursor-pointer transition">
                Features
              </li>

              <li className="hover:text-orange-400 cursor-pointer transition">
                About
              </li>

              <li className="hover:text-orange-400 cursor-pointer transition">
                Contact
              </li>

            </ul>

          </div>

          {/* Features */}
          <div>
            
            <h3 className="text-xl font-semibold mb-6">
              Features
            </h3>

            <ul className="space-y-4 text-gray-400">
              
              <li className="hover:text-orange-400 cursor-pointer transition">
                Room Allocation
              </li>

              <li className="hover:text-orange-400 cursor-pointer transition">
                Complaint System
              </li>

              <li className="hover:text-orange-400 cursor-pointer transition">
                Hostel Analytics Dashboard
              </li>


            </ul>

          </div>

          {/* Contact */}
          <div>
            
            <h3 className="text-xl font-semibold mb-6">
              Contact
            </h3>

            <ul className="space-y-4 text-gray-400">
              
              <li>
                DormDesk@gmail.com
              </li>

              <li>
                +91 9876543210
              </li>

              <li>
                Jaipur, Rajasthan, India
              </li>

            </ul>

          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-10"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          <p className="text-gray-400 text-center">
            © 2026 DormDesk. All rights reserved.
          </p>

          <div className="flex gap-6 text-gray-400">
            
            <p className="hover:text-orange-400 cursor-pointer transition">
              Privacy Policy
            </p>

            <p className="hover:text-orange-400 cursor-pointer transition">
              Terms & Conditions
            </p>

          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;
