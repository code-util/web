class Building {
    constructor(name, path, googleSheet, buildingClick) {
        this.name = name
        this.desc = NO_DATA
        this.features = []
        this.rooms = []
        this.googleSheet = googleSheet

        this.buildingClick = buildingClick

        this.path = path 
        this.element = get('#' + this.path)

        this.formatElement()
    }
    get valid() {
        return this.element !== null
    }

    formatElement() {
        if (!this.valid) return

        this.element.classList.add('buildingHover')
        this.element.tabIndex = 0

        this.onclick.bind(this)
        this.element.onclick = () => this.onclick()
    }

    active(isActive) {
        if (isActive) this.element.classList.add('activeBuilding')
        else this.element.classList.remove('activeBuilding')
    }

    async gatherInfo() {
        const data = await this.googleSheet.ask(this.name)
        
        if (Object.keys(data).length > 0) {
            this.desc = data.desc 
            this.features = data.features
            const rooms = data.rooms
            this.rooms = rooms.map(room => new Room(room))
        }
    }

    async onclick() {
        this.element.blur()
        await this.gatherInfo()
        this.buildingClick(this)
    }
}