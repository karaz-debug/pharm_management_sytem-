import React from 'react'
import PatientReportMainContent from '../../components/contents/PatientReportMainContent';
import MonitorLayout from '../../components/Layout/MonitorLayout'
import WithAuth from '../../components/WithAuth';

function Patient_report() {
    return (
        <div className="flex flex-col min-h-screen">
            <MonitorLayout>
                <main className="flex-1 h-screen px-6 py-4 ">
                    <PatientReportMainContent />
                </main>
            </MonitorLayout>

        </div>
    )
}

export default WithAuth(Patient_report);
