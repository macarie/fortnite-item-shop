export const fixSpecialFeaturedName = (name: string) => {
  if (name.endsWith('B')) {
    return name
      .replace(/B$/, '')
      .replace(/([A-Z\d])/g, ' $1')
      .trim()
  }

  if (name.startsWith('Special')) {
    return 'Special'
  }

  return name
}

export default fixSpecialFeaturedName
