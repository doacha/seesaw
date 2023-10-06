const addZero = (input: number) => {
  if (input < 10) {
    return '0' + input
  }
  return input
}

export const getCycleTerm = (
  start: string,
  cycleCount: number,
  period: number,
) => {
  const startDate = new Date(start)
  startDate.setDate(startDate.getDate() + (cycleCount - 1) * period)
  const endDate = new Date(start)
  endDate.setDate(endDate.getDate() + cycleCount * period - 1)

  return `(${addZero(startDate.getMonth() + 1)}.${addZero(
    startDate.getDate(),
  )} ~ ${addZero(endDate.getMonth() + 1)}.${addZero(endDate.getDate())})`
}

const SECOND = 1
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

export const getTimeBefore = (writeDate: string) => {
  const writeTime = new Date(writeDate)
  const present = new Date()
  const passedSeconds = Math.trunc(
    (present.getTime() - writeTime.getTime() - 9000 * HOUR) / 1000 + HOUR * 9,
  )
  if (passedSeconds < SECOND) {
    return '방금 전'
  } else if (passedSeconds < MINUTE) {
    return passedSeconds + '초 전'
  } else if (passedSeconds < HOUR) {
    return Math.trunc(passedSeconds / MINUTE) + '분 전'
  } else if (passedSeconds < DAY) {
    return Math.trunc(passedSeconds / HOUR) + '시간 전'
  } else if (passedSeconds < DAY * 8) {
    return Math.trunc(passedSeconds / DAY) + '일 전'
  } else {
    return writeTime.toLocaleDateString()
  }
}

export const isStarted = (date: string) => {
  const startDate = new Date(date)
  const current = new Date()
  return current.getTime() - startDate.getTime() >= 0 ? true : false
}
