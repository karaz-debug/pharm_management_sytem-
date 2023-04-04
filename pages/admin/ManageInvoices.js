
import React from 'react'

import AdminLayout from '../../components/Layout/AdminLayout'
import WithAuth from '../../components/WithAuth'
import InvoiceMainContent from '../../components/contents/InvoiceMainContent'

function ManageInvoices() {
    return (
        <div className="flex flex-col min-h-screen">
            <AdminLayout>

                <main className="flex-1 h-screen px-6 py-4 ">
                    <InvoiceMainContent />
                </main>

            </AdminLayout>

        </div>
    )
}

export default WithAuth(ManageInvoices);



