export const fixSpecialFeaturedName = (name: string) =>
  name.endsWith('B')
    ? name
        .replace(/B$/, '')
        .replace(/([A-Z\d])/g, ' $1')
        .trim()
    : name

export default fixSpecialFeaturedName
