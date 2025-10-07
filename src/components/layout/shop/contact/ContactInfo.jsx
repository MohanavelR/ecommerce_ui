import FadeIn from "../common/FadeIn";

const ContactInfo = () => {
  const infoItems = [
    {
      icon: <i className="fas fa-map-marker-alt"></i>,
      title: "Our Location",
      details: ["123 Commerce Street", "Tech City, TC 12345", "United States"],
      color: "text-blue-600",
    },
    {
      icon: <i className="fas fa-phone-alt"></i>,
      title: "Phone Number",
      details: ["+1 (555) 123-4567", "Mon-Fri: 9am-6pm EST", "Sat: 10am-4pm EST"],
      color: "text-green-600",
    },
    {
      icon: <i className="fas fa-envelope"></i>,
      title: "Email Address",
      details: [
        "support@bitshop.com",
        "sales@bitshop.com",
        "partnerships@bitshop.com",
      ],
      color: "text-pink-600",
    },
  ];

  return (
    // Reduced vertical padding and simplified background
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Section Title - Smaller Typography and spacing */}
        <FadeIn>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Contact Information
          </h2>
          <p className="text-base text-gray-500 mb-10 max-w-xl mx-auto">
            Reach out to us through any of the channels below. We are available during business hours.
          </p>
        </FadeIn>

        {/* Info Cards - Compact and Flat Design */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {infoItems.map((item, index) => (
            <FadeIn
              key={index}
              // Card base style: simple border, small radius, subtle shadow
              className="bg-gray-50 border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              
              {/* Icon - Smaller, just colored */}
              <div
                className={`w-12 h-12 ${item.color} bg-white rounded-full flex items-center justify-center mb-4 border border-gray-200`}
              >
                <span className="text-xl">{item.icon}</span>
              </div>

              {/* Title - Smaller font, moderate weight */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>

              {/* Details - Standard font size */}
              <div className="text-sm text-gray-600 space-y-1">
                {item.details.map((detail, i) => (
                  <p key={i}>{detail}</p>
                ))}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;