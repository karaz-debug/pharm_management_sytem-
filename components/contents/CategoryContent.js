import React, { useState } from 'react'
import CategoryModal from '../CategoryModal';
import CategoryModalPop from '../Modal/CategoryModalPop';
import SearchBar from '../SearchBar';
import TableContent from '../TableContent'
import WelcomeBanner from '../WelcomeBanner'

function CategoryContent() {
    const [category, setCategory] = useState(false);
    const [addCategory, setAddCategory] = useState(false);
    return (
        <div>
            <WelcomeBanner />

            <div className="flex items-center justify-between">
                <SearchBar />
                <div className="relative flex items-end justify-end gap-2 align-baseline">
                    <div>
                        <button
                            onClick={() => setCategory(!category)}
                            className="px-4 py-3 pb-2 bg-white border btn border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600"
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
                    <button className="flex items-center justify-center px-3 py-2 text-white bg-indigo-500 hover:bg-indigo-600"
                        onClick={() => setAddCategory(true)}>
                        <svg className="w-4 h-4 mr-2 opacity-50 fill-current shrink-0" viewBox="0 0 16 16">
                            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
                        </svg>
                        <span className="ml-2">Add Category</span>
                    </button>


                    {addCategory && (
                        <>
                            <CategoryModalPop isOpen={addCategory} onClose={() => setAddCategory(false)}>
                            </CategoryModalPop>
                        </>
                    )}
                </div>

                {/* Add Button */}

            </div>
            <TableContent />
        </div>
    )
}

export default CategoryContent
