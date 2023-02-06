import React, { useState } from 'react'
import AdminLayout from '../../components/Layout/AdminLayout';
import UserMainContent from '../../components/contents/UserMainContent';
import WithAuth from '../../components/WithAuth';
function UserManagement() {
    return (
        <AdminLayout>
            <main className="flex-1 h-screen px-6 py-4 ">
                <UserMainContent />
            </main>

        </AdminLayout>
    )
}

export default WithAuth(UserManagement);




