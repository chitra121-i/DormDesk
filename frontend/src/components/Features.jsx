function Features() {
  const features = [
    {
      title: "Room Allocation",
      description:
        "Allocate and manage hostel rooms digitally with better organization and efficiency.",
      icon: "🏠",
    },

    {
      title: "Complaint System",
      description:
        "Students can raise complaints online and wardens can track resolutions easily.",
      icon: "🛠️",
    },

    {
  title: "Hostel Analytics Dashboard",
  description:
    "Monitor hostel statistics, occupancy, complaints, student records, and operational insights through an interactive dashboard.",
  icon: "📊",
},

    {
      title: "Notice Board",
      description:
        "Share important hostel announcements and updates instantly with all students.",
      icon: "📢",
    },

    {
      title: "Visitor Management",
      description:
        "Securely track visitor entries and exits with digital visitor records.",
      icon: "👥",
    },

    {
      title: "Fee Management",
      description:
        "Monitor hostel fee payments, pending dues, and payment history efficiently.",
      icon: "💳",
    },
  ];

  return (
    <section id="features" className="w-full bg-orange-50 py-24">
      
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <div className="text-center mb-16">
          
          <p className="text-orange-500 font-semibold text-lg mb-4">
            Powerful Features
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
            Everything Needed For <br />
            Smart Hostel Management
          </h2>

          <p className="text-gray-600 text-lg mt-6 max-w-3xl mx-auto leading-8">
            Our hostel management system simplifies hostel operations
            for both students and wardens through a secure, digital,
            and user-friendly platform.
          </p>

        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {features.map((feature, index) => (
            
            <div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-orange-100"
            >
              
              {/* Icon */}
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-3xl mb-6">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-7">
                {feature.description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;