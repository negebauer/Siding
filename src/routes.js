import keyMirror from 'keymirror'
import pathToRegexp from 'path-to-regexp'
import queryString from 'query-string'

const ROUTES = {
  initialScreen: '/',
  currentCourses: '/currentCourses',
  course: '/course/:id',
}

const compiledRoutePaths = {}

export const routeNames = keyMirror(ROUTES)

export function buildUrl(path, params, search) {
  compiledRoutePaths[path] =
    compiledRoutePaths[path] || pathToRegexp.compile(path)
  const searchString = search ? `?${queryString.stringify(search)}` : ''
  return `${compiledRoutePaths[path](params)}${searchString}`
}

export function routeNameToPath(routeName) {
  return ROUTES[routeName]
}

export function routeNameToLocation(routeName, params, search) {
  return buildUrl(routeNameToPath(routeName), params, search)
}
