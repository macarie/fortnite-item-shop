export const cleanSpecial = (tabName: string) =>
  tabName.startsWith('Special') ? 'Special' : tabName

export default cleanSpecial
