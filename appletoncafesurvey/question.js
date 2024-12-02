class Question {
    constructor(questionOne, imgSrc, progressPercent, navigation) {
        this.questionOne = questionOne
        this.source = imgSrc
        this.progressPercent = progressPercent
        this.navigation = navigation

        this.lastQuestion = false
        this.rating = 0
        this.response = ''

        this.create()
        this.link()
        this.setRating(-1)
    }

    data() {
        return [this.rating, this.response]
    }

    create() {
        this.root = document.createElement('div')
        this.root.classList.add('input')
        this.root.innerHTML = this.html()

        this.progress = get('.progress', this.root)
        this.questionOneElem = get('.question-first', this.root)
        this.questionTwoElem = get('.question-second', this.root)
        this.img = get('img', this.root)
        this.backBtn = get('.back', this.root)
        this.nextBtn = get('.next', this.root)
        this.starInput = get('.star-input', this.root)
        this.textInput = get('.text-input', this.root)
        this.stars = [
            get('.star-one', this.starInput),
            get('.star-two', this.starInput),
            get('.star-three', this.starInput),
            get('.star-four', this.starInput),
            get('.star-five', this.starInput)
        ]
        this.starExplainer = get('.star-explainer', this.root)
    }

    setRating(rating) {
        this.rating = rating + 1
        
        if (this.rating != 0) this.nextBtn.classList.remove('disabled')

        this.stars.forEach((star, i) => {
            if (i <= rating) star.classList.add('active')
            else star.classList.remove('active')
        })
    }

    setResponse(response) {
        this.response = response
    }

    navigateQuestion(forward) {
        if (forward && this.rating == 0) return

        if (this.lastQuestion && forward) this.navigation(true) // go next question
        else if (this.lastQuestion && !forward) {
            this.lastQuestion = false
            this.refresh()
        }
        else if (!this.lastQuestion && forward) {
            this.lastQuestion = true
            this.refresh()
        }
        else this.navigation(false)
    }

    refresh() {
        if (this.lastQuestion) {
            show(this.textInput, this.questionTwoElem)
            hide(this.starInput, this.questionOneElem, this.starExplainer)
            this.questionTwoElem.innerHTML = `Why did you rate it ${this.rating == 1 ? this.rating + ' star' : this.rating + ' stars'}. (Optional)`
        } else {
            show(this.starInput, this.questionOneElem, this.starExplainer)
            hide(this.textInput, this.questionTwoElem)
        }
    }

    link() {
        // progress
        this.progress.style.width = this.progressPercent + '%'

        // star input
        this.stars.forEach((star, i) => {
            star.onclick = () => this.setRating(i)
        })

        // text input
        this.textInput.oninput = () => {
            this.setResponse(this.textInput.value)
        }

        this.backBtn.onclick = () => this.navigateQuestion(false)
        this.nextBtn.onclick = () => this.navigateQuestion(true)
    }

    html() {
        return `
            <div class="main">
                <div class="video">
                    <div class="progress-bar-container">
                        <div class="progress-bar">
                            <p>Progress</p>
                            <div class="progress"></div>
                        </div>
                    </div>
                    <img data-src="${this.source}">
                </div>
                <div class="question-container">
                    <p class="question-first">${this.questionOne}</p>
                    <p class="question-second hidden"></p>
                    <div class="star-input">
                        <div class="star star-one active"></div>
                        <div class="star star-two active"></div>
                        <div class="star star-three"></div>
                        <div class="star star-four"></div>
                        <div class="star star-five"></div>
                    </div>
                    <p class="star-explainer">1 being the worst, 5 being the best.</p>
                    <textarea class="text-input hidden"></textarea>
                </div>
            </div>
            <div class="nav-buttons">
                <div class="button back">Go Back</div>
                <div class="button next active disabled">Next</div>
            </div>
        `
    }
}