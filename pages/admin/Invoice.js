import React from 'react'
import AddInvoice from '../../components/contents/AddInvoice'
import AdminLayout from '../../components/Layout/AdminLayout'
import WithAuth from '../../components/WithAuth'

function Invoice() {
    return (
        <AdminLayout>
            <main className="flex-1 h-screen px-6 py-4 ">
                <AddInvoice />
            </main>
        </AdminLayout>
    )
}

export default WithAuth(Invoice)


