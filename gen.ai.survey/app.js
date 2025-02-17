class App {
    constructor() {
        this.root = get('body')
        this.audioPlayer = get('audio')
        this.currentAudio = null

        this.school = ''
        this.type = ''
        this.option = ''

        this.options = [
            'Clear guidance across the Uni of Gen AI usage',
            'Clear guidance within courses of Gen AI usage',
            'Training on how to use Gen AI effectively for learning / research',
            'Allow Gen AI usage for some courseworks / assessed material',
            "My uni's stance on ai is clear, there is no ambiguity for me in regards to Gen AI usage"
        ]
        this.types = [
            'UG-1',
            'UG-2',
            'UG-3',
            'UG-4',
            'UG-5',
            'PG',
            'Staff',
            'Other'
        ]
        this.optionDisplay = get('#option-display')
        
        // 3 pages - submit screen, submitted screen, already submitted screen
        this.submitScreen = get('.submit-screen')
        this.submittedScreen = get('.submitted-screen')
        this.endScreen = get('.end-screen')
        this.blueScreen = get('.blue-screen')
        this.screens = [this.submitScreen, this.submittedScreen, this.endScreen, this.blueScreen]

        this.submitBtn = get('#submit')
        this.submitBtn.onclick = () => {
            this.submit()
        }
    }

    changeScreen(screen) {
        this.screens.forEach(s => s.classList.add('hidden'))
        screen.classList.remove('hidden')
    }

    changeMusic(type) {
        if (this.currentAudio == type) return // already playing audio

        if (type == 'ambient') {
            this.audioPlayer.src = './assets/sound/ambient.mp3'
            this.audioPlayer.loop = true
        }
        else if (type == 'click') {
            this.audioPlayer.src = './assets/sound/click.mp3'
            this.audioPlayer.loop = false
        } else if (type == 'victory') {
            this.audioPlayer.src = './assets/sound/victory.mp3'
            this.audioPlayer.loop = false
        } else if (type == 'kill') {
            this.audioPlayer.src = './assets/sound/kill.mp3'
            this.audioPlayer.loop = false
        } else {
            this.audioPlayer.src = ''
        }


        this.currentAudio = type
        this.audioPlayer.load()
        this.audioPlayer.play()
    }

    matchType(type) {
        for (let i = 0; i < this.types.length; i++) {
            if (this.types[i] == type) {
                this.type = type
                return 
            }
        }
    }

    matchOption(oneIndexed) {
        if (oneIndexed-1 < 0 || oneIndexed-1 > this.options.length-1) return

        this.option = this.options[oneIndexed -1]
        this.optionDisplay.innerText = this.option
    }

    readHash() {
        this.search = window.location.search
        const urlParams = new URLSearchParams(this.search);

        let count = 0

        urlParams.forEach((value, key) => {
            count += 1
            if (key == 'school') this.school = value
            else if (key == 'type') this.matchType(value)
            else if (key == 'option') this.matchOption(value)
        });

        if (count != 3 || this.school == '' || this.type == '' || this.option == '') {
            return false
        }
        return true
    }

    submit() {
        this.changeMusic('click')
        this.thoughts = get('#last-words')
        this.changeScreen(this.submittedScreen)

        const action = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfaba5sba5eI0PwWn9ZA4jedS7B-mw-1dL_Ji0tjw0IJScEow/formResponse'
        const method = 'POST'

        const data = {
            'entry.953257047': this.school, // school
            'entry.867680542': this.type, // student type (exact words required)
            'entry.2053782779': this.option, // multiple choice (exact words required)
            'entry.1342275454': this.thoughts.value // optional thoughts 
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
        form.submit()

        setTimeout(() => {
            this.changeMusic('victory')
            this.changeScreen(this.endScreen)
        }, 5500)

        localStorage.setItem('completed', true)
    }

    error(errorMessage) {
        this.changeMusic('kill')
        this.changeScreen(this.blueScreen)
        const err = get('#error-message')
        err.innerText = errorMessage
    }

    start() {
        if (this.readHash()) {
            // select right page
            let value = localStorage.getItem('completed')
            if (value) {
                this.changeMusic('victory')
                this.changeScreen(this.endScreen)
            }
            else {
                this.changeScreen(this.submitScreen)
            }
        } else {
            this.error('The URL is not in the right format. Click the link in your email again!')
        }

    }
}