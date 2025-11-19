import React from "react";

const AboutUs = () => {
  return (
    <div className="p-10 bg-gray-50 min-h-screen flex flex-col items-center pt-20">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-800 mb-6">About MyShop</h1>

      {/* Introduction */}
      <p className="text-center text-gray-700 max-w-3xl mb-6">
        Welcome to <span className="font-semibold text-blue-600">MyShop</span> – your one-stop online store for all your shopping needs!  
        We are passionate about delivering high-quality products, unbeatable deals, and a seamless shopping experience to our valued customers.  
        At MyShop, your satisfaction is our top priority.
      </p>

      {/* Vision Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h2>
        <p className="text-gray-600">
          Our vision is to become the most trusted and loved e-commerce platform, where shopping is simple, fast, and enjoyable for everyone.  
          We aim to make every customer experience memorable with quality products and exceptional service.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-gray-600">
          At MyShop, our mission is to provide a wide range of products at affordable prices, delivered quickly and safely to your doorstep.  
          We believe in transparency, trust, and making online shopping a joy for everyone.
        </p>
      </div>

      {/* Team Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Team</h2>
        <p className="text-gray-600">
          Our dedicated team works tirelessly behind the scenes to ensure the best shopping experience.  
          From sourcing quality products to prompt customer service, every member of MyShop shares the same passion – to make you happy.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
