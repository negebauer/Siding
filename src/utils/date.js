export function sidingSemester(date) {
  const month = date.getMonth() + 1
  if (month === 1) return '23'
  else if (month <= 7) return '21'
  return '22'
}

export const CURRENT_DATE = new Date()
export const SIDING_YEAR = CURRENT_DATE.getFullYear()
export const SIDING_SEMESTER = sidingSemester(CURRENT_DATE)
