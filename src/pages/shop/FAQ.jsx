import React, { useState } from 'react'
import FadeIn from '../../components/layout/shop/common/FadeIn';
const FaqItem = ({ question, answer, isOpen, onToggle }) => {
    return (
        <FadeIn>
        <div className="border-b border-gray-200">
            {/* Header/Button */}
            <button
                className="flex justify-between items-center w-full py-4 text-lg font-semibold text-left text-gray-800 hover:text-primary transition-colors duration-200 focus:outline-none"
                onClick={onToggle}
                aria-expanded={isOpen}
            >
                {question}
                <span className="ml-6 text-blue-600 shrink-0">
                  
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
        </FadeIn>
    );
};
// Data from Section 1 (Copy the array here or import it)
const faqData = [
  { id: '1', question: 'How do I create an account for my pets?', answer: "Creating an account is easy! Simply click the Sign Up button, fill in your details, and add your pet’s information. This helps us personalize services and track orders." },
  { id: '2', question: 'What types of pet products do you offer?', answer: "We offer a wide range of products including pet food, toys, grooming supplies, accessories, and health supplements for dogs, cats, and other small pets." },
  { id: '3', question: 'Do you offer grooming services?', answer: "Yes! Our grooming services include bathing, haircuts, nail trimming, and ear cleaning. You can book an appointment online or in-store." },
  { id: '4', question: 'How can I track my pet order?', answer: "Once your order is confirmed, you will receive a tracking link via email and SMS. You can also check your order status in your account dashboard." },
  { id: '5', question: 'Are there any return or refund policies?', answer: "We accept returns within 14 days of purchase for most products. Refunds are processed once the item is received and inspected. Please review our Return Policy for details." },
  { id: '6', question: 'Do you have organic or specialty pet foods?', answer: "Yes, we offer a selection of organic, grain-free, and specialty diets to meet your pet’s nutritional needs. Check the product descriptions for details." },
  { id: '7', question: 'How long does delivery take?', answer: "Standard delivery typically takes 3-5 business days. Express delivery options are available at checkout for faster service." },
  { id: '8', question: 'Do you offer pet care tips?', answer: "Absolutely! Our blog and newsletter provide tips on pet health, nutrition, training, and general care for all types of pets." },
  { id: '9', question: 'Can I cancel or modify my order?', answer: "Yes, orders can be modified or cancelled within 24 hours of placing them. Please contact our customer support for assistance." },
  { id: '10', question: 'Is my payment information secure?', answer: "We use industry-standard encryption to ensure your payment details are completely secure. All transactions are processed through trusted payment gateways." },
];

const FAQ = () => {
 const [openId, setOpenId] = useState('1'); 
    
   

    const handleToggle = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="faq1-section-area bg-white py-10 ">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header Section */}
                <FadeIn>

                <div className="flex justify-center mb-12">
  <div className="text-center max-w-2xl">
    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
      Frequently Asked Questions
    </h2>
    <p className="text-gray-600 text-lg">
  Here are some of the most common questions about our pet products and services. 
  Click on a question to view the answer.
</p>

  </div>
</div>
                </FadeIn>

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
