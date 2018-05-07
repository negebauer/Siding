/**
 *  The time, in seconds, to wait before retrying a siding request
 *  @type {number}
 */
export const WAIT_SECONDS = 0.5

/**
 *  Waits the WAIT_SECONDS times the amount of repeats
 *  @author @negebauer
 *  @param  {Number} [repeat=1] Times to repeat WAIT_SECONDS
 *  @return {Promise}           A promise that resolves when the time is passed
 */
export default function wait(repeat = 1) {
  console.log('wait')
  const waitTime = repeat * WAIT_SECONDS * 1000
  return new Promise(res => setTimeout(() => res(), waitTime))
}
