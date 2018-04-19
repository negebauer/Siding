import { DOMParser } from 'react-native-html-parser'

const parser = new DOMParser({
  errorHandler: {
    warning: () => {},
  },
})

export function parseCourses(text) {
  const doc = parser.parseFromString(text, 'text/html')

  // $("a").each((i, l) => {
  //       const link = $(l).attr("href")
  //       if (link.indexOf("id_curso_ic") === -1) {
  //         return
  //       }
  //       const courseId = link.split("id_curso_ic=")[1]
  //       const courseText = $(l).text()
  //       const courseSplit = courseText.split(/ s\.[0-9] /)
  //       const courseSection = courseText.split(" ")[1].match(/\d+/)[0]
  //       const courseAcronym = courseSplit[0]
  //       if (ignore.indexOf(courseAcronym) !== -1) {
  //         return
  //       }
  //       const courseName = courseSplit[1]
  //       courses.push(
  //         new course(courseId, courseAcronym, courseName, courseSection)
  //       )
  //     })

  const courses = doc
    .querySelect('a')
    .filter(anchor => anchor.getAttribute('href').indexOf('id_curso_ic') >= 0)
    .map(anchor => ({
      href: anchor.getAttribute('href'),
      text: anchor.textContent,
    }))
  return courses
}

export function a() {}
