gsap.registerPlugin(ScrollTrigger)

const splitTypes = document.querySelectorAll('.reveal-type')

splitTypes.forEach((word, i) => {
    const text = new SplitType(word, { types: 'words' })
    
    gsap.from(text.words, {
        scrollTrigger: {
            trigger: word,
            start: 'top 60%',
            end: 'bottom 50%',
            scrub: true,
            markers: false,
        },
        opacity: 0.2,
        stagger: 0.7
    })
})


const lenis = new Lenis()

lenis.on('scroll', (e) => {
    console.log(e)
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)