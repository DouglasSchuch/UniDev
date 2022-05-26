export class User {
    id: number;
    name: string;
    username: string;
    email: string;
    course: string;
    university: string;
    city: string;
    password: string | null;
    isActive: boolean;
    createdAt: Date | null = null;
    updateAt: Date | null = null;

    constructor(id: number, name: string, username: string, email: string, course: string, university: string, city: string, password: string | null = null, isActive: boolean = true){
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.course = course;
        this.university = university;
        this.city = city;
        this.password = password;
        this.isActive = isActive;
    }
}

export class Login {
    username: string | null = null;
    password: string | null = null;

    constructor(username: string | null = null, password: string | null = null){
        this.username = username;
        this.password = password;
    }
}