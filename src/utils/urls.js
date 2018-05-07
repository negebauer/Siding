import { SIDING_YEAR, SIDING_SEMESTER } from './date'

/**
 *  The siding base url
 *  @type {String}
 */
export const BASE_URL = 'https://intrawww.ing.puc.cl/siding'

/**
 *  The siding courses' base url
 *  @type {[type]}
 */
export const COURSES_URL = `${BASE_URL}/dirdes/ingcursos/cursos`

/**
 *  The siding login url
 *  @type {[type]}
 */
export const LOGIN_URL = `${BASE_URL}/index.phtml`

/**
 *  Returns the url with the courses list of the user for a period
 *  @author @negebauer
 *  @param  {string} semester The semester: first 21, second 22 or tav 23
 *  @param  {number} year     The year (ej 2018)
 *  @return {string}          The courses url
 */
export function coursesUrl(semester, year) {
  return `${COURSES_URL}/index.phtml?per_lista_cursos=${semester}_${year}&acc_inicio=mis_cursos`
}

/**
 *  Returns the url for a specific course
 *  @author @negebauer
 *  @param  {string} id The course id
 *  @return {string}    The course url
 */
export function courseUrl(id) {
  return `${COURSES_URL}/vista.phtml?accion_curso=avisos&acc_aviso=mostrar&id_curso_ic=${id}`
}

/**
 *  Returns the url for the courses' catalog for a period
 *  @author @negebauer
 *  @param  {string} semester The semester: first 21, second 22 or tav 23
 *  @param  {number} year     The year (ej 2018)
 *  @return {string}          The catalog url
 */
export function coursesCatalogUrl(semester, year) {
  return `${COURSES_URL}/index.phtml?acc_inicio=catalogo&per_lista_cursos=2${semester}_${year}`
}

/**
 *  Returns the url for a course folders
 *  @author @negebauer
 *  @param  {string} id       The folder id
 *  @param  {string} courseId The course id
 *  @return {string}          The course folder url
 */
export function folderUrl(id, courseId) {
  return `${COURSES_URL}/vista.phtml?accion_curso=carpetas&acc_carp=abrir_carpeta&id_curso_ic=${courseId}&id_carpeta=${id}`
}

/**
 *  The courses list url of the user for the current period
 *  @type {string}
 */
export const CURRENT_COURSES_URL = coursesUrl(SIDING_SEMESTER, SIDING_YEAR)

// courseFolderURL: link => `${baseURL}${courseURL}/${link}`,
// courseFileURL: link => `https://intrawww.ing.puc.cl${link}`,
// catalogFromURL: (year, term) =>
//   `${baseURL}${courseURL}/index.phtml?acc_inicio=catalogo&per_lista_cursos=2${term}_${year}`,
