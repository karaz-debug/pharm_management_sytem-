import React, { useState } from "react";
import CategoryModal from "../CategoryModal";
import DrugModalPop from "../Modal/DrugModalPop";
import ModalPop from "../Modal/DrugModalPop";
import SearchBar from "../SearchBar";
import DrugTable from "../Table/DrugTable";
import TableContent from "../TableContent";

function DrugMainContent() {
    // Remaining Features  of UI
    // 1.A Neet Table Remaining using Material UI
    // 2.Adding Drugs By Uploading them Through Excell sheet

    const [category, setCategory] = useState(false);
    const [addDrug, setAddDrug] = useState(false);

    return (
        <div>
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Manage Medicine</h2>
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
            <div className="flex justify-between mb-4">
                <SearchBar placeholder="By Medicine Name.." />

                <button className="px-4 py-3 mt-8 mb-4 bg-red-500 rounded-lg ">
                    Out of Stock
                </button>
                <button className="px-4 py-3 mt-8 mb-4 bg-yellow-500 rounded-lg">
                    Expired
                </button>

                <div className="flex items-center">
                    <div className="relative flex items-center mx-6 align-baseline">
                        <button
                            className="px-4 pb-2 bg-white border btn border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600"
                        >

                            <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                                <path d="M9 15H7a1 1 0 010-2h2a1 1 0 010 2zM11 11H5a1 1 0 010-2h6a1 1 0 010 2zM13 7H3a1 1 0 010-2h10a1 1 0 010 2zM15 3H1a1 1 0 010-2h14a1 1 0 010 2z"></path>
                            </svg>
                        </button>

                        {category && (
                            <>
                                <CategoryModal />
                            </>
                        )}
                    </div>

                </div>

                {/* End Filter */}
            </div>

            <div className="flex justify-start gap-3 mb-3 align-baseline">



            </div>

            {/* Table content */}
            <DrugTable />

        </div>
    );
}

export default DrugMainContent;
