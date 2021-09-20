import { Injectable } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { RouteService } from './route.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  constructor(private dialog: MatDialog, private route: RouteService, private http: HttpClient) { }
  
}
