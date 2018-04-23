export const WAIT_SECONDS = 0.2

export default function wait(repeat = 1) {
  for (let i = 0; i < repeat; i++) {
    const waitTill = new Date(new Date().getTime() + WAIT_SECONDS * 1000)
    while (waitTill > new Date()) {
      // Do nothing
    }
  }
}
