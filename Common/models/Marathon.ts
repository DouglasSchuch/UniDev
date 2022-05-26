import { Problem } from "./Problem";
import { User } from "./User";

export class Marathon {
    id: number;
    name: string;
    description: string;
    createdUserId: number;
    duration: number | null;
    password: string | null;
    isActive: boolean;
    createdAt: Date | null = null;
    updateAt: Date | null = null;

    createdUser: User | null = null;
    problems: Problem[] = [];
    __time: string | null = null;

    constructor(id: number, name: string, description: string, createdUserId: number, duration: number | null = null, password: string | null = null, isActive: boolean = true){
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdUserId = createdUserId;
        this.duration = duration;
        this.password = password;
        this.isActive = isActive;
    }
}