import React, { useState } from 'react'
import AdminLayout from '../../components/Layout/AdminLayout'
import StockMainContent from '../../components/contents/StockMainContent'
import WithAuth from '../../components/WithAuth';



function StockManagement() {
    return (
        <AdminLayout>
            <main className="flex-1 h-screen px-6 py-4 ">
                <StockMainContent />
            </main>
        </AdminLayout>

    )
}

export default WithAuth(StockManagement);


