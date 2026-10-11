export const bannersQuery = `*[_type == "banner" && isActive == true] | order(_createdAt desc) {
  _id,
  title,
  badge,
  subtitle,
  startingPrice,
  linkUrl,
  position,
  image
}`
