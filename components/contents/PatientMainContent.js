import axios from 'axios';
import React, { useEffect, useState } from 'react'

function PatientMainContent() {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const patientData = Object.fromEntries(new FormData(e.target));
        try {
            const response = await axios.post('http://localhost:3001/monitor/patient', patientData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <form onSubmit={handleSubmit}>
                        <h1 className="mb-4 text-3xl font-bold text-gray-900">Patient Registration Form</h1>
                        <div className="grid grid-cols-1 gap-6">
                            {/* Personal and contact information form */}
                            <div className="overflow-hidden bg-white rounded-lg shadow">
                                <div className="px-4 py-5 sm:p-6">
                                    <h2 className="mb-4 text-lg font-medium text-gray-900">Personal and Contact Information</h2>
                                    <div class="grid grid-cols-6 gap-6">
                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="first_name" class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                            <input type="text" name="first_name" id="first_name" class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter your first name" />
                                        </div>
                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="last_name" class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                            <input type="text" name="last_name" id="last_name" class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter your last name" />
                                        </div>
                                        <div class="col-span-6 sm:col-span-4">
                                            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                            <input type="email" name="email" id="email" class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter your email" />
                                        </div>
                                        <div class="col-span-6 sm:col-span-4">
                                            <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                            <input type="tel" name="phone" id="phone" class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter your phone number" />
                                        </div>
                                        <div class="col-span-6">
                                            <label for="address" class="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                            <input type="text" name="address" id="address" class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter your address" />
                                        </div>
                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="city" class="block text-sm font-medium text-gray-700 mb-2">City</label>
                                            <input type="text" name="city" id="city" class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter your city" />
                                        </div>
                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="state" class="block text-sm font-medium text-gray-700 mb-2">State</label>
                                            <input type="text" name="state" id="state" class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter your state" />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label for="zip" className="block mb-2 text-sm font-medium text-gray-700">ZIP Code</label>
                                            <input type="text" name="zip" id="zip" className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter your Zip" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Medical history and insurance details form */}
                            <div className="overflow-hidden bg-white rounded-lg shadow">
                                <div className="px-4 py-5 sm:p-6">
                                    <h2 className="mb-4 text-lg font-medium text-gray-900">Medical History and Insurance Details</h2>
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-700">Date of Birth</label>
                                            <input type="date" name="dob" id="dob" className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-700">Appointment Date</label>
                                            <input type="date" name="dop" id="dob" className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-700">Gender</label>
                                            <select id="gender" name="gender" className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                <option>Male</option>
                                                <option>Female</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                        <div className="col-span-6 sm:col-span-4">
                                            <label htmlFor="health_issues" className="block mb-2 text-sm font-medium text-gray-700">Health Issues</label>
                                            <textarea id="health_issues" name="health_issues" rows="3" className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="insurance_company" className="block mb-2 text-sm font-medium text-gray-700">Insurance Company</label>
                                            <input type="text" name="insurance_company" id="insurance_company" className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="policy_number" className="block mb-2 text-sm font-medium text-gray-700">Policy Number</label>
                                            <input type="text" name="policy_number" id="policy_number" className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Submit button */}
                            <div className="mt-8">
                                <button type="submit" className="inline-flex items-center px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Submit
                                </button>
                            </div>


                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default PatientMainContent
