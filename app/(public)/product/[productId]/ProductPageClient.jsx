'use client'

import ProductDescription from "@/components/ProductDescription";
import ProductDetails from "@/components/ProductDetails";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchOdooProducts } from "@/lib/odoo";
import { productDummyData } from "@/assets/assets";

export default function Product() {
    const { productId } = useParams();
    const [product, setProduct] = useState();
    const products = useSelector(state => state.product.list);

    useEffect(() => {
        let isMounted = true;
        const load = async () => {
            let found = products.find((p) => String(p.id) === String(productId));
            if (!found) {
                found = productDummyData.find((p) => String(p.id) === String(productId));
            }
            if (!found && String(productId).startsWith('odoo_')) {
                const odooProds = await fetchOdooProducts();
                found = odooProds.find((p) => String(p.id) === String(productId));
            }
            if (isMounted && found) {
                setProduct(found);
            }
        };
        load();
        scrollTo(0, 0);
        return () => { isMounted = false; };
    }, [productId, products]);

    return (
        <div className="mx-6">
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumbs */}
                <div className="text-gray-600 text-sm mt-8 mb-5">
                    Home / Products / {product?.category || '...'}
                </div>

                {/* Product Details */}
                {product ? (
                    <>
                        <ProductDetails product={product} />
                        <ProductDescription product={product} />
                    </>
                ) : (
                    <div className="py-24 text-center text-slate-400">
                        Loading product details...
                    </div>
                )}
            </div>
        </div>
    );
}
