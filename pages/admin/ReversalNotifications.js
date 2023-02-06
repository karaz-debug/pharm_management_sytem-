import React, { useState } from 'react'
import AdminLayout from '../../components/Layout/AdminLayout';
import ReversalMainContent from '../../components/contents/ReversalMainContent';
import WithAuth from '../../components/WithAuth';


function ReversalNotifications() {
    return (
        <div>
            <AdminLayout>
                <main className="flex-1 h-screen px-6 py-4 ">
                    <ReversalMainContent />
                </main>
            </AdminLayout>
        </div>
    )
}

export default WithAuth(ReversalNotifications);





