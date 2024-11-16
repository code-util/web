class Language {
    constructor(hiddenLanguages) {
        this.hiddenLanguages = hiddenLanguages
        this.languages = languages

        this.listOverlay = get('.languageList')
        this.el_list = get('.list')
        this.el_trigger = get('.translate')
        this.el_text = get('p', this.el_trigger)

        this.el_trigger.onclick = () => this.showLanguageList()

        this.currentLanguage = ['en', 'English']
        this.changeLanguage(this.currentLanguage)
        // load here

        this.lexicon = {
            'hello': {
                'es': 'hola'
            }

            // first look up and translate (store in data-translate to revert)
            // api call and then save in lexicon
            // save lexicon and selected language
        }

        hide(this.listOverlay)
    }

    showLanguageList() {
        show(this.listOverlay)

        this.el_list.innerHTML = ''

        for (let i = 0; i < this.languages.length; i++) {
            const language = this.languages[i];
            const element = document.createElement('p')

            if (language[0] == this.currentLanguage[0]) element.classList.add('active')
            element.innerText = language[1]

            element.onclick = () => this.changeLanguage(language)

            this.el_list.append(element)
        }
    }

    changeLanguage(newLanguage) {
        this.el_text.innerText = newLanguage[1]
        this.currentLanguage = newLanguage
        hide(this.listOverlay)
        this.translatePage()

        // save here
    }

    translatePage() {
        // if english and no revert text, end as already translated

        const toTranslate = getAll('[data-translate]')
    }

    saveLanguage() {
        localStorage.setItem('language', this.currentLanguage)
    }
    loadLanguage() {
        const current = localStorage.getItem('language')

        if (current) return current
        else null
    }
}