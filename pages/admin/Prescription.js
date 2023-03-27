

import React, { useState } from 'react'
import PrescriptionMainContent from '../../components/contents/PrescriptionMainContent';
import AdminLayout from '../../components/Layout/AdminLayout';
import WithAuth from '../../components/WithAuth';
function Prescription() {
    return (
        <div className="flex flex-col min-h-screen">
            <AdminLayout>
                <main className="flex-1 h-screen px-6 py-4 ">
                    <PrescriptionMainContent />
                </main>
            </AdminLayout>

        </div>
    )
}

export default WithAuth(Prescription);





