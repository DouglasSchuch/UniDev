import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Run } from '../../../../Common/models/Run'

@Injectable({
    providedIn: 'root'
})
export class RouteService {
    port: number = (3000);
    host: string;
    constructor(public http: HttpClient) {
        this.host = `${location.protocol}//${location.hostname}:${this.port}/`;
    }
    
    getProblems(): any {
        return this.http.get(`${this.host}problem`);
    }

    getProblemById(id: number): any {
        return this.http.get(`${this.host}problem/${id}`);
    }

    compileAndExec(data: Run): any {
        return this.http.post(`${this.host}dev/compile-and-exec`, data);
    }

    // editPanel(data: any): any {
    //     return this.http.put(`${this.host}panel`, data);
    // }

    // deletePanel(id: number): any {
    //     return this.http.delete(`${this.host}panel/${id}`);
    // }
}

