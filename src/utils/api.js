import autobind from 'autobind-decorator'
import {
  LOGIN_URL,
  LOGOUT_URL,
  CURRENT_COURSES_URL,
  coursesUrl,
  courseUrl,
  folderUrl,
} from './urls'
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
 *  A siding api client
 *  @type {Object}
 */
export default class Api {
  constructor() {
    this.username = ''
    this.password = ''
  }

  /**
   *  Executes a siding request
   *  @author @negebauer
   *  @param  {String} url          The url to perform the request to
   *  @param  {Object} [options={]} Additional request options
   *  @param  {Number} [repeat=1]   How many times the request has been tried
   *  @return {Promise<Any>}        A promise that resolves with the response
   */
  @autobind
  request(url, options = {}, repeat = 1) {
    const req = new XMLHttpRequest()
    req.open(options.method || 'GET', url)
    req.withCredentials = true
    const promise = new Promise(res => {
      req.onload = () => {
        if (req.status === 500 && repeat < 6) {
          res(this.request(url, options, repeat + 1))
        }
        res(req.response)
      }
    })
    req.send(options.body)
    return wait(repeat).then(() => promise)
  }

  @autobind
  get(url, options) {
    return this.request(url, { ...options, method: 'GET' })
  }

  @autobind
  post(url, options = {}) {
    return this.request(url, { ...options, method: 'POST' })
  }

  @autobind
  authorizedGet(url, options) {
    return this.auth(this.username, this.password).then(r =>
      this.get(url, options)
    )
  }

  @autobind
  authorizedPost(url, options = {}) {
    return this.auth(this.username, this.password).then(r =>
      this.post(url, options)
    )
  }

  /**
   *  Authenticates the user with siding
   *  @author @negebauer
   *  @param  {String} login            Users' siding username
   *  @param  {String} passwd           Users' siding password
   *  @return {Promise<boolean>}        A promise that resolves to true after auth is succesfull
   */
  @autobind
  async auth(login, passwd) {
    const body = formData({ login, passwd, sw: '', sh: '', cd: '' })
    const html = await this.post(LOGIN_URL, { body })
    if (SIDING_ERROR_MESSAGES.filter(e => html.indexOf(e) >= 0).length > 0)
      throw SIDING_AUTH_FAILED
    this.username = login
    this.password = passwd
    return Promise.resolve({
      username: login,
      password: passwd,
    })
  }

  @autobind
  logout() {
    return this.get(LOGOUT_URL)
  }

  @autobind
  async getCourses(semester, year) {
    let url = CURRENT_COURSES_URL
    if (semester && year) url = coursesUrl(semester, year)
    const html = await this.authorizedGet(url)
    return parseCourses(html)
  }

  @autobind
  async getCourse(id) {
    if (!id) throw new Error('Course id required for getCourse')
    const html = await this.authorizedGet(courseUrl(id))
    return parseCourse(html)
  }

  @autobind
  async getFolder({ id, courseId }) {
    if (!id || !courseId)
      throw new Error('Folder and course id required for getFolder')
    const html = await this.authorizedGet(folderUrl(id, courseId))
    return parseFolder(html)
  }
}
