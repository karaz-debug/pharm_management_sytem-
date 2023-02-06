import React from 'react'

function CategoryModal() {
    return (
        <div
            className="absolute  bg-white border border-slate-200 enter-done md:left-auto mt-1 overflow-hidden pt-1.5 px-2 right-auto rounded shadow-lg top-full z-10"

        >
            <div>
                <div className="text-xs font-semibold text-slate-400 uppercase pt-1.5 pb-2 px-4">
                    Filters
                </div>
                <ul className="mb-4">
                    <li className="">
                        <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox" />
                            <span className="ml-2 text-sm font-medium">
                                Phelin
                            </span>
                        </label>
                    </li>
                    <li className="">
                        <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox" />
                            <span className="ml-2 text-sm font-medium">
                                AntiBiotics
                            </span>
                        </label>
                    </li>
                    <li className="">
                        <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox" />
                            <span className="ml-2 text-sm font-medium">
                                Top
                            </span>
                        </label>
                    </li>
                    <li className="">
                        <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox" />
                            <span className="ml-2 text-sm font-medium">
                                Pain Killers
                            </span>
                        </label>
                    </li>
                    <li className="">
                        <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox" />
                            <span className="ml-2 text-sm font-medium">
                                Dosage
                            </span>
                        </label>
                    </li>
                    <li className="">
                        <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox" />
                            <span className="ml-2 text-sm font-medium">
                                Total
                            </span>
                        </label>
                    </li>
                </ul>
                <div className="px-5 py-2 border-t border-slate-200 bg-slate-50">
                    <ul className="flex items-center justify-between">
                        <li>
                            <button className="mx-5 bg-white btn-xs border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600">
                                Clear
                            </button>
                        </li>
                        <li>
                            <button className="px-3 text-white bg-indigo-500 rounded-md btn-xs hover:bg-indigo-600">
                                Apply
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CategoryModal
