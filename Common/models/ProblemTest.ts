import { ProblemTestParameter } from "./ProblemTestParameter";

export class ProblemTest {
    id: number;
    problemId: number;
    result: string;
    createdAt: Date | null = null;
    updateAt: Date | null = null;

    problemTestParameters: ProblemTestParameter[] = [];

    constructor(id: number, problemId: number, result: string){
        this.id = id;
        this.problemId = problemId;
        this.result = result;
    }
}