'use client'
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const ProductDescription = ({ product }) => {

    const hasAttributes = product.attributes && Object.keys(product.attributes).length > 0;
    const tabs = hasAttributes ? ['Description', 'Specifications'] : ['Description'];
    const [selectedTab, setSelectedTab] = useState('Description')

    return (
        <div className="my-14 text-sm text-slate-600">

            {/* Tabs */}
            {tabs.length > 1 && (
                <div className="flex border-b border-slate-200 mb-6 max-w-2xl">
                    {tabs.map((tab, index) => (
                        <button
                            className={`${tab === selectedTab ? 'border-b-2 border-slate-800 font-semibold text-slate-800' : 'text-slate-400'} px-4 py-2 font-medium transition-colors`}
                            key={index}
                            onClick={() => setSelectedTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            )}

            {/* Description */}
            {selectedTab === "Description" && (
                <p className="max-w-2xl leading-relaxed text-slate-600">{product.description}</p>
            )}

            {/* Specifications */}
            {selectedTab === "Specifications" && hasAttributes && (
                <div className="max-w-3xl">
                    <table className="w-full text-left text-sm text-slate-600 border border-slate-200 rounded-lg overflow-hidden">
                        <tbody>
                            {Object.entries(product.attributes).map(([key, value], idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? "bg-slate-50/60" : "bg-white"}>
                                    <td className="py-2.5 px-4 font-medium text-slate-800 w-1/3 border-b border-slate-100">{key}</td>
                                    <td className="py-2.5 px-4 border-b border-slate-100">{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Store Page */}
            {product.store && (
                <div className="flex gap-3 mt-12 pt-6 border-t border-slate-200">
                    <Image src={product.store.logo} alt="" className="size-11 rounded-full ring ring-slate-200" width={100} height={100} />
                    <div>
                        <p className="font-medium text-slate-700">Product by {product.store.name}</p>
                        <Link href={`/shop/${product.store.username}`} className="flex items-center gap-1 text-slate-800 font-medium hover:underline text-xs mt-0.5">
                            View store <ArrowRight size={13} />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductDescription