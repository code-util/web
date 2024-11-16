class Room {
    constructor({name, desc, busyDesc, location, capacity, additionalFeatures}) {
        this.name = name,
        this.desc = desc, 
        this.busyDesc = busyDesc,
        this.features = [location, capacity, ...additionalFeatures]
        this.element = document.createElement('div')

        this.formatElement()
        this.setNotActive()
    }

    active(isActive) {
        if (isActive) this.setActive()
        else this.setNotActive()
    }

    setActive() {
        if (!this.el_main || !this.el_body) return 

        this.el_main.classList.add('active')
        show(this.el_body)
    }

    setNotActive() {
        if (!this.el_main || !this.el_body) return 

        this.el_main.classList.remove('active')
        hide(this.el_body)
    }

    formatElement() {
        this.element.classList.add('card')

        this.element.innerHTML = `
            <div class="main">
                <p>${this.name}</p>
                <div class="icon">
                    <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M9 6L15 12L9 18" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </div>
            </div>
            <div class="body">
                <p><strong>What's it like?</strong> <span data-translate>${this.desc}</span></p>
                <p><strong>How busy?</strong> <span data-translate>${this.busyDesc}</span></p>
                <div class="tags"></div>
                <p class="suggest"><span data-translate>Not accurate?</span> <a href="#" data-translate>Let us know</a></p>
            </div>
        ` 
        this.el_features = get('.tags', this.element)
        this.el_main = get('.main', this.element)
        this.el_body = get('.body', this.element)

        this.features.forEach(feature => {
            let element = document.createElement('div')
            element.classList.add('tag')
            element.dataset.translate = ''
            element.innerText = feature 
            this.el_features.appendChild(element)
        })
    }
}