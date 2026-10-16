'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useCurrency } from '@/lib/useCurrency'

const ProductCard = ({ product }) => {

    const { formatPrice } = useCurrency();

    return (
        <Link href={`/product/${product.id}`} className='group max-xl:mx-auto'>
            <div className='bg-[#F5F5F5] h-40 sm:w-60 sm:h-68 rounded-lg flex items-center justify-center overflow-hidden'>
                <Image width={500} height={500} className='w-full h-full object-cover group-hover:scale-105 transition duration-300' src={product.images[0]} alt={product.name || ""} />
            </div>
            <div className='flex justify-between items-start gap-3 text-sm text-slate-800 pt-2 max-w-60'>
                <div>
                    <p className='font-medium line-clamp-2'>{product.name}</p>
                </div>
                <p className="font-semibold whitespace-nowrap">{formatPrice(product.price)}</p>
            </div>
        </Link>
    )
}

export default ProductCard