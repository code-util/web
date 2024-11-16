class GoogleSheet {
    constructor(url, sheetGidList, rowFormatter, errorCallback, loadingOverlay) {
        this.url = url
        this.sheetGidList = sheetGidList
        this.result = {}
        this.rowFormatter = rowFormatter
        this.freshStack = []
        this.result = this.loadLocal()
        this.errorCallback = errorCallback
        this.loadingOverlay = loadingOverlay
    }

    async ask(sheetName) {
        show(this.loadingOverlay)

        for (let i = 0; i < this.sheetGidList.length; i++) {
            const item = this.sheetGidList[i];
            
            if (item.sheetName == sheetName) {
                if (this.freshStack.find((value) => value == sheetName)) {
                    hide(this.loadingOverlay)
                    return this.result[sheetName]
                
                } else {
                    let success = await this.fetchCSV(item)
                    hide(this.loadingOverlay)

                    if (success) {
                        this.freshStack.push(sheetName)
                        this.saveToLocal()
                        return this.result[sheetName]
                    }

                    if (this.result[sheetName]) {
                        this.errorCallback('OFFLINE-PASS')
                        return this.result[sheetName]
                    }

                    this.errorCallback('OFFLINE-FAIL')
                    return null
                }
            }
        }

        hide(this.loadingOverlay)
        return {}
    }

    get sheets() {
        return this.result
    }

    async fetchCSV({sheetName, gid}) {
        try {
            const sheetUrl = `${this.url}&gid=${gid}`
            const response = await fetch(sheetUrl);
            const data = await response.text();
            
            const rows = data.split("\n").map(row => row.split(","));

            const sheetData = this.rowFormatter(rows)
            this.result[sheetName] = sheetData

            return true

        } catch (error) {
            console.error('Error:', error);

            return false
        }
    }

    saveToLocal() {
        const stringified = JSON.stringify(this.result)
        localStorage.setItem('googleSheets', stringified)
    }
    loadLocal() {
        const loaded = localStorage.getItem('googleSheets')

        if (loaded) return JSON.parse(loaded)
        return {}
    }
}