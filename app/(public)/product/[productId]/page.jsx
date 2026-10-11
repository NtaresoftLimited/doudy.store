import ProductPageClient from './ProductPageClient';
import { productDummyData } from '@/assets/assets';
import { fetchOdooProducts } from '@/lib/odoo';

export async function generateStaticParams() {
  const odooProducts = await fetchOdooProducts();
  const allProducts = [...productDummyData, ...odooProducts];
  return allProducts.map((product) => ({
    productId: String(product.id),
  }));
}

export default function Page() {
  return <ProductPageClient />;
}
