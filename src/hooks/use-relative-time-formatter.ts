import mem from 'mem'

export const useRelativeTimeFormatter = mem(
  (
    locale = 'en-US',
    numeric: 'always' | 'auto' = 'always',
    style: 'long' | 'short' | 'narrow' = 'long'
  ) => {
    const formatter = new Intl.RelativeTimeFormat(locale, { numeric, style })

    return formatter
  },
  {
    cacheKey: (args) => args.join(','),
  }
)

export default useRelativeTimeFormatter
