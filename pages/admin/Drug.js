import React from 'react'
import AddDrug from '../../components/contents/AddDrug';
import AdminLayout from '../../components/Layout/AdminLayout';
import WithAuth from '../../components/WithAuth';

function Drug() {
    return (
        <AdminLayout>
            <main className="flex-1 h-screen px-6 py-4 ">
                <AddDrug />
            </main>
        </AdminLayout>
    )
}

export default WithAuth(Drug);
