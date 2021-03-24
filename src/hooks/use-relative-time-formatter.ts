import { useMemo } from 'react'

export const useRelativeTimeFormatter = (
  locale = 'en-US',
  numeric: 'always' | 'auto' = 'always',
  style: 'long' | 'short' | 'narrow' = 'long'
) => {
  const formatter = useMemo(
    () => new Intl.RelativeTimeFormat(locale, { numeric, style }),
    [locale, numeric, style]
  )

  return formatter
}

export default useRelativeTimeFormatter
