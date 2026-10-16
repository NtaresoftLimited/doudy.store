export const ODOO_BASE_URL =
  process.env.NEXT_PUBLIC_ODOO_API_URL || 'https://app.doudy.store'

export async function fetchOdooProducts() {
  try {
    const res = await fetch(`${ODOO_BASE_URL}/api/products`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) {
      throw new Error(`Odoo API responded with ${res.status}`)
    }
    const data = await res.json()
    if (!data.success || !Array.isArray(data.products)) {
      return []
    }

    // Filter out shipping fees, generic charges, and products without images
    return data.products
      .filter((p) => p.name && p.price > 0 && p.images && p.images.length > 0)
      .map((p) => {
        const fullImages = p.images.map((img) =>
          img.url.startsWith('http') ? img.url : `${ODOO_BASE_URL}${img.url}`
        )
        return {
          id: `odoo_${p.id}`,
          odooId: p.id,
          name: p.name,
          description: p.description || p.name,
          mrp: Math.round(p.price * 1.2),
          price: p.price,
          images: fullImages,
          category: p.category || 'Machinery & Tools',
          inStock: true,
          storeId: 'odoo_store',
          rating: [],
          store: {
            id: 'odoo_store',
            name: 'Doudy Store Official',
            username: 'doudystore',
            logo: '/logo-primary.png'
          }
        }
      })
  } catch (error) {
    console.warn('Failed to fetch products from Odoo backend:', error)
    return []
  }
}

export async function trackShipment(trackingNumber) {
  if (!trackingNumber) {
    throw new Error('Tracking number is required')
  }
  const cleanNumber = trackingNumber.trim()
  const res = await fetch(
    `${ODOO_BASE_URL}/api/track?tracking_number=${encodeURIComponent(cleanNumber)}`,
    { cache: 'no-store' }
  )
  if (!res.ok) {
    throw new Error(`Tracking lookup failed with status ${res.status}`)
  }
  return await res.json()
}

export function getOdooLoginUrl() {
  return `${ODOO_BASE_URL}/web/login`
}
