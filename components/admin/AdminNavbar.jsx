'use client'
import Link from "next/link"

const AdminNavbar = () => {


    return (
        <div className="flex items-center justify-between px-12 py-3 border-b border-slate-200 transition-all">
            <Link href="/" className="relative">
                <img src="/logo-primary.png" alt="doudy.store admin" className="w-56 md:w-64 -my-6 object-contain" />
                <p className="absolute text-[10px] font-semibold -top-2 -right-8 px-2 py-0.5 rounded-full flex items-center gap-2 text-white bg-green-500">
                    Admin
                </p>
            </Link>
            <div className="flex items-center gap-3">
                <p>Hi, Admin</p>
            </div>
        </div>
    )
}

export default AdminNavbar