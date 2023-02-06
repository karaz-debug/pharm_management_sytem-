import React, { useState } from 'react'
import StockModal from '../Modal/StockModal'
import SearchBar from '../SearchBar'
import TableContent from '../TableContent'

function StockMainContent() {
    const [addStock, setaddStock] = useState(false)

    return (
        <div>
            <div className="flex justify-between mb-4">
                {/* Search Bar */}
                <SearchBar />

                {/* Add Stock */}
                <div className="mt-8">
                    <button className="flex items-center justify-center px-3 py-2 text-white bg-indigo-500 hover:bg-indigo-600"
                        onClick={() => setaddStock(true)}>
                        <svg className="w-4 h-4 mr-2 opacity-50 fill-current shrink-0" viewBox="0 0 16 16">
                            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
                        </svg>
                        <span className="ml-2">Add Stock</span>
                    </button>


                    {addStock && (
                        <>
                            <StockModal isOpen={addStock} onClose={() => setaddStock(false)}>
                            </StockModal>
                        </>
                    )}
                </div>


            </div>

            <div class="flex justify-center gap-3 align-baseline">
                {/* Printing Down button  All the Stock Showed in the Table Content */}
                <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                    {/* any svg you can put */}
                    <span class="hidden xs:block ml-2">Print</span>
                </button>
            </div>

            {/* Table content */}
            <TableContent />


        </div>
    )
}

export default StockMainContent
