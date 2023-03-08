import React, { useState } from 'react'
import AppointmentMainContent from '../../components/contents/AppointmentMainContent';
import DoctorLayout from '../../components/Layout/DoctorLayout';
import WithAuth from '../../components/WithAuth';
function Appointment() {
    return (
        <div className="flex flex-col min-h-screen">
            <DoctorLayout>
                <main className="flex-1 h-screen px-6 py-4 ">
                    <AppointmentMainContent />
                </main>
            </DoctorLayout>

        </div>
    )
}

export default WithAuth(Appointment);




