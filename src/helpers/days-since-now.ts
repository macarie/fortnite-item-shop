const msInDay = 1000 * 60 * 60 * 24

export const daysSinceNow = (date: Date) => {
  const now = Date.now()

  return Math.ceil((date.getTime() - now) / msInDay)
}

export default daysSinceNow
