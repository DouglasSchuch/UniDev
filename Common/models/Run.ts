export class Run {
    code: string;
    userId: number;
    problemId: number;
    marathonId: number | null = null;
    time: number;

    constructor(code: string, userId: number, problemId: number, time: number, marathonId: number | null = null){
        this.code = code;
        this.userId = userId;
        this.problemId = problemId;
        this.marathonId = marathonId;
        this.time = time;
    }
}

export class RunMarathon {
    userId: number;
    marathonId: number;

    constructor(userId: number, marathonId: number){
        this.userId = userId;
        this.marathonId = marathonId;
    }
}