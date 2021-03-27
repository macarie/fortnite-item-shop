export const createClassName = (classNames: Array<string | false>) =>
  classNames.filter((className) => Boolean(className)).join(' ')

export default createClassName
