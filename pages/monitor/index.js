import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import MonitorLayout from '../../components/Layout/MonitorLayout';
import Patient from './Patient'
import Appointment from '../doctor/Appointment';


const MonitorDashboard = () => {
  const router = useRouter()
  let managementSection
  switch (router.pathname) {
    case '/monitor/Patient':
      managementSection = <Patient />;
      break;
    default:
      managementSection = <MainContent />;
  }
  return (
    <div className="flex flex-col min-h-screen ">
      <MonitorLayout>
        <div className="flex-1 h-screen px-6 py-4">
          {managementSection}
        </div>
      </MonitorLayout>

    </div>
  )
}

export default WithAuth(MonitorDashboard);
