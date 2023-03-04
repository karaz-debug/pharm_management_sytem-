import React from 'react'
import StockTable from '../Table/StockTable'
import SupplierTable from '../Table/SupplierTable'

function SupplierManagement() {
    return (
        <div className="p-4">
            <div className="flex items-center justify-between px-4 ">
                <h1 className="text-lg font-bold">Manage Supplier</h1>
                <div className="flex items-center space-x-2">
                    <button className="p-2 bg-green-500 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M11 9V5a1 1 0 00-2 0v4H5a1 1 0 000 2h4v4a1 1 0 002 0v-4h4a1 1 0 000-2h-4z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button className="p-2 bg-red-500 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 1a9 9 0 100 18 9 9 0 000-18zM5.707 5.707a1 1 0 011.414 0L10 8.586l2.879-2.879a1 1 0 011.414 1.414L11.414 10l2.879 2.879a1 1 0 01-1.414 1.414L10 11.414l-2.879 2.879a1 1 0 01-1.414-1.414L8.586 10 5.707 7.121a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
            <hr className="my-4 border-red-500" />

            <SupplierTable />

        </div>
    )
}

export default SupplierManagement