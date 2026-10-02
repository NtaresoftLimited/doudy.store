import ProductPageClient from './ProductPageClient';
import { productDummyData } from '@/assets/assets';

export function generateStaticParams() {
  return productDummyData.map((product) => ({
    productId: product.id,
  }));
}

export default function Page() {
  return <ProductPageClient />;
}
