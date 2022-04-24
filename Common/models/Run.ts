export class Run {
    code: string;
    userId: number;
    time: number;

    constructor(code: string, userId: number, time: number){
        this.code = code;
        this.userId = userId;
        this.time = time;
    }
}