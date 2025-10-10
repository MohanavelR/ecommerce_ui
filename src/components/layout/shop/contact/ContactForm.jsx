
import FadeIn from '../common/FadeIn'
import React, { useState, useEffect, useRef } from 'react';

const ContactForm = () => {

        const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: 'General Inquiry',
        message: '',
        newsletter: false
    });
    const [formMessage, setFormMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        
        setFormMessage({
            type: 'success',
            text: 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.'
        });

        // Reset form
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            subject: 'General Inquiry',
            message: '',
            newsletter: false
        });

        // Hide message after 5 seconds
        setTimeout(() => {
            setFormMessage(null);
        }, 5000);
    };

    const messageClasses = formMessage?.type === 'success'
        ? 'bg-green-50 text-green-800'
        : ''; 

    // Reusable input classes with focus styling converted to Tailwind utilities
    const inputClasses = "w-full px-4 py-3 border border-gray-300 rounded-lg transition-all duration-300 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

  return (
    <div>
      <FadeIn>
                              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
                              <form onSubmit={handleSubmit} className="space-y-6">
                                  <div className="grid md:grid-cols-2 gap-6">
                                      <div>
                                          <label className="admin-form-label" htmlFor="firstName">First Name</label>
                                          <input 
                                              type="text" 
                                              id="firstName"
                                              name="firstName"
                                              value={formData.firstName}
                                              onChange={handleChange}
                                              required 
                                              className={inputClasses} 
                                              placeholder="John"
                                          />
                                      </div>
                                      <div>
                                          <label className="admin-form-label" htmlFor="lastName">Last Name</label>
                                          <input 
                                              type="text" 
                                              id="lastName"
                                              name="lastName"
                                              value={formData.lastName}
                                              onChange={handleChange}
                                              required 
                                              className={inputClasses} 
                                              placeholder="Doe"
                                          />
                                      </div>
                                  </div>
                                  <div>
                                      <label className="admin-form-label" htmlFor="email">Email Address</label>
                                      <input 
                                          type="email" 
                                          id="email"
                                          name="email"
                                          value={formData.email}
                                          onChange={handleChange}
                                          required 
                                          className={inputClasses} 
                                          placeholder="john@example.com"
                                      />
                                  </div>
                                  <div>
                                      <label className="admin-form-label" htmlFor="subject">Subject</label>
                                      <select 
                                          id="subject"
                                          name="subject"
                                          value={formData.subject}
                                          onChange={handleChange}
                                          className={inputClasses}
                                      >
                                          <option>General Inquiry</option>
                                          <option>Technical Support</option>
                                          <option>Sales Question</option>
                                          <option>Partnership</option>
                                          <option>Other</option>
                                      </select>
                                  </div>
                                  <div>
                                      <label className="admin-form-label" htmlFor="message">Message</label>
                                      <textarea 
                                          rows="5" 
                                          id="message"
                                          name="message"
                                          value={formData.message}
                                          onChange={handleChange}
                                          required 
                                          className={`${inputClasses} resize-none`} 
                                          placeholder="Tell us how we can help..."
                                      />
                                  </div>
                                  <div className="flex items-center">
                                      <input 
                                          type="checkbox" 
                                          id="newsletter"
                                          name="newsletter"
                                          checked={formData.newsletter}
                                          onChange={handleChange}
                                          className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                                      />
                                      <label htmlFor="newsletter" className="ml-2 text-sm text-gray-600">Subscribe to our newsletter for updates</label>
                                  </div>
                                  <button type="submit" className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                                      Send Message
                                  </button>
                              </form>
                              {formMessage && (
                                  <div className={`mt-4 p-4 rounded-lg flex items-center ${messageClasses}`}>
                                      {/* Checkmark Unicode/SVG Placeholder */}
                                      <span className="text-green-500 mr-2">✔</span>
                                      {formMessage.text}
                                  </div>
                              )}
                          </FadeIn>
    </div>
  )
}

export default ContactForm
