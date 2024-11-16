class Routing {
    constructor() {
        this.currentRoute = window.location.hash.replace('#', '')
    }
    switch(route) {
        this.currentRoute = route
        window.location.hash = this.currentRoute
    }
}