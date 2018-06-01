import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider, connect } from 'react-redux'
import {
  getCoursesDateList,
  getCoursesState,
  loadCourses,
} from '../redux/modules/courses'
import { goToCourse } from '../redux/modules/routes'
import CoursesList from '../components/CoursesList'

const mapStateToProps = state => ({
  courses: getCoursesDateList(state),
  loading: getCoursesState(state).loading,
  error: getCoursesState(state).error,
})

const mapDispatchToProps = {
  loadCourses,
  handleSelect: course => goToCourse(course),
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesList)
