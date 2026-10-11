'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setProduct } from '@/lib/features/product/productSlice'
import { fetchOdooProducts } from '@/lib/odoo'
import { productDummyData } from '@/assets/assets'

export default function OdooSync() {
  const dispatch = useDispatch()

  useEffect(() => {
    let isMounted = true
    async function sync() {
      try {
        const odooProducts = await fetchOdooProducts()
        if (isMounted && odooProducts && odooProducts.length > 0) {
          // Combine live Odoo products with existing catalog, putting live products first
          const odooIds = new Set(odooProducts.map((p) => String(p.id)))
          const remainingCatalog = productDummyData.filter((p) => !odooIds.has(String(p.id)))
          dispatch(setProduct([...odooProducts, ...remainingCatalog]))
        }
      } catch (err) {
        console.warn('Odoo catalog sync notice:', err)
      }
    }
    sync()
    return () => {
      isMounted = false
    }
  }, [dispatch])

  return null
}
