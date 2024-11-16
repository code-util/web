class Building {
    constructor(name, path, data, buildingClick) {
        this.name = name
        this.desc = data.desc || NO_DATA
        this.features = data.features || []

        const rooms = data.rooms || []
        this.rooms = rooms.map(room => new Room(room))


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

    onclick() {
        this.element.blur()
        this.buildingClick(this)
    }
}