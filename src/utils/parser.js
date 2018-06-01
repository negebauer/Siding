import { DOMParser } from 'react-native-html-parser'

/**
 *  The DOMParser for parsing siding responses
 *  @type {DOMParser}
 */
const parser = new DOMParser({
  errorHandler: {
    warning: () => {},
  },
})

/**
 *  Parse a courses' list page to read its courses
 *  @author @negebauer
 *  @param  {String} html     The full html of the main courses page
 *  @return {Array<Object>}   An array with course objects { id, acronym, name, section, folder: {} }
 */
export function parseCourses(html, semester, year) {
  return parser
    .parseFromString(html)
    .querySelect('a')
    .filter(anchor => anchor.getAttribute('href').indexOf('id_curso_ic') >= 0)
    .map(anchor => {
      const id = anchor.getAttribute('href').split('id_curso_ic=')[1]
      const text = anchor.textContent
      const split = text.split(/ s\.[0-9] /)
      const acronym = split[0]
      const name = split[1]
      const section = text.split(' ')[1].match(/\d+/)[0]
      return { id, acronym, name, section, semester, year, folders: {} }
    })
}

/**
 *  Parses a siding course's page to read it's folders
 *  @author @negebauer
 *  @param  {String} html        The siding course's page
 *  @return {Array<Object>}      An array of siding courses { id, name }
 */
export function parseCourse(html) {
  return parser
    .parseFromString(html)
    .querySelect('a')
    .filter(anchor => anchor.getAttribute('href').indexOf('acc_carp') >= 0)
    .map(anchor => {
      const id = anchor
        .getAttribute('href')
        .match(/id_carpeta=\d+/g)[0]
        .split('=')[1]
      const name = anchor.textContent
      return { id, name }
    })
}

export function parseFolder(html) {
  const doc = parser.parseFromString(html)
  const links = doc
    .querySelect('a')
    .filter(anchor => anchor.getAttribute('href').indexOf('id_archivo') >= 0)
    .map(anchor => ({
      href: anchor.getAttribute('href'),
      text: anchor.textContent,
    }))
  return links
}
