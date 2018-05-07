import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider, connect } from 'react-redux'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  LayoutAnimation,
  ActivityIndicator,
} from 'react-native'
import autobind from 'autobind-decorator'
import {
  getCoursesList,
  getCoursesLoading,
  getCoursesError,
  loadCourses,
} from '../redux/modules/courses'

const mapStateToProps = state => ({
  courses: getCoursesList(state),
  loading: getCoursesLoading(state),
  error: getCoursesError(state),
})

const mapDispatchToProps = {
  loadCourses,
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Courses extends Component {
  componentDidMount() {}

  go = () => {
    // https://github.com/futuretap/FTLinearActivityIndicator for iPhone X
    // const api = new Api()
    // const login = await api.auth(this.state.username, this.state.password)
    // this.setState({ login })
    // const courses = await api.getCourses()
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    // this.setState({ courses })
    // for (let i = 0; i < courses.length; i++) {
    //   const folders = await api.getCourse(courses[i].id)
    //   courses[i].folders = folders
    //   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    //   this.setState({ courses })
    // }
    // this.setState({ loading: false })
  }

  render() {
    console.log(this.props)
    const { courses, loading, error, loadCourses } = this.props
    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator />}
        {error && <Text>{error}</Text>}
        {courses.map(course => (
          <View key={course.id}>
            <Text>{`${course.acronym} s${course.section} ${course.name}`}</Text>
            <Text>Carpetas</Text>
            {Object.keys(course.folders).map(id => (
              <Text key={id}>{`${course.folders[id].name}`}</Text>
            ))}
          </View>
        ))}
        <Button title="Cargar cursos" onPress={loadCourses} />
      </View>
    )
  }
}

Courses.defaultProps = {
  courses: [],
}

Courses.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.object),
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    height: 40,
    width: '60%',
    borderColor: 'gray',
    borderWidth: 1,
  },
})
