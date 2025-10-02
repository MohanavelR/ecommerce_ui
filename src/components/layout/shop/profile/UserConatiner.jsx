import React from 'react'

const UserConatiner = () => {
  return (
    <div>
            <div className="bg-white rounded-xl shadow p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Personal Information</h2>
      
      <form  className="space-y-6">
        
        {/* First Name & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
            <input type="text" name="firstName" id="firstName"   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500" required />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input type="text" name="lastName" id="lastName"   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500" required />
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input type="email" name="email" id="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500" required />
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150">
            Save Changes
          </button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default UserConatiner