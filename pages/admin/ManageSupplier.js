import React from 'react'
import SupplierManagement from '../../components/contents/SupplierManagementContent';
import AdminLayout from '../../components/Layout/AdminLayout';
import WithAuth from '../../components/WithAuth';

function ManageSupplier() {
    return (

        <AdminLayout>
            <main className="flex-1 h-screen px-6 py-4 ">
                <SupplierManagement />
            </main>
        </AdminLayout>

    )
}

export default WithAuth(ManageSupplier);;



