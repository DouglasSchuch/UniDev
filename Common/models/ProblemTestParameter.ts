export class ProblemTestParameter {
    id: number;
    problemTestId: number;
    value: string;
    createdAt: Date | null = null;
    updateAt: Date | null = null;

    constructor(id: number, problemTestId: number, value: string){
        this.id = id;
        this.problemTestId = problemTestId;
        this.value = value;
    }
}