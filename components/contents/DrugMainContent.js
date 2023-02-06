import React, { useState } from "react";
import CategoryModal from "../CategoryModal";
import ModalPop from "../Modal/ModalPop";
import SearchBar from "../SearchBar";
import TableContent from "../TableContent";

function DrugMainContent() {
    // Remaining Features  of UI
    // 1.A Neet Table Remaining using Material UI
    // 2.Adding Drugs By Uploading them Through Excell sheet

    const [category, setCategory] = useState(false);
    const [addDrug, setAddDrug] = useState(false);

    return (
        <div>
            <div className="flex justify-between mb-4">
                <SearchBar />

                <div className="flex items-center">
                    <div className="relative flex items-center mx-6 align-baseline">
                        <button
                            onClick={() => setCategory(!category)}
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

                    {/* Add Button */}
                    <button className="flex items-center justify-center px-3 py-2 text-white bg-indigo-500 hover:bg-indigo-600"
                        onClick={() => setAddDrug(true)}>
                        <svg className="w-4 h-4 mr-2 opacity-50 fill-current shrink-0" viewBox="0 0 16 16">
                            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
                        </svg>
                        <span className="ml-2">Add Drug</span>
                    </button>


                    {addDrug && (
                        <>
                            <ModalPop isOpen={addDrug} onClose={() => setAddDrug(false)}>
                            </ModalPop>
                        </>
                    )}
                </div>

                {/* End Filter */}
            </div>

            <div className="flex justify-start gap-3 mb-3 align-baseline">


                {/* Printing Down button  All the Drungs Showed in the Table Content */}
                <button className="p-3 text-white bg-indigo-500 rounded-md btn hover:bg-indigo-100">
                    {/* any svg you can put */}
                    <span className="ml-2">Print Drug</span>
                </button>
                {/* Adding Drugs By Uploading them Through Excell sheet */}
                <button className="p-3 text-white bg-indigo-100 rounded-md btn hover:bg-indigo-600">
                    {/* any svg you can put */}
                    <span className="ml-2">Upload Through Excell Sheet</span>
                </button>
            </div>

            {/* Table content */}
            <TableContent />

        </div>
    );
}

export default DrugMainContent;
