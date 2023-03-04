import React from 'react'
import { useRouter } from 'next/router'
import WelcomeBanner from '../WelcomeBanner'
import ReversalData from '../ReversalData'
import ReportAnalytics from '../ReportAnalytics'
import MediaControlCard from '../Card'
import Footer from '../Footer'
import StockTable from '../Table/StockTable'

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

            <div class="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm  border border-slate-200 ">
                <header class="px-5 flex flex-col py-4 border-b border-slate-100">
                    <h2 class="font-semibold text-slate-800 mb-3">Stocks</h2>
                    {/* <Sidebar /> */}
                </header>
                <div class="p-3 ">
                    <StockTable />
                </div>
            </div>



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

