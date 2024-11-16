class GoogleSheet {
    constructor(url, sheetGidList, rowFormatter) {
        this.url = url
        this.sheetGidList = sheetGidList
        this.result = {}
        this.rowFormatter = rowFormatter
    }

    async loadSheets(errorCallback) {
        this.success = true

        for (let i = 0; i < this.sheetGidList.length; i++) {
            const item = this.sheetGidList[i];
            this.success = await this.fetchCSV(item)

            if (!this.success) break
        }

        if (!this.success) {
            this.result = this.loadLocal()
            console.log(Object.keys(this.result).length > 0)
           
            if (Object.keys(this.result).length == 0) errorCallback('OFFLINE-FAIL')
            else errorCallback('OFFLINE-PASS')
        } 
        else this.saveToLocal()
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