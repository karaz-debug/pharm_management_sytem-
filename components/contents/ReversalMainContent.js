import React from 'react'
import ReversalData from '../ReversalData'
import ReversedSalesTable from '../Table/ReversedSalesTable'
import StockTable from '../Table/StockTable'
import UserTable from '../Table/UserTable'
import TableContent from '../TableContent'
import WelcomeBanner from '../WelcomeBanner'

function ReversalMainContent() {
    // Logic to implement
    // 1.List down in a table all the Reversal that took place from the sales person
    // 2.Approve them if valid reason found
    // 3.Show a graph showing the number of reversals and and most of the reason that happened

    // Need to pass differents props to the Table content on basis of what we need there to show up
    return (
        <div>
            <WelcomeBanner />

            <div class="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm  border border-slate-200 ">
                <header class="px-5 flex flex-col py-4 border-b border-slate-100">
                    <h2 class="font-semibold text-slate-800 mb-3">Reversed Sales</h2>
                    {/* <Sidebar /> */}
                </header>
                <div class="p-3 ">
                    < ReversedSalesTable />
                </div>
            </div>

            <br />
            <br />
            <br />
            {/* Table */}

            <div class="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm  border border-slate-200 ">
                <header class="px-5 flex flex-col py-4 border-b border-slate-100">
                    <h2 class="font-semibold text-slate-800 mb-3">Users</h2>
                    {/* <Sidebar /> */}
                </header>
                <div class="p-3 ">
                    <UserTable />
                </div>
            </div>


            {/* Reversal */}
            <ReversalData />

            <br />

            <div class="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm  border border-slate-200 ">
                <header class="px-5 flex flex-col py-4 border-b border-slate-100">
                    <h2 class="font-semibold text-slate-800 mb-3">Stocks</h2>
                    {/* <Sidebar /> */}
                </header>
                <div class="p-3 ">
                    <StockTable />
                </div>
            </div>
        </div>
    )
}

export default ReversalMainContent
