export class DBResult {
    message: string
    data: any[]
    validated: boolean
    numberPages: number

    constructor(msg: string, data: any[], validated: boolean, numberPages: number = -1){
        this.message = msg
        this.data = data
        this.validated = validated
        this.numberPages = numberPages
    }
}