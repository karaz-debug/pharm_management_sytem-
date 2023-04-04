import React from 'react'
import { useRouter } from 'next/router'
import WelcomeBanner from '../WelcomeBanner'
import DashboardPage from '../DashboardPage'

const MainContent = () => {
    const router = useRouter()

    return (
        <div >
            <WelcomeBanner />
            <DashboardPage />
        </div>
    )
}

export default MainContent;

