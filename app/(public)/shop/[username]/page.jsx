import StoreShopClient from './StoreShopClient';
import { storesDummyData } from '@/assets/assets';

export function generateStaticParams() {
  return storesDummyData.map((store) => ({
    username: store.username,
  }));
}

export default function Page() {
  return <StoreShopClient />;
}
