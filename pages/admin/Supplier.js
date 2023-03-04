import React from 'react'
import SupplierContent from '../../components/contents/SupplierContent';
import AdminLayout from '../../components/Layout/AdminLayout';
import WithAuth from '../../components/WithAuth';

function Supplier() {
    return (

        <AdminLayout>
            <main className="flex-1 h-screen px-6 py-4 ">
                <SupplierContent />
            </main>
        </AdminLayout>

    )
}

export default WithAuth(Supplier);;



