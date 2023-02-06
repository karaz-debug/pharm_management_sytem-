import React, { useState } from 'react'
import AdminLayout from '../../components/Layout/AdminLayout'
import CategoryContent from '../../components/contents/CategoryContent'
import WithAuth from '../../components/WithAuth';
function CategoryManagement() {
    return (
        <div className="flex flex-col min-h-screen">
            <AdminLayout>
                <main className="flex-1 h-screen px-6 py-4 ">
                    <CategoryContent />
                </main>
            </AdminLayout>

        </div>
    )
}

export default WithAuth(CategoryManagement);