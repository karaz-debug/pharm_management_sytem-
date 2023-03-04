import React, { useState } from 'react'
import UserModal from '../Modal/UserModal'
import SearchBar from '../SearchBar'
import UserTable from "../Table/UserTable";

function UserMainContent() {
    // const [addUser, setUser] = useState(false)
    // implementt the modal
    return (
        <div>
            <div className="flex justify-between mb-4">
                {/* Search Bar */}
                <SearchBar />

                {/* Add User */}
                <div className="mt-8">
                    <button className="flex items-center justify-center px-3 py-2 text-white bg-indigo-500 hover:bg-indigo-600"
                    >
                        {/* <svg className="w-4 h-4 mr-2 opacity-50 fill-current shrink-0" viewBox="0 0 16 16">
                            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
                        </svg> */}
                        <span className="ml-2">Check User</span>
                    </button>


                    {/* {addUser && (
                        <>
                            <UserModal isOpen={addUser} onClose={() => setUser(false)} ></UserModal>

                        </>
                    )} */}
                </div>
            </div>

            {/* Table content */}
            <UserTable />


        </div>
    )
}

export default UserMainContent
