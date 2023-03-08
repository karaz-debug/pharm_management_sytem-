import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Footer from '../Footer'
import Header from '../Header'
import Sidebar from '../Sidebar'


const MonitorLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const router = useRouter()

    return (
        <div className="">
            <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                dropdownOpen={dropdownOpen}
                setDropdownOpen={setDropdownOpen}
            />
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <main className="">{children}</main>
            {/* <Footer /> */}
        </div>
    )

}

export default MonitorLayout;

