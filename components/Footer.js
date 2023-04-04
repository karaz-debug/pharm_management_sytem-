import React from 'react'
import Link from 'next/link'
function Footer() {
    return (

        <footer className="h-16 bg-white shadow-md footers">
            <div className="flex items-center justify-center gap-4 px-6 py-4">
                <div>Copyright 2021 ABC Pharm </div>
                <div>
                    <Link href="/terms" legacyBehavior>
                        <a className="text-gray-600 hover:text-gray-800">| Terms</a>
                    </Link>
                    <Link href="/privacy" legacyBehavior>
                        <a className="ml-4 text-gray-600 hover:text-gray-800">
                            | Privacy
                        </a>
                    </Link>
                </div>
            </div>
        </footer>

    )
}

export default Footer;


