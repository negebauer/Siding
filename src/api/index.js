import { LOGIN_URL, CURRENT_COURSES_URL } from './urls'
import { parseCourses } from './parser'

// import Siding from './siding'

let SIDING_USER = ''
let SIDING_PASSWORD = ''

export function request(url, options = {}) {
  const req = new XMLHttpRequest()
  req.open(options.method || 'GET', url)
  req.withCredentials = true
  const promise = new Promise(res => {
    req.onload = function handleResponse() {
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

export function formData(json) {
  const form = new FormData()
  Object.keys(json).forEach(k => form.append(k, json[k]))
  return form
}

export async function auth(login, passwd) {
  const body = formData({ login, passwd, sw: '', sh: '', cd: '' })
  const text = await post(LOGIN_URL, { body })
  if (text.indexOf('passwd') >= 0) throw new Error('Siding auth failed')
  SIDING_USER = login
  SIDING_PASSWORD = passwd
  return Promise.resolve(true)
}

export async function getCourses() {
  await auth(SIDING_USER, SIDING_PASSWORD)
  const text = await get(CURRENT_COURSES_URL)
  return parseCourses(text)
}
