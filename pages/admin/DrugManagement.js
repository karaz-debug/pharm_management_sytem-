
import React, { useState } from 'react'
import AdminLayout from '../../components/Layout/AdminLayout'
import DrugMainContent from '../../components/contents/DrugMainContent'
import WithAuth from '../../components/WithAuth'

function DrugManagement() {
    return (
        <div className="flex flex-col min-h-screen">
            <AdminLayout>

                <main className="flex-1 h-screen px-6 py-4 ">
                    <DrugMainContent />
                </main>

            </AdminLayout>

        </div>
    )
}

export default WithAuth(DrugManagement);



