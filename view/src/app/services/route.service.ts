import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RouteService {
    constructor(public http: HttpClient) { }
    
    // getAllPanels(): any {
    //     return this.http.get(`${this.host}panel`);
    // }

    // getPanelById(id): any {
    //     return this.http.get(`${this.host}panel/${id}`);
    // }

    // getPanelByName(name: string): any {
    //     return this.http.get(`${this.host}panel/byName/${name}`);
    // }

    // savePanel(data: any): any {
    //     return this.http.post(`${this.host}panel`, data);
    // }

    // editPanel(data: any): any {
    //     return this.http.put(`${this.host}panel`, data);
    // }

    // deletePanel(id: number): any {
    //     return this.http.delete(`${this.host}panel/${id}`);
    // }
}

