import React from 'react'
import Pagination from './Pagination'
import Sidebar from './Sidebar'
import PageSizeCustomOptions from './Table'

function TableContent() {
    return (
        <div class="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm  border border-slate-200 ">
            <header class="px-5 flex flex-col py-4 border-b border-slate-100">
                <h2 class="font-semibold text-slate-800 mb-3">Sales</h2>
                {/* <Sidebar /> */}
            </header>
            <div class="p-3 ">
                <PageSizeCustomOptions />
            </div>
        </div>
    )
}

export default TableContent
