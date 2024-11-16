const get = (selector, element = document) => element.querySelector(selector)
const getAll = (selector, element = document) => element.querySelectorAll(selector)
const show = (...elements) => elements.forEach(element => {
    element.classList.remove('hidden')
    element.classList.add('show')
})
const hide = (...elements) => elements.forEach(element => {
    element.classList.add('hidden')
    element.classList.remove('show')
})
const NO_DATA = 'NO DATA'

const state = {
    MAP: 'MAP',
    INFO: 'INFO'
}
