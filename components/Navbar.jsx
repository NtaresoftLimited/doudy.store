'use client'
import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useCurrency } from "@/lib/useCurrency";

const Navbar = () => {

    const router = useRouter();

    const [search, setSearch] = useState('');
    const cartCount = useSelector(state => state.cart.total);
    const { selectedCurrency, changeCurrency } = useCurrency();

    const handleSearch = (e) => {
        e.preventDefault();
        router.push(`/shop?search=${search}`);
    };

    return (
        <nav className="relative bg-white">
            <div className="mx-6">
                <div className="flex items-center justify-between max-w-7xl mx-auto py-4 transition-all">

                    <Link href="/">
                        <img src="/logo-primary.png" alt="doudy.store" className="h-12 md:h-14 w-auto object-contain" />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex items-center gap-4 lg:gap-6 text-slate-600">
                        <Link href="/">Home</Link>
                        <Link href="/shop">Shop</Link>
                        <Link href="/track">Track Order</Link>
                        <Link href="/">About</Link>
                        <Link href="/">Contact</Link>

                        <form onSubmit={handleSearch} className="hidden xl:flex items-center w-xs text-sm gap-2 bg-slate-100 px-4 py-2.5 rounded-full">
                            <Search size={18} className="text-slate-600" />
                            <input className="w-full bg-transparent outline-none placeholder-slate-600" type="text" placeholder="Search products" value={search} onChange={(e) => setSearch(e.target.value)} required />
                        </form>

                        {/* Currency Selector (TSh / Fbu only) */}
                        <div className="flex items-center bg-slate-100 rounded-full p-0.5 border border-slate-200 text-xs font-semibold">
                            <button
                                type="button"
                                onClick={() => changeCurrency('TSh')}
                                className={`px-2.5 py-1 rounded-full transition-all ${selectedCurrency === 'TSh' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                                title="Tanzanian Shilling (TSh)"
                            >
                                TSh
                            </button>
                            <button
                                type="button"
                                onClick={() => changeCurrency('Fbu')}
                                className={`px-2.5 py-1 rounded-full transition-all ${selectedCurrency === 'Fbu' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                                title="Burundian Franc (Fbu)"
                            >
                                Fbu
                            </button>
                        </div>

                        <Link href="/cart" className="relative flex items-center gap-2 text-slate-600">
                            <ShoppingCart size={18} />
                            Cart
                            <button className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full">{cartCount}</button>
                        </Link>

                        <a href="https://app.doudy.store/web/login" className="px-7 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
                            Login
                        </a>

                    </div>

                    {/* Mobile Menu  */}
                    <div className="sm:hidden flex items-center gap-2.5">
                        {/* Currency Selector (TSh / Fbu only) */}
                        <div className="flex items-center bg-slate-100 rounded-full p-0.5 border border-slate-200 text-[11px] font-semibold">
                            <button
                                type="button"
                                onClick={() => changeCurrency('TSh')}
                                className={`px-2 py-0.5 rounded-full transition-all ${selectedCurrency === 'TSh' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-600'}`}
                            >
                                TSh
                            </button>
                            <button
                                type="button"
                                onClick={() => changeCurrency('Fbu')}
                                className={`px-2 py-0.5 rounded-full transition-all ${selectedCurrency === 'Fbu' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-600'}`}
                            >
                                Fbu
                            </button>
                        </div>

                        <Link href="/cart" className="relative flex items-center text-slate-600 p-1">
                            <ShoppingCart size={20} />
                            <span className="absolute -top-1 -right-1 text-[8px] text-white bg-slate-600 size-3.5 rounded-full flex items-center justify-center">{cartCount}</span>
                        </Link>

                        <a href="https://app.doudy.store/web/login" className="px-4 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-xs transition text-white rounded-full font-medium">
                            Login
                        </a>
                    </div>
                </div>
            </div>
            <hr className="border-gray-200" />
        </nav>
    )
}

export default Navbar