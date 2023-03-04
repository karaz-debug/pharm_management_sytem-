import React from 'react'
import AddCustomer from '../../components/contents/AddCustomer'
import AdminLayout from '../../components/Layout/AdminLayout'
import WithAuth from '../../components/WithAuth'

function Customer() {
    return (
        <AdminLayout>
            <main className="flex-1 h-screen px-6 py-4 ">
                <AddCustomer />
            </main>
        </AdminLayout>
    )
}

export default WithAuth(Customer)

