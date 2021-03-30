const numberRegExp = /(\d+)/

export const getPanelNumber = (panel: string) =>
  Number(numberRegExp.exec(panel)?.[0] ?? 0)

export default getPanelNumber
