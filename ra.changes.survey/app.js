class App {
    constructor() {
        this.root = get('body')
        this.choices = []

        this.maxScore = 35

        this.currentScreen = 'home'
        this.currentChoiceIndex = 0

        this.startScreen = get('.start-screen')
        this.youScreen = get('.you-screen')
        this.choiceScreen = get('.choice-screen')
        this.loveScreen = get('.love-screen')
        this.screens = [this.startScreen, this.youScreen, this.choiceScreen, this.loveScreen]
        this.forward = this.forward.bind(this)
        this.back = this.back.bind(this)

        this.question = get('#question')
        this.answer = get('#answer')
        this.qprev = get('#qprev')
        this.qnext = get('#qnext')
        this.qprev.onclick = this.back 
        this.qnext.onclick = this.forward

        this.audioPlayer = get('audio')
        this.currentAudio = null

        this.finalData = {}
        
    }

    changeScreen(screen) {
        this.screens.forEach(s => s.classList.add('hidden'))
        screen.classList.remove('hidden')
    }

    validate(callback) {
        const type = getAll('input[name="accom-type"]');
        this.selectedType = "";
        type.forEach(choice => { if (choice.checked) { this.selectedType = choice.id;}});

        if (this.selectedType.length < 1) {
            const accom = get('#accom')
            accom.classList.add('failed-validation')
            setTimeout(() => {
                accom.classList.remove('failed-validation')
            }, 2000)
            return
        }

        const level = getAll('input[name="study-level"]');
        this.selectedLevel = "";
        level.forEach(choice => { if (choice.checked) { this.selectedLevel = choice.id;}});

        if (this.selectedLevel.length < 1) {
            const levelElem = get('#level')
            levelElem.classList.add('failed-validation')
            setTimeout(() => {
                levelElem.classList.remove('failed-validation')
            }, 2000)
            return
        }

        const num = get('#rent');
        this.rent = num.value;

        if (this.rent < 1) {
            num.classList.add('failed-validation')
            setTimeout(() => {
                num.classList.remove('failed-validation')
            }, 2000)
            return
        }
        callback()
    }

    forward() {
        const nextI = this.currentChoiceIndex +1

        if (nextI > this.choices.length -1) {
            this.submit()
        } else {
            this.currentChoiceIndex = nextI
            this.buildChoice(this.choices[nextI])
        }
    }
    back() {
        const nextI = this.currentChoiceIndex -1

        if (nextI < 0) {
            this.changeScreen(this.youScreen)
        } else {
            this.currentChoiceIndex = nextI
            this.buildChoice(this.choices[nextI])
        }
    }

    addChoice(choice) {
        this.choices.push(choice)
    }

    buildChoice(choice) {
        this.question.innerText = choice.question
        this.answer.innerHTML = ''

        if (this.currentChoiceIndex == this.choices.length -1) {
            this.qnext.innerText = 'Submit'
        } else {
            this.qnext.innerText = 'Next'
        }

        if (choice instanceof Choice) {
            choice.choiceSet.forEach((c, i) => {
                const input = document.createElement('input')
                input.type = 'radio'
                input.id = 'o' + i 
                input.name = 'choice-screen'

                const label = document.createElement('label')
                label.htmlFor = 'o' + i 
                label.classList.add('select', 'select-active')
                label.innerHTML = `
                    <div class="layered">
                        <img src="${c.static}" class="splash" alt="">
                        <img src="${c.animated}" class="animation" alt="">
                    </div>
                    <p>${c.title}</p>
                `

                label.onclick = () => {
                    choice.selectOption(c.value, i)
                    if (choice.firstClick) {
                        choice.firstClick = false 
                        this.forward()
                    }
                }

                this.answer.appendChild(input)
                this.answer.appendChild(label)
            })

            if (choice.optionIndex >= 0) {
                const selected = get('#o' + choice.optionIndex)
                selected.checked = true
                this.qnext.style.display = 'block'
            } else {
                this.qnext.style.display = 'none'
            }

        } else {
            const text = document.createElement('textarea')
            text.rows = 2
            text.addEventListener('change', (e) => {
                choice.valueChanged(e.target.value)
            })
            this.answer.appendChild(text)
            this.qnext.style.display = 'block'
        }
    }

    changeMusic(type) {
        if (this.currentAudio == type) return // already playing audio

        if (type == 'music') {
            this.audioPlayer.src = './assets/sound/music.mp3'
            this.audioPlayer.loop = true
        } else if (type == 'done') {
            this.audioPlayer.src = './assets/sound/done.mp3'
            this.audioPlayer.loop = false
        } else {
            this.audioPlayer.src = ''
        }


        this.currentAudio = type
        this.audioPlayer.volume = 0.4
        this.audioPlayer.load()
        this.audioPlayer.play()
    }

    final(temperature) { // temp value 0 - 10
        this.changeScreen(this.loveScreen)

        const temp = get('#temperature')
        const message = get('#message')

        temp.innerText = (temperature * 10).toFixed(2) // to make 0 - 100

        for (let i = 0; i < this.intervals.length; i++) {
            const interval = this.intervals[i]
            if (temperature >= interval.lo && temperature <= interval.hi) {
                message.innerHTML = interval.message
                break
            }
        }

        const needle = get('.needle')
        
        setTimeout(() => {
            needle.classList.remove('needle-random')
            ease(0, (temperature / 10 * 180).toFixed(0), 6000, 10, (current) => {
                needle.style.transform = `rotate(${current}deg)`
            })
        }, 2300)
    }

    submit() {
        const action = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLScm2ddK3woJ8RU8x1IXj5KT_8VYavybB3X7NYelJfano7dBfQ/formResponse'
        const method = 'POST'

        const pairs = {}
        let temp = 0
        this.choices.forEach(item => {
            pairs[item.id] = item.value
            if (item instanceof Choice) {
                temp += item.weight
            }
        })
        temp = temp / this.maxScore * 10
        localStorage.setItem('temperature', temp)
        this.final(temp)

        const data = {
            'entry.1599400131': this.selectedType.replace('-', ' '), // 'Self+Catered
            'entry.194218429': parseFloat(this.rent), // rent
            'entry.419763840': this.selectedLevel.replace('-', ' '), // level of study
            
            'entry.1136600093': pairs['working'], // enjoy working as RA
            
            'entry.205553839': pairs['valued'], // feel appreciated
            'entry.76741696': pairs['confident1'], // issue owner
            'entry.712036240': pairs['confident2'], // issue manager
            'entry.378989596': pairs['confident3'], // issue senior reslife
            
            'entry.638359289': pairs['clarity'], // communication
            
            'entry.596848087': pairs['compensation'], // compensation
            'entry.1805866523': pairs['duty'], // duties
            'entry.1728627851': pairs['affected'], // affected decision
            'entry.1918754841': pairs['why'] || '', // why
            'entry.452131004': pairs['optional'] || '', // feedback
        }

        let form = document.createElement('form');
        form.action = action;
        form.method = method;
        form.target = 'hiddenFrame'

        form.classList.add('hidden')

        Object.keys(data).forEach(key => {
            let input = document.createElement('input');
            input.type = 'hidden';
            input.name = key; 
            input.value = data[key]
            form.appendChild(input)
        });

        document.body.appendChild(form);
        form.submit();
    }

    start() {
        // show cover page
        let value = localStorage.getItem('temperature')
        if (value) this.final(value)
        else {
            // this.final(9.3)
            this.changeScreen(this.startScreen)
        }
    }
}