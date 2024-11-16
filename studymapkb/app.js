// todo
// - change suggestion urls to actual ms forms
// - add all excel sheets
// - work on language
// - location viewer
// - 

console.log('akrit did this')
console.log('check me out in linked in: akrit ghimire :)')

function setVhVariable() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
setVhVariable();
window.addEventListener('resize', setVhVariable);

class App {
    constructor() {
        this.root = get('.root')
        this.buildings = []

        this.mapHeader = get('.mapHeader', this.root)
        this.buildingHeader = get('.buildingHeader', this.root)
        this.moreInfo = get('.moreInfoWrapper', this.root)
        this.closeButton = get('.close')
        this.buttonStack = get('.buttonStack')
        this.mapOverlay = get('.mapOverlay')
        this.mapVector = get('.mapVector')
        this.mapContainer = get('.mapContainer')
        this.zoomInBtn = get('.zoomIn')
        this.zoomOutBtn = get('.zoomOut')
        this.locateBtn = get('.locate')

        this.loadOverlay = get('.loader')
        this.offlineOverlay = get ('.offline')
        this.internetNeededOverlay = get('.internetNeeded')

        this.map = new ZoomPanElement(this.mapVector, this.mapContainer, this.zoomInBtn, this.zoomOutBtn, this.locateBtn)

        this.infoState.bind(this)
        this.mapState.bind(this)
        this.loadError.bind(this)
        this.hideOffline.bind(this)

        this.closeButton.onclick = () => this.mapState()
        this.mapOverlay.onclick = () => this.mapState()
        
        const sheetMapGid = [] // individ sheets by their gid
        buildingMaps.forEach(building => {
            if (building[2] !== null) sheetMapGid.push({
                sheetName: building[0],
                gid: building[2]
            })
        })

        this.googleSheet = new GoogleSheet(kbDataLink, sheetMapGid, (rows) => {
            const buildingMeta = rows.slice(0, 2)
            const roomsData = rows.slice(3, rows.length).map((row) => row.slice(2, row.length))
            
            let buildingFeatures = []
            if (buildingMeta[1][1].length > 3) {
                buildingFeatures = buildingMeta[1][1].split(';').map(feature => feature.trim())
            }

            return {
                desc: buildingMeta[0][1],
                features: buildingFeatures,
                rooms: roomsData.map(room => ({
                    name: room[0], 
                    desc: room[1],
                    busyDesc: room[2],
                    location: room[3],
                    capacity: room[4],
                    additionalFeatures: room[5].split(';').map(feature => feature.trim()),
                }))
            }
        }, (type) => this.loadError(type), this.loadOverlay) 

        this.language = new Language([])

        show(this.loadOverlay)
        hide(this.offlineOverlay, this.internetNeededOverlay)
    }

    async setup() {        
        this.populateBuildings()
        this.routing = new Routing()

        const findBuilding = (name) => this.buildings.find((value) => value.name.replace(/ /g, '') == name)
        
        if (this.routing.currentRoute.includes('/building/')) {
            console.log('here')

            const name = this.routing.currentRoute.replace('/building/', '')
            const buildingObj = findBuilding(name)

            if (!buildingObj) this.mapState()
            await this.infoState(buildingObj)

        } else this.mapState()


        hide(this.loadOverlay)
    }

    loadError(type) {
        if (type == 'OFFLINE-FAIL') {
            show(this.internetNeededOverlay)
        }
        else if (type == 'OFFLINE-PASS') {
            show(this.offlineOverlay)
            window.addEventListener('online', () => this.hideOffline())
        }
    }
    hideOffline() {
        hide(this.offlineOverlay)
    }

    mapState() {
        this.routing.switch('/map')

        show(this.mapHeader, this.buttonStack)
        hide(this.mapOverlay, this.buildingHeader, this.moreInfo, this.closeButton)

        this.buildings.forEach(building => {
            building.active(false)
            building.element.classList.add('buildingHover')
        })
    }
    async infoState(building) {
        if (!building) return

        this.routing.switch(`/building/${building.name.replace(/ /g, '')}`)
        await building.gatherInfo()

        hide(this.mapHeader, this.buttonStack)
        show(this.mapOverlay, this.buildingHeader, this.moreInfo, this.closeButton)

        
        this.buildings.forEach(buildingItem => {
            let active = buildingItem.element == building.element
            buildingItem.active(active)
            
            if (active) buildingItem.element.classList.remove('buildingHover')
            else buildingItem.element.classList.add('buildingHover')
        })


        this.el_buldingName = get('h1', this.buildingHeader)
        this.el_buldingDesc = get('p', this.buildingHeader)
        this.el_features = get('.tags', this.buildingHeader)
        this.el_rooms = get('.accordian', this.moreInfo)

        this.el_buldingName.innerText = building.name 
        this.el_buldingDesc.innerText = building.desc 
        this.el_features.innerHTML = ''
        
        if (building.features.length > 0) {
            building.features.forEach(feature => {
                let element = document.createElement('div')
                element.classList.add('tag')
                element.dataset.translate = ''
                element.innerText = feature 
                this.el_features.appendChild(element)
            })
            show(this.el_features)

        } else hide(this.el_features)

        this.el_rooms.innerHTML = ''
        let el_studyInfo = get('p', this.moreInfo)

        if (building.rooms.length > 0) {
            building.rooms.forEach(room => {
                this.el_rooms.append(room.element)
            })
            this.roomsAccordian = new RoomsAccordian(building.rooms)
            el_studyInfo.innerText = 'Places to Study'
            show(this.el_rooms)
        } 
        else {
            el_studyInfo.innerText = NO_DATA
            hide(this.el_rooms)
        }
    }

    populateBuildings() {
        buildingMaps.forEach(building => {
            let [name, path] = building
            this.buildings.push(new Building(name, path, this.googleSheet, (building) => this.infoState(building)))
        })
    }
}

const app = new App()
app.setup()