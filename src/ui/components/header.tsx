import React from 'react'

const Header = () => {
    return (
        <header className="fixed top-0 left-0 w-full h-15 bg-white shadow flex items-center justify-start px-6 z-50">
            <img src="/logo.jpeg" alt="Logo" className="h-12 object-contain" />
        </header>
    )
}

export default Header