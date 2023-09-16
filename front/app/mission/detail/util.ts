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
