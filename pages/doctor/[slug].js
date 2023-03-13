import React, { useEffect, useState } from 'react'
import DoctorLayout from '../../components/Layout/DoctorLayout';
import { useRouter } from 'next/router';
import moment from 'moment';

function Prescription({ data }) {
    console.log(data)
    const router = useRouter()
    const { slug } = router.query;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const patientReport = Object.fromEntries(new FormData(e.target));

        console.log(patientReport, "this report")

        const response = await fetch(`http://localhost:3001/monitor/patient/${slug}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                patientReport
            })
        });

        if (response.ok) {
            alert('Prescription saved successfully!');
        } else {
            alert('Failed to save prescription.');
        }
    };
    return (
        <DoctorLayout>
            <div className="px-4 mx-auto sm:px-6 lg:px-8">
                <div className="flex flex-col items-center mt-12 space-x-3 justify-evenly sm:flex-row">

                    {/* patient infomation */}
                    <div>
                        {
                            data && (
                                <div className="mt-12">
                                    <h2 className="text-lg font-medium leading-6 text-gray-900">Patient Information</h2>
                                    <dl className="grid grid-cols-1 mt-2 gap-x-4 gap-y-8 sm:grid-cols-2">
                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Name</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{data.name}</dd>
                                        </div>

                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Email address</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{data.email}</dd>
                                        </div>

                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{data.phone}</dd>
                                        </div>

                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Date of birth</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{moment(data.dob).format("MMM Do YY")}</dd>
                                        </div>

                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Address</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{data.address}</dd>
                                        </div>

                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Gender</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{data.gender}</dd>
                                        </div>
                                    </dl>
                                    <div className="mt-12">
                                        <h2 className="text-lg font-medium leading-6 text-gray-900">Patient History</h2>
                                        <div className="grid grid-cols-1 mt-2 gap-x-4 gap-y-8 sm:grid-cols-2">
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Last visit date</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{moment(data.dop).format("MMM Do YY")}</dd>
                                            </div>

                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Reason for last visit</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{data.health_issues}</dd>
                                            </div>

                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Policy No</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{data.policy_number}</dd>
                                            </div>

                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Medical conditions</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{data.patient_health_report}</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Last time prescriptions</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{data.prescriptions}</dd>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )
                        }
                    </div>

                    {/* form  */}

                    <div className="mt-16 pt-5 w-[400px]">
                        <form action="" className="w-full" onSubmit={handleSubmit}>
                            <div className="col-span-6 sm:col-span-6">
                                <label htmlFor="patient_health_report" className="block mb-2 text-sm font-medium text-gray-700">Patient Health Report</label>
                                <textarea id="patient_health_report" name="patient_health_report" rows="3" className="block  h-[150px] w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                            </div>
                            <div className="col-span-6 sm:col-span-4">
                                <label htmlFor="prescriptions" className="block mb-2 text-sm font-medium text-gray-700">Prescriptions</label>
                                <textarea id="prescriptions" name="prescriptions" rows="3" className="block w-full h-[200px] px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                            </div>
                            <div className="mt-8">
                                <button type="submit" className="inline-flex items-center px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>


                </div>
            </div>
        </DoctorLayout>

    )
}

export default Prescription;


export async function getServerSideProps({ params }) {
    const { slug } = params;
    const res = await fetch(`http://localhost:3001/monitor/patient/${slug}`);
    const data = await res.json();

    return {
        props: {
            data
        }
    };
}