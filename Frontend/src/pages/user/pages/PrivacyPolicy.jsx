import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="p-20 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Privacy Policy
      </h1>

      <div className="max-w-4xl mx-auto space-y-6 text-gray-700">
        <p>
          At <span className="font-semibold text-blue-600">MyShop</span>, your privacy is our top priority. 
          We are committed to protecting the personal information you share with us when using our website.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-4">Information We Collect</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Personal details (name, email, phone number, address)</li>
          <li>Payment information (securely handled via payment gateways)</li>
          <li>Browsing and purchase history for personalized experience</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-4">How We Use Your Information</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>To process orders and deliver products</li>
          <li>To provide customer support</li>
          <li>To improve our website and product recommendations</li>
          <li>To send promotional emails if subscribed</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-4">Data Security</h2>
        <p>
          We implement strict security measures to protect your data. Payment details are processed securely via trusted payment gateways.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-4">Third-Party Services</h2>
        <p>
          We may share data with trusted third-party service providers for order fulfillment, analytics, and marketing. Your data is never sold to external parties.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-4">Changes to this Policy</h2>
        <p>
          We may update this privacy policy occasionally. Please review it periodically to stay informed.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
