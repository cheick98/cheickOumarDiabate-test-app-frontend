import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
    return (
        <aside className="fixed top-0 left-0 h-full w-60 bg-gray-100 shadow-md pt-20 px-4">
            <nav className="flex flex-col space-y-4">
                <Link href="/programs" className="text-gray-700 hover:text-blue-600 font-medium">
                    Programs
                </Link>
                <Link href="/levels" className="text-gray-700 hover:text-blue-600 font-medium">
                    Levels
                </Link>
                <Link href="/students" className="text-gray-700 hover:text-blue-600 font-medium">
                    Students
                </Link>
            </nav>
        </aside>

    )
}

export default Sidebar