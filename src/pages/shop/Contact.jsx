import React from 'react';
import BreadcrumbBanner from '../../components/layout/shop/common/BreadcrumbBanner';
import ContactInfo from '../../components/layout/shop/contact/ContactInfo';
import ContactFormMap from '../../components/layout/shop/contact/ContactFormMap';

const Contact = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Breadcrumb Banner */}
      <BreadcrumbBanner />

      {/* Page Heading
      <section className="text-center py-12 bg-white shadow-sm">
        <h1 className="text-4xl font-extrabold text-primary mb-3">Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We’d love to hear from you! Reach out for inquiries, feedback, or support.
        </p>
      </section> */}

      {/* Contact Info & Map */}
      <ContactInfo />
      <ContactFormMap />
    </div>
  );
};

export default Contact;
