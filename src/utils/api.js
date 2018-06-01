import {
  LOGIN_URL,
  LOGOUT_URL,
  CURRENT_COURSES_URL,
  coursesUrl,
  courseUrl,
  folderUrl,
} from './urls'
import { SIDING_SEMESTER, SIDING_YEAR } from './date'
import { parseCourses, parseCourse, parseFolder } from './parser'
import wait from './wait'

/**
 *  Strings that appear on a siding login failed page
 *  @type {Array<String>}
 */
const SIDING_ERROR_MESSAGES = ['passwd', 'Datos de ingreso incorrectos']

/**
 *  Siding authentication failed error
 *  @type {Error}
 */
export const SIDING_AUTH_FAILED = new Error('Siding auth failed')

let SIDING_USERNAME = ''
let SIDING_PASSWORD = ''

/**
 *  Transforms a json into a FormData object
 *  @author @negebauer
 *  @param  {Object} json The json object to convert
 *  @return {FormData}    A FormData with the json data
 */
export function formData(json) {
  const form = new FormData()
  Object.keys(json).forEach(k => form.append(k, json[k]))
  return form
}

/**
 *  Executes a siding request
 *  @author @negebauer
 *  @param  {String} url          The url to perform the request to
 *  @param  {Object} [options={]} Additional request options
 *  @param  {Number} [repeat=1]   How many times the request has been tried
 *  @return {Promise<Any>}        A promise that resolves with the response
 */
export function request(url, options = {}, repeat = 1) {
  const req = new XMLHttpRequest()
  req.open(options.method || 'GET', url)
  req.withCredentials = true
  const promise = new Promise(res => {
    req.onload = () => {
      if (req.status === 500 && repeat < 6) {
        res(request(url, options, repeat + 1))
      }
      res(req.response)
    }
  })
  req.send(options.body)
  return wait(repeat).then(() => promise)
}

export function get(url, options) {
  return request(url, { ...options, method: 'GET' })
}

export function post(url, options = {}) {
  return request(url, { ...options, method: 'POST' })
}

export function authorizedGet(url, options) {
  return auth(SIDING_USERNAME, SIDING_PASSWORD).then(r => get(url, options))
}

export function authorizedPost(url, options = {}) {
  return auth(SIDING_USERNAME, SIDING_PASSWORD).then(r => post(url, options))
}

/**
 *  Authenticates the user with siding
 *  @author @negebauer
 *  @param  {String} login            Users' siding username
 *  @param  {String} passwd           Users' siding password
 *  @return {Promise<boolean>}        A promise that resolves to true after auth is succesfull
 */
export async function auth(login, passwd) {
  const body = formData({ login, passwd, sw: '', sh: '', cd: '' })
  const html = await post(LOGIN_URL, { body })
  if (SIDING_ERROR_MESSAGES.filter(e => html.indexOf(e) >= 0).length > 0)
    throw SIDING_AUTH_FAILED
  SIDING_USERNAME = login
  SIDING_PASSWORD = passwd
  return Promise.resolve({
    username: login,
    password: passwd,
  })
}

export function logout() {
  return get(LOGOUT_URL)
}

export async function loadCourses(semester, year) {
  if (semester && year) {
    const html = await authorizedGet(coursesUrl(semester, year))
    return parseCourses(html, semester, year)
  } else {
    const html = await authorizedGet(CURRENT_COURSES_URL)
    return parseCourses(html, SIDING_SEMESTER, SIDING_YEAR)
  }
}

export async function loadCourse(id) {
  if (!id) throw new Error('Course id required for getCourse')
  const html = await authorizedGet(courseUrl(id))
  return parseCourse(html)
}

export async function loadFolder({ id, courseId }) {
  if (!id || !courseId)
    throw new Error('Folder and course id required for getFolder')
  const html = await authorizedGet(folderUrl(id, courseId))
  return parseFolder(html)
}
