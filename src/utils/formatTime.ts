function formatTime(ms: number) {
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour

  const days = Math.floor(ms / day)

  if (days < 0) {
    return ''
  }

  const hourCount = Math.floor((ms - days * day) / hour)
  const minuteCount = Math.floor((ms - days * day - hourCount * hour) / minute)
  const secondCount = Math.floor(
    (ms - days * day - hourCount * hour - minuteCount * minute) / 1000,
  )

  const HH = `${hourCount}`.padStart(2, '0')
  const mm = `${minuteCount}`.padStart(2, '0')
  const SS = `${secondCount}`.padStart(2, '0')

  return days > 0 ? `${days}일 ${HH}:${mm}:${SS}` : `${HH}:${mm}:${SS}`
}

export default formatTime
