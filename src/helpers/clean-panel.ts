const numberRegExp = /(\d+)/

export const cleanPanel = (panel: string) =>
  Number(numberRegExp.exec(panel)?.[0] ?? 0)

export default cleanPanel
