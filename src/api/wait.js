export const WAIT_SECONDS = 0.2

export default function wait(repeat = 1) {
  const waitTime = repeat * WAIT_SECONDS * 1000
  return new Promise(res => setTimeout(() => res(), waitTime))
}
