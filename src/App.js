import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  LayoutAnimation,
  StatusBar,
} from 'react-native'
import { auth, getCourses, getCourse, getFolder } from './api'

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

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      login: false,
      loginError: undefined,
      courses: [],
      folders: [],
      loading: false,
    }
  }

  go = async () => {
    try {
      // https://github.com/futuretap/FTLinearActivityIndicator for iPhone X
      this.setState({ login: false, loginError: undefined, loading: true })
      const login = await auth(this.state.username, this.state.password)
      this.setState({ login })
      const courses = await getCourses()
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
      this.setState({ courses })
      await Promise.all(
        courses.map(async (course, i) => {
          const folders = await getCourse(course.id)
          courses[i].folders = folders
        })
      )
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      this.setState({ courses })
      // const folders = await getFolder({ courseId: '10252', id: '63183' })
      // LayoutAnimation.configureNext(LayoutAnimation.Presets.linear)
      // this.setState({ folders, loading: false })
    } catch (loginError) {
      this.setState({ loginError })
    }
  }

  render() {
    console.log(this.state)
    return (
      <View style={styles.container}>
        <StatusBar networkActivityIndicatorVisible={this.state.loading} />
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
