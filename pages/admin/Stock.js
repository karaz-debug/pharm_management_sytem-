import React from 'react'
import AddStockContent from '../../components/contents/AddStockContent';
import AdminLayout from '../../components/Layout/AdminLayout';
import WithAuth from '../../components/WithAuth';

function Stock() {
    return (
        <AdminLayout>
            <main className="flex-1 h-screen px-6 py-4 ">
                <AddStockContent />
            </main>
        </AdminLayout>
    )
}

export default WithAuth(Stock);
