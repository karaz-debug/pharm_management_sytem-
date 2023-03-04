import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '../../components/Layout/AdminLayout'
import MainContent from '../../components/contents/MainContent'
import StockManagement from './StockManagement'
import DrugManagement from './DrugManagement'
import CategoryManagement from './CategoryManagement'
import UserManagement from './UserManagement'
import ReversalNotifications from './ReversalNotifications'
import SignUp from '../SignUp'
import Login from '../Login'
import WithAuth from '../../components/WithAuth'
import Supplier from './Supplier'
import Invoice from './Invoice'

const AdminDashboard = () => {
    const router = useRouter()
    let managementSection
    switch (router.pathname) {
        case '/Login':
            managementSection = <Login />;
            break;
        case '/SignUp':
            managementSection = <SignUp />;
            break;
        case '/admin':
            managementSection = <MainContent />;
            break;
        case '/admin/CategoryManagement':
            managementSection = <CategoryManagement />;
            break;
        case '/admin/DrugManagement':
            managementSection = <DrugManagement />;
            break;
        case '/admin/StockManagement':
            managementSection = <StockManagement />;
            break;
        case '/admin/UserManagement':
            managementSection = <UserManagement />;
            break;
        case '/admin/Supplier':
            managementSection = <Supplier />;
            break;
        case '/admin/Invoice':
            managementSection = <Invoice />;
            break;

        case '/admin/ReversalNotifications':
            managementSection = <ReversalNotifications />;
            break;
        default:
            managementSection = <MainContent />;
    }
    return (
        <div className="flex flex-col min-h-screen ">
            <AdminLayout>
                <div className="flex-1 h-screen px-6 py-4">
                    {managementSection}
                </div>
            </AdminLayout>

        </div>
    )
}

export default WithAuth(AdminDashboard);
