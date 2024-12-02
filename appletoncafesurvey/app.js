class App {
    constructor() {
        this.questions = []
        this.root = get('body')

        this.questionIndex = -1

        this.startElem = get('.start')
        this.email = get('#studentmail', this.startElem)
        this.startBtn = get('.startBtn', this.startElem)
        this.contextElem = get('.context', this.root)
        this.skipBtn = get('.skipBtn', this.contextElem)
        this.lastInput = get('.overall-input', this.root)


        this.email.oninput = () => {
            if (this.email.validity.valid) this.startBtn.classList.remove('disabled')
            else this.startBtn.classList.add('disabled')
        }
        this.startBtn.onclick = () => {
            if (this.email.validity.valid) this.navigate(true)
        }

        this.navigate = this.navigate.bind(this)
        this.characters = []

        this.audioPlayer = get('audio')
        this.currentAudio = null

        this.finalData = {}

    }

    changeMusic(type) {
        if (this.currentAudio == type) return // already playing audio

        if (type == 'intro') {
            this.audioPlayer.src = './assets/sound/introcrawl.mp3'
            this.audioPlayer.loop = false
        }
        else if (type == 'bg') {
            this.audioPlayer.src = './assets/sound/bgmusic.mp3'
            this.audioPlayer.loop = true
        } else if (type == 'final') {
            this.audioPlayer.src = './assets/sound/final.mp3'
            this.audioPlayer.loop = false
        } else {
            this.audioPlayer.src = ''
        }


        this.currentAudio = type
        this.audioPlayer.load()
        this.audioPlayer.play()
    }

    setCharacters(characters) {
        this.characters = characters
    }

    navigate(forward) {
        if (forward && typeof forward == 'boolean') this.questionIndex += 1
        else if (typeof forward == 'boolean') this.questionIndex -= 1

        if (this.questionIndex == -1) {
            showWarp = true
            show(this.startElem)
            this.questions.map(question => question.question.root).forEach(root => hide(root))
            hide(this.contextElem)

        } else if (this.questionIndex > -1 && this.questionIndex < this.questions.length) {
            showWarp = false
            hide(this.startElem)

            let visible = false

            const showQuestions = () => {
                if (visible) return
                visible = true

                this.changeMusic('bg')

                hide(this.contextElem)

                this.questions.forEach((q, i) => {
                    if (this.questionIndex == i) show(q.question.root)
                    else hide(q.question.root)
                })
            }

            if (this.questionIndex == 0) {
                show(this.contextElem)
                this.changeMusic('intro')
                this.skipBtn.onclick = showQuestions
                setTimeout(showQuestions, 20000)
            } else {
                showQuestions()
            }

        } else {
            showWarp = true
            show(this.lastInput)
            this.questions.map(question => question.question.root).forEach(root => hide(root))
            hide(this.startElem)

            this.lastBtn = get('.button', this.lastInput)
            this.lastBtn.onclick = () => {
                this.final()
                this.submit()
            }
        }
    }

    final() {
        this.finalElem = get('.final', this.startElem)
        this.introElem = get('.intro', this.root)

        this.changeMusic('final')

        this.characterElem = get('.character', this.finalElem)
        this.personaElem = get('.persona', this.finalElem)
        this.characterImg = get('.character-image', this.finalElem)

        this.overallRating = 0
        let savedValue = localStorage.getItem('rating')
        if (savedValue) {
            this.overallRating = savedValue
        } else {
            app.questions.forEach(q => {
                this.finalData[q.label] = q.question.data()
                this.overallRating += q.question.rating   
            })
        }

        for (let i = 0; i < app.characters.length; i++) {
            const character = app.characters[i];
            let low = character.lo
            let high = character.hi

            if (this.overallRating < low || this.overallRating > high) continue

            this.characterElem.innerText = character.character
            this.personaElem.innerText = character.persona
            this.characterImg.src = character.img
            break
        }

        show(this.finalElem, this.startElem)
        this.questions.map(question => question.question.root).forEach(root => hide(root))
        hide(this.introElem)

        showWarp = true
    }

    submit() {
        this.thoughts = get('#last-words')

        const action = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdekkvevGFXlR6Ra2hWE-g1OrnPghodgHrwlWa-qYvmziGJuQ/formResponse'
        const method = 'POST'

        const data = {
            'entry.248814409': this.email.value, // email

            'entry.511290599': this.finalData['seating'][0],
            'entry.1782268170': this.finalData['seating'][1], // seating resp   
            
            'entry.1415212397': this.finalData['tables'][0],
            'entry.735687043': this.finalData['tables'][1], // tables resp 

            'entry.923446146': this.finalData['plugs'][0],
            'entry.458650347': this.finalData['plugs'][1], // charging resp 

            'entry.43950270': this.finalData['flooring'][0],
            'entry.1244512412': this.finalData['flooring'][1], // flooring resp 

            'entry.1376930999': this.finalData['decoration'][0],
            'entry.507433452': this.finalData['decoration'][1], // decoration resp 

            'entry.2113273620': this.finalData['food'][0],
            'entry.622109844': this.finalData['food'][1], // food resp 

            'entry.423340207': this.finalData['drinks'][0],
            'entry.1134383882': this.finalData['drinks'][1], // drink resp 

            'entry.640376573': this.finalData['price'][0],
            'entry.692403151': this.finalData['price'][1], // price resp 

            'entry.1351270378': this.thoughts.value, // last thoughts resp 
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

        localStorage.setItem('rating', JSON.stringify(this.overallRating))
    }

    start() {
        // show cover page
        let value = localStorage.getItem('rating')
        if (value) this.final()
        else {
            this.images = getAll("img[data-src]", this.root);

            this.images.forEach((img) => { // lazy load
                console.log('here')
                img.src = img.getAttribute("data-src");
                img.removeAttribute("data-src");
            });

            this.navigate(0)
        }
    }

    addQuestion(label, question) {
        this.questions.push({ label, question })
        hide(question.root)
        this.root.append(question.root)
    }
}