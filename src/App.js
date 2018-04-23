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
      course: [],
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
      const course = await getCourse('10252')
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      this.setState({ course })
      const folders = await getFolder({ courseId: '10252', id: '63183' })
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear)
      this.setState({ folders, loading: false })
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
          <Text key={course.text}>{course.text}</Text>
        ))}
        {this.state.course.map(data => (
          <Text key={data.text}>{data.text}</Text>
        ))}
        {this.state.folders.map(data => (
          <Text key={data.text}>{data.text}</Text>
        ))}
      </View>
    )
  }
}
