function Hero() {
  return (
    <section id="home" className="w-full min-h-screen bg-white flex items-center">
      
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* LEFT SIDE */}
        <div>
          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
            Smart Hostel <br />
            Management <span className="text-orange-500">System</span>
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-lg mt-6 leading-8">
            Simplify hostel operations with digital room allocation,
            complaint management,  notices and student management — all in one platform.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-10">
            
           <button
  onClick={() =>
    document
      .getElementById("about")
      ?.scrollIntoView({ behavior: "smooth" })
  }
  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg transition duration-300"
>
  Get Started
</button>
<button
  onClick={() =>
    document
      .getElementById("features")
      ?.scrollIntoView({ behavior: "smooth" })
  }
  className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-4 rounded-2xl font-semibold transition duration-300"
>
  Explore Features
</button>
          </div>

          {/* Extra Info */}
          <div className="flex gap-10 mt-12 flex-wrap">
            
            <div>
              <h2 className="text-3xl font-bold text-orange-500">
                500+
              </h2>
              <p className="text-gray-600">
                Students Managed
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-orange-500">
                50+
              </h2>
              <p className="text-gray-600">
                Hostel Rooms
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-orange-500">
                24/7
              </h2>
              <p className="text-gray-600">
                Monitoring
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative">
          
          {/* Background Blob */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-40"></div>

          {/* Main Card */}
          <div className="relative bg-white shadow-2xl rounded-3xl p-8 border border-orange-100">
            
           {/* Top Section */}
<div className="flex items-center justify-between mb-8">
  
  <div>
    <h2 className="text-2xl font-bold text-gray-800">
      Demo Dashboard
    </h2>

    <p className="text-sm text-gray-500 mt-1">
      Sample preview of hostel management analytics
    </p>
  </div>

  <div className="bg-orange-500 text-white px-4 py-2 rounded-xl text-sm">
    Preview
  </div>

</div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-2 gap-5">
              
              <div className="bg-orange-50 p-5 rounded-2xl">
                <h3 className="text-orange-500 text-3xl font-bold">
                  320
                </h3>
                <p className="text-gray-600 mt-2">
                  Students
                </p>
              </div>

              <div className="bg-orange-50 p-5 rounded-2xl">
                <h3 className="text-orange-500 text-3xl font-bold">
                  24
                </h3>
                <p className="text-gray-600 mt-2">
                  Complaints
                </p>
              </div>

              <div className="bg-orange-50 p-5 rounded-2xl">
                <h3 className="text-orange-500 text-3xl font-bold">
                  48
                </h3>
                <p className="text-gray-600 mt-2">
                  Rooms
                </p>
              </div>

              <div className="bg-orange-50 p-5 rounded-2xl">
                <h3 className="text-orange-500 text-3xl font-bold">
                  12
                </h3>
                <p className="text-gray-600 mt-2">
                  Notices
                </p>
              </div>

            </div>

            {/* Bottom Section */}
            <div className="mt-8 bg-gray-50 rounded-2xl p-5">
              
              <div className="flex justify-between mb-3">
                <p className="text-gray-700 font-medium">
                  Hostel Occupancy
                </p>

                <p className="text-orange-500 font-semibold">
                  85%
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-[85%] h-full bg-orange-500 rounded-full"></div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;