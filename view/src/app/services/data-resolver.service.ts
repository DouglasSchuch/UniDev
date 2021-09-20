import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { GeneralService } from './general.service';
import { RouteService } from './route.service';
import { ShareService } from './share.service';

@Injectable({ providedIn: 'root' })
export class DataResolverService {
  constructor(private share: ShareService, private route: Router, public general: GeneralService, private routeService: RouteService, private activatedRoute: ActivatedRoute) { }

  resolve(route: ActivatedRouteSnapshot) {
    console.log(111111111111);
  }
}
