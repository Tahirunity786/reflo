"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "Do I need to register before placing an order?",
    answer:
      "No, you don’t need to create an account. Simply choose the product you want and place your order directly.",
  },
  {
    question: "How can I track my order?",
    answer:
      "You can track your order anytime by clicking on [LINK] and entering your order number.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept multiple payment methods including credit/debit cards, digital wallets, and cash on delivery (where available).",
  },
  {
    question: "Can I cancel or change my order after placing it?",
    answer:
      "Yes, you can cancel or modify your order within a limited time before it is processed. Please contact our support team for assistance.",
  },
  {
    question: "What if my product arrives damaged or incorrect?",
    answer:
      "If you receive a damaged or wrong product, please reach out to our support team immediately, and we’ll arrange a replacement or refund.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl shadow-sm overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full p-4 text-left text-lg font-medium text-gray-800 hover:bg-gray-50 transition"
            >
              {faq.question}
              {openIndex === index ? (
                <ChevronUp className="w-6 h-6 text-gray-600" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-600" />
              )}
            </button>
            <div
              className={`transition-all duration-300 overflow-hidden ${
                openIndex === index ? "max-h-40 p-4" : "max-h-0 p-0"
              }`}
            >
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
