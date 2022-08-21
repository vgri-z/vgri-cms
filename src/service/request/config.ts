let BASE_URL = ''
let BASE_NAME = ''

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://httobin.org/dev'
  BASE_NAME = 'vgri'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://httpbin.org/prod'
  BASE_NAME = 'vae'
} else {
  BASE_URL = 'http://httpbin.org/test'
  BASE_NAME = 'silence'
}

export { BASE_URL, BASE_NAME }
