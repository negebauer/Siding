/**
 *  Transforms a month into a siding semester
 *  @author @negebauer
 *  @param  {Date} date The date to obtain the month from
 *  @return {string}   The siding semester (21, 22 or 23)
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
 *  @type {string}
 */
export const SIDING_SEMESTER = sidingSemester(CURRENT_DATE)
