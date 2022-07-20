// for user experience 200ms delay
const globalTime = 200

export default function timeOutCallback (url ="/", time = globalTime) {
  setTimeout(() => {
    window.location.replace(url)
  }, time)
}