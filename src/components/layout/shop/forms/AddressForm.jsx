import React, { useState } from 'react';

const AddressForm = ({ closeAddressFormMethod,fieldErrors,setFieldErrors,formData,handleAddressSubmit,setFormData }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (fieldErrors[name]?.isRequired || fieldErrors[name]?.invalidFormat) {
      setFieldErrors(prevErrors => ({
        ...prevErrors,
        [name]: {
          ...prevErrors[name],
          isRequired: false,
          invalidFormat: false
        }
      }));
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents default form submission
    if (validateForm()) {
      console.log('Address Form Data Submitted:', formData);
      // In a real app, you'd make an API call here.
      alert("Form submitted successfully! Check console for data.");
      // closeAddressFormMethod(); // Close the modal upon successful submission
    } else {
      console.error('Form validation failed.');
    }
  };


  const getInputClasses = (fieldName) => {
    const isError = Object.values(fieldErrors[fieldName]).some(val => val === true);
    return `w-full px-4 py-3 bg-white border rounded-lg shadow-sm focus:ring-2 transition text-gray-900 placeholder-gray-400 ${
      isError 
        ? 'border-red-500 focus:border-red-500 focus:ring-red-100' // Error styles
        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500' // Normal styles
    }`;
  };

  return (
    <div className="fixed inset-0 bg-black/60 p-3 z-[5000] overflow-y-auto">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-white p-8 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 transform scale-100">
          <h2 className="text-3xl font-extrabold w-full text-primary  mb-8 border-accent border-b pb-4">
            Shipping Address Details
          </h2>
          
           
          {/* Using a semantic <form> tag */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 1. Title Field */}
              <div className="md:col-span-2">
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">
                  Address Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder='e.g., Home, Work, Billing'
                  className={getInputClasses('title')}
                />
                {fieldErrors.title?.isRequired && (
                  <p className="text-xs font-medium text-red-700 mt-1">
                    An identifying title for the address is required.
                  </p>
                )}
              </div>

              {/* 2. Address Field (Full Width) */}
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-1">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder='House No., Building, Street Name'
                  className={getInputClasses('address')}
                />
                {fieldErrors.address?.isRequired && (
                  <p className="text-xs font-medium text-red-700 mt-1">
                    Street address is required for delivery.
                  </p>
                )}
              </div>

              {/* 3. City Field */}
              <div>
                <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder='e.g., Bangalore'
                  className={getInputClasses('city')}
                />
                {fieldErrors.city?.isRequired && (
                  <p className="text-xs font-medium text-red-700 mt-1">
                    City is required.
                  </p>
                )}
              </div>

              {/* 4. Pincode Field */}
              <div>
                <label htmlFor="pincode" className="block text-sm font-semibold text-gray-700 mb-1">
                  Pincode <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder='e.g., 560001'
                  className={getInputClasses('pincode')}
                />
                {fieldErrors.pincode?.isRequired && (
                  <p className="text-xs font-medium text-red-700 mt-1">
                    Pincode is required.
                  </p>
                )}
                {fieldErrors.pincode?.invalidFormat && (
                  <p className="text-xs font-medium text-red-700 mt-1">
                    Please enter a valid **6-digit Pincode**.
                  </p>
                )}
              </div>
              
              {/* 5. Phone Field (Full Width) */}
              <div className="md:col-span-2">
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder='e.g., 9876543210'
                  className={getInputClasses('phone')}
                />
                {fieldErrors.phone?.isRequired && (
                  <p className="text-xs font-medium text-red-700 mt-1">
                    Phone number is required.
                  </p>
                )}
                {fieldErrors.phone?.invalidFormat && (
                  <p className="text-xs font-medium text-red-700 mt-1">
                    Please enter a valid **10-digit phone number**.
                  </p>
                )}
              </div>

            </div>

            <button
              type="submit" // Correctly set to "submit"
              onClick={handleAddressSubmit}
              className="w-full mt-8 bg-indigo-600 text-white p-3 rounded-lg font-medium text-lg shadow-md hover:bg-indigo-700 transition duration-150 ease-in-out"
            >
              SAVE ADDRESS
            </button>
            
          </div>

          {/* Close Button - set type="button" to prevent form submission */}
          <button
            type="button" // Corrected: Important for a button not meant to submit a form
            onClick={closeAddressFormMethod}
            className="w-full mt-4 bg-gray-200 text-gray-700 p-3 rounded-lg font-medium text-lg shadow-md hover:bg-gray-300 transition duration-150 ease-in-out"
          >
            CANCEL / CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;