import React from 'react'
import { useRouter } from 'next/router'
import WelcomeBanner from '../WelcomeBanner'
import ReversalData from '../ReversalData'
import ReportAnalytics from '../ReportAnalytics'
import MediaControlCard from '../DashboardPage'
import Footer from '../Footer'
import StockTable from '../Table/StockTable'
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

