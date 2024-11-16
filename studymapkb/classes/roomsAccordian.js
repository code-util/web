class RoomsAccordian {
    constructor(rooms) {
        this.rooms = rooms
        this.lastSelected = null

        this.rooms.forEach(room => {
            room.element.onclick = () => this.setActive(room) // maybe bind 'this'
        })
    }
    setActive(element) {
        this.rooms.forEach(room => {
            room.active(room == element && element !== this.lastSelected)
        })
        if (element == this.lastSelected) this.lastSelected = null 
        else this.lastSelected = element
    }
}