export const createAndFillArray = (length: number) => {
  const array = new Array(length).fill('small')

  if (length % 2 === 1) {
    array[0] = 'normal'
  }

  return array
}
