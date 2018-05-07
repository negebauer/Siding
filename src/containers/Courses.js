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
} from 'react-native'
import { login, getUsername } from '../redux/modules/user'

const mapStateToProps = state => ({
  username: getUsername(state),
})

const mapDispatchToProps = { login }

@connect(mapStateToProps, mapDispatchToProps)
export default class Courses extends Component {
  constructor() {
    super()
    this.state = {
      courses: [],
      folders: [],
    }
  }

  go = () => {
    this.props.login('asd', 'asd')

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
    console.log(this.state, this.props)

    const { isLogging, authenticated, loginError } = this.props

    if (isLogging)
      return (
        <View>
          <Text>Loading</Text>
        </View>
      )

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onChangeText={username => this.setState({ username })}
        />
        <TextInput
          style={styles.input}
          secureTextEntry
          onChangeText={password => this.setState({ password })}
        />
        <Button title="Login get courses" onPress={this.go} />
        <Text>{`Login: ${this.state.login}`}</Text>
        {this.state.loginError && (
          <Text>{`Error: ${this.state.loginError.message}`}</Text>
        )}
        {this.state.courses.map(course => (
          <View key={course.id}>
            <Text>{`${course.acronym} s${course.section} ${course.name}`}</Text>
            <Text>Carpetas</Text>
            {Object.keys(course.folders).map(id => (
              <Text key={id}>{`${course.folders[id].name}`}</Text>
            ))}
          </View>
        ))}
        {this.state.folders.map(data => (
          <Text key={data.text}>{data.text}</Text>
        ))}
      </View>
    )
  }
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
