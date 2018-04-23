import {
  LOGIN_URL,
  CURRENT_COURSES_URL,
  coursesUrl,
  courseUrl,
  folderUrl,
} from './urls'
import { parseCourses, parseCourse, parseFolder } from './parser'
import wait from './wait'

let SIDING_USER = ''
let SIDING_PASSWORD = ''

export function request(url, options = {}, repeat = 1) {
  const req = new XMLHttpRequest()
  req.open(options.method || 'GET', url)
  req.withCredentials = true
  const promise = new Promise(res => {
    req.onload = function handleResponse() {
      if (req.status === 500 && repeat < 5) {
        wait(repeat)
        res(request(url, options, repeat + 1))
      }
      res(req.response)
    }
  })
  req.send(options.body)
  return promise
}

export function get(url, options) {
  return request(url, { ...options, method: 'GET' })
}

export function post(url, options = {}) {
  return request(url, { ...options, method: 'POST' })
}

export function authorizedGet(url, options) {
  return auth(SIDING_USER, SIDING_PASSWORD).then(r => get(url, options))
}

export function authorizedPost(url, options = {}) {
  return auth(SIDING_USER, SIDING_PASSWORD).then(r => post(url, options))
}

export function formData(json) {
  const form = new FormData()
  Object.keys(json).forEach(k => form.append(k, json[k]))
  return form
}

export async function auth(login, passwd) {
  const body = formData({ login, passwd, sw: '', sh: '', cd: '' })
  const html = await post(LOGIN_URL, { body })
  if (html.indexOf('passwd') >= 0) throw new Error('Siding auth failed')
  SIDING_USER = login
  SIDING_PASSWORD = passwd
  return Promise.resolve(true)
}

export async function getCourses({ semester, year } = {}) {
  let url = CURRENT_COURSES_URL
  if (semester && year) url = coursesUrl(semester, year)
  const html = await authorizedGet(url)
  return parseCourses(html)
}

export async function getCourse(id) {
  if (!id) throw new Error('Course id required for getCourse')
  const html = await authorizedGet(courseUrl(id))
  return parseCourse(html)
}

export async function getFolder({ id, courseId }) {
  if (!id || !courseId)
    throw new Error('Folder and course id required for getFolder')
  const html = await authorizedGet(folderUrl({ id, courseId }))
  return parseFolder(html)
}
