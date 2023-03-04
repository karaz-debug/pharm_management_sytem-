
import React from 'react'
import CustomerMainContent from '../../components/contents/CustomerMainContent';
import AdminLayout from '../../components/Layout/AdminLayout'
import WithAuth from '../../components/WithAuth'

function ManageCustomer() {
    return (
        <div className="flex flex-col min-h-screen">
            <AdminLayout>

                <main className="flex-1 h-screen px-6 py-4 ">
                    <CustomerMainContent />
                </main>

            </AdminLayout>

        </div>
    )
}

export default WithAuth(ManageCustomer);



