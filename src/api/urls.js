import { SIDING_YEAR, SIDING_SEMESTER } from '../utils/date'

export const BASE_URL = 'https://intrawww.ing.puc.cl/siding'
export const COURSES_URL = `${BASE_URL}/dirdes/ingcursos/cursos`
export const LOGIN_URL = `${BASE_URL}/index.phtml`

export function coursesUrl(semester, year) {
  return `${COURSES_URL}/index.phtml?per_lista_cursos=${semester}_${year}&acc_inicio=mis_cursos`
}

export function courseUrl(id) {
  return `${COURSES_URL}/index.phtml?id_curso_ic=${id}`
}

export const CURRENT_COURSES_URL = coursesUrl(SIDING_SEMESTER, SIDING_YEAR)

// courseFolderURL: link => `${baseURL}${courseURL}/${link}`,
// courseFileURL: link => `https://intrawww.ing.puc.cl${link}`,
// catalogFromURL: (year, term) =>
//   `${baseURL}${courseURL}/index.phtml?acc_inicio=catalogo&per_lista_cursos=2${term}_${year}`,