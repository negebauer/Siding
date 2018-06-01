import { push, replace } from 'react-router-redux'

import { routeNames, routeNameToLocation as location } from '../../routes'

export function goTo(routeName, additionalProps, params) {
  const pathname = location(routeName, params)
  return push(pathname, additionalProps)
}

export function goToCourse(course) {
  return goTo(routeNames.course, undefined, { id: course.id })
}
