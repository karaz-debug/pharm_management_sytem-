import React from 'react'
import { useRouter } from 'next/router'
import WelcomeBanner from '../WelcomeBanner'
import TableContent from '../TableContent'
import ReversalData from '../ReversalData'
import ReportAnalytics from '../ReportAnalytics'
import MediaControlCard from '../Card'
import Footer from '../Footer'

const MainContent = () => {
    const router = useRouter()

    return (
        <div >

            <WelcomeBanner />

            <div className="flex items-center justify-between gap-3 mt-4 mb-8 border-collapse">
                <MediaControlCard />
                <MediaControlCard />
                <MediaControlCard />

            </div>

            <TableContent />

            {/* <br />
            <br />
            <br /> */}

            {/* Reason for Reverals happen  */}
            <ReversalData />

            {/* <Footer /> */}

        </div>
    )
}

export default MainContent;

