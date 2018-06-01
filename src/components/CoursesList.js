import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  Text,
  Button,
  ActivityIndicator,
  LayoutAnimation,
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})

function keyExtractor(course) {
  return course.id
}

export default class CoursesList extends React.Component {
  componentDidUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
  }

  renderCourse = ({ item: course }) => {
    const { handleSelect } = this.props
    return (
      <TouchableWithoutFeedback onPress={() => handleSelect(course)}>
        <View>
          <Text>{`${course.acronym} s${course.section} ${course.name}`}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    const { courses, loading, error, loadCourses } = this.props
    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator />}
        {error && <Text>{error}</Text>}
        <FlatList
          data={courses}
          keyExtractor={keyExtractor}
          renderItem={this.renderCourse}
        />
        <Button title="Cargar cursos" onPress={loadCourses} />
      </View>
    )
  }
}

CoursesList.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSelect: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
}
