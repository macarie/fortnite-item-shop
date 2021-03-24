export const secondLastOrLast = (array: any[]) =>
  array.length > 0
    ? array[array.length > 1 ? array.length - 2 : array.length - 1]
    : undefined

export default secondLastOrLast
