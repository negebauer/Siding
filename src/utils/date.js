/**
 *  Transforms a month into a siding semester
 *  @author @negebauer
 *  @param  {Date} date The date to obtain the month from
 *  @return {String}   The siding semester (21, 22 or 23)
 */
export function sidingSemester(date) {
  const month = date.getMonth() + 1
  if (month === 1) return '23'
  else if (month <= 7) return '21'
  return '22'
}

/**
 *  The user's current date
 *  @type {Date}
 */
export const CURRENT_DATE = new Date()

/**
 *  The current siding year
 *  @type {number}
 */
export const SIDING_YEAR = CURRENT_DATE.getFullYear()

/**
 *  The current siding semester
 *  @type {String}
 */
export const SIDING_SEMESTER = sidingSemester(CURRENT_DATE)

export function sidingDateId(semester = SIDING_SEMESTER, year = SIDING_YEAR) {
  return `${year}-${semester}`
}

export function sidingDateIdHuman(dateId) {
  const [year, semester] = dateId.split('-')
  switch (semester) {
    case '23':
      return `${year}-TAV`
    case '22':
      return `${year}-2`
    case '21':
      return `${year}-1`
  }
}
