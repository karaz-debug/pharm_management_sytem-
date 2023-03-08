import React, { useState } from 'react'
import PatientMainContent from '../../components/contents/PatientMainContent';
import MonitorLayout from '../../components/Layout/MonitorLayout';
import WithAuth from '../../components/WithAuth';
function Patient() {
    return (
        <div className="flex flex-col min-h-screen">
            <MonitorLayout>
                <main className="flex-1 h-screen px-6 py-4 ">
                    <PatientMainContent />
                </main>
            </MonitorLayout>

        </div>
    )
}

export default WithAuth(Patient);




