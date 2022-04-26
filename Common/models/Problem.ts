export class Problem {
    id: number;
    name: string;
    description: string;
    codeDefault: string;
    isActive: boolean;
    createdUserId: number;
    createdAt: Date | null = null;
    updateAt: Date | null = null;

    constructor(id: number, name: string, description: string, codeDefault: string, isActive: boolean, createdUserId: number){
        this.id = id;
        this.name = name;
        this.description = description;
        this.codeDefault = codeDefault;
        this.isActive = isActive;
        this.createdUserId = createdUserId;
    }
}