import React, { useState } from "react";

const Faqs = () => {
  const faqData = [
    {
      question: "How can I place an order?",
      answer:
        "You can place an order by adding products to your cart and proceeding to checkout. Follow the steps and fill in your shipping details to complete the purchase.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit/debit cards, UPI, and popular digital wallets to make your shopping seamless.",
    },
    {
      question: "How can I track my order?",
      answer:
        "After placing an order, you will receive a tracking ID. Use it on our website to track your order status in real time.",
    },
    {
      question: "Can I return or exchange a product?",
      answer:
        "Yes! We have a hassle-free return and exchange policy. Products can be returned within 7 days of delivery in original condition.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Currently, we only ship within the country. International shipping will be available soon.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className=" bg-gray-50 min-h-screen p-20">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Frequently Asked Questions
      </h1>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="bg-white shadow rounded-lg cursor-pointer overflow-hidden"
          >
            <div
              onClick={() => toggleFaq(index)}
              className="p-4 flex justify-between items-center"
            >
              <h2 className="text-gray-800 font-semibold">{faq.question}</h2>
              <span className="text-blue-600 font-bold text-xl">
                {openIndex === index ? "-" : "+"}
              </span>
            </div>
            {openIndex === index && (
              <div className="p-4 pt-0 text-gray-600 border-t border-gray-200">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
