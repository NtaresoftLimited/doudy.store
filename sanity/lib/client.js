import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, isSanityConfigured } from '../env'
import { bannersQuery } from './queries'

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null

export async function fetchBanners() {
  if (!client) {
    return []
  }
  try {
    const banners = await client.fetch(bannersQuery)
    return banners || []
  } catch (error) {
    console.warn('Failed to fetch banners from Sanity:', error)
    return []
  }
}
