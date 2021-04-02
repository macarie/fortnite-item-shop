export const fixSpecialFeaturedName = (name: string) => {
  if (name.startsWith('Special')) {
    return 'Special'
  }

  return name
    .replace(/B$/, '')
    .replace(/([A-Z\d])/g, ' $1')
    .trim()
}

export default fixSpecialFeaturedName
