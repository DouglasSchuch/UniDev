import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Run, RunMarathon } from '../../../../Common/models/Run'
import { Login } from '../../../../Common/models/User';

@Injectable({
    providedIn: 'root'
})
export class RouteService {
    port: number = (3000);
    host: string;
    constructor(public http: HttpClient) {
        this.host = `${location.protocol}//${location.hostname}:${this.port}/`;
    }
    
    getProblemsResolvedByUserId(userId: number): any {
        return this.http.get(`${this.host}problem-resolved/user/${userId}`);
    }
    
    getMarathonsResolvedByUserId(userId: number): any {
        return this.http.get(`${this.host}marathon-resolved/user/${userId}`);
    }
    
    getProblemsResolvedByMarathonId(marathonId: number): any {
        return this.http.get(`${this.host}problem-resolved/marathon/${marathonId}`);
    }
    
    getProblems(): any {
        return this.http.get(`${this.host}problem`);
    }

    getProblemById(id: number): any {
        return this.http.get(`${this.host}problem/${id}`);
    }

    getMarathons(): any {
        return this.http.get(`${this.host}marathon`);
    }

    getMarathonById(id: number): any {
        return this.http.get(`${this.host}marathon/${id}`);
    }

    getMarathonByUserProblemsStatus(userId: number, marathonId: number): any {
        return this.http.get(`${this.host}marathon/resolved/${userId}/${marathonId}`);
    }

    confirmMarathon(data: RunMarathon): any {
        return this.http.post(`${this.host}marathon/finalize`, data);
    }

    compileAndExec(data: Run): any {
        return this.http.post(`${this.host}dev/compile-and-exec`, data);
    }

    login(data: Login): any {
        return this.http.post(`${this.host}user/login`, data);
    }

    getUserByUserName(username: string): any {
        return this.http.get(`${this.host}user/username/${username}`);
    }

    // editPanel(data: any): any {
    //     return this.http.put(`${this.host}panel`, data);
    // }

    // deletePanel(id: number): any {
    //     return this.http.delete(`${this.host}panel/${id}`);
    // }
}

