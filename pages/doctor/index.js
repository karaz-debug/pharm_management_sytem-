import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import DoctorLayout from '../../components/Layout/DoctorLayout';
import Appointment from './Appointment';


const DoctorDashboard = () => {
    const router = useRouter()
    let managementSection
    switch (router.pathname) {


        case '/doctor/Appointment':
            managementSection = <Appointment />;
            break;
        default:
            managementSection = <MainContent />;
    }
    return (
        <div className="flex flex-col min-h-screen ">
            <DoctorLayout>
                <div className="flex-1 h-screen px-6 py-4">
                    {managementSection}
                </div>
            </DoctorLayout>

        </div>
    )
}

export default WithAuth(DoctorDashboard);
