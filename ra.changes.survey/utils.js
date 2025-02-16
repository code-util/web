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
function ease(start, end, duration = 1000, step = 10, callback) {
    let change = end - start;
    let startTime = Date.now();

    function animate() {
        let elapsed = Date.now() - startTime;
        let progress = elapsed / duration;

        // Ease-out function: Exponential (progress is smoothed)
        let currentValue = start + change * (1 - Math.pow(2, -10 * progress));

        // Ensure the last value is exactly `end`
        if (progress >= 1) {
            callback(end);
            return;
        }

        callback(currentValue);

        setTimeout(animate, step);
    }

    animate();
}