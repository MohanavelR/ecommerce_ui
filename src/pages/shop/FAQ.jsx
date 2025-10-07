import React, { useState } from 'react'
const FaqItem = ({ question, answer, isOpen, onToggle }) => {
    return (
        <div className="border-b border-gray-200">
            {/* Header/Button */}
            <button
                className="flex justify-between items-center w-full py-4 text-lg font-semibold text-left text-gray-800 hover:text-blue-600 transition-colors duration-200 focus:outline-none"
                onClick={onToggle}
                aria-expanded={isOpen}
            >
                {question}
                <span className="ml-6 text-blue-600 shrink-0">
                    {/* {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />} */}
                </span>
            </button>

            {/* Content/Answer */}
            <div
                className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100 py-2' : 'max-h-0 opacity-0'
                }`}
                // Dynamic style to control height for smooth transition
                style={{ maxHeight: isOpen ? '500px' : '0' }} 
            >
                <div className="pb-4 text-gray-600 leading-relaxed">
                    {answer}
                </div>
            </div>
        </div>
    );
};
// Data from Section 1 (Copy the array here or import it)
const faqData = [
    { id: '1', question: 'How do I sign up for your electricity services?', answer: "Signing up is easy! You can visit our Plans page and select the package that fits your needs, or call our customer service line at 123-456-7890. Whether you're wondering about our pricing plans, the installation process, or sustainability initiatives, our team is here to help." },
    { id: '2', question: 'What types of electricity plans do you offer?', answer: "We offer fixed-rate plans for budget certainty, variable-rate plans for market flexibility, and 100% renewable energy plans for eco-conscious customers. Visit our Plans page for a detailed breakdown." },
    { id: '3', question: 'What are your billing and payment options?', answer: "We support paperless billing, automatic bank transfers, and online payments via credit card. You can also pay over the phone or by mail. We strive to make payment as convenient as possible." },
    { id: '4', question: 'How can I track my energy usage with your services?', answer: "Our online customer portal and mobile app provide real-time tracking of your energy consumption, allowing you to monitor usage, set alerts, and identify opportunities for savings." },
    { id: '5', question: 'Are there any cancellation fees or long-term contracts?', answer: "Our terms vary by plan. While our fixed-rate plans may include an early termination fee, our month-to-month plans offer maximum flexibility with no cancellation fees. Please review your plan details for specifics." },
    { id: '6', question: 'What makes your energy sources sustainable?', answer: "We invest heavily in solar, wind, and hydro power generation. Our commitment to sustainability is reflected in our 100% green energy options and carbon-offset programs." },
    { id: '7', question: 'How long does it take to switch providers?', answer: "The switching process typically takes 10 to 14 business days, during which time your service remains uninterrupted. We handle all coordination with your previous provider." },
    { id: '8', question: 'Do you offer commercial or business plans?', answer: "Yes, we provide tailored solutions for small businesses and large commercial enterprises, including energy efficiency audits and dedicated account management." },
    { id: '9', question: 'What should I do during a power outage?', answer: "In the event of an outage, please call our 24/7 emergency line. We also recommend checking your local utility provider's outage map, as they are responsible for grid maintenance." },
    { id: '10', question: 'Is my personal data secure with your platform?', answer: "We adhere to strict data protection regulations and use industry-leading encryption to ensure your personal and billing information remains completely secure." },
];

const FAQ = () => {
 const [openId, setOpenId] = useState('1'); 
    
    // Split the data into two columns (5 items each)
    const column1Data = faqData.slice(0, 5);
    const column2Data = faqData.slice(5, 10);

    const handleToggle = (id) => {
        // Close the current item if it's clicked again, otherwise open the new one.
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="faq1-section-area bg-white py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header Section */}
                <div className="flex justify-center mb-12">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                            Questions
                        </h2>
                    </div>
                </div>

                {/* FAQ Content Area */}
                <div className="flex flex-wrap -mx-4">
                    {/* First Column */}
                    <div className="w-full px-4 mb-8 lg:mb-0">
                        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                            {faqData.map((faq) => (
                                <FaqItem
                                    key={faq.id}
                                    question={faq.question}
                                    answer={faq.answer}
                                    isOpen={openId === faq.id}
                                    onToggle={() => handleToggle(faq.id)}
                                />
                            ))}
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>
    );
};

export default FAQ
