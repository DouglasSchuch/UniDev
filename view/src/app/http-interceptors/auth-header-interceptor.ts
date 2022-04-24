import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GeneralService } from '../services/general.service';
import { Router } from '@angular/router';
import { RouteService } from '../services/route.service';
import { DBResult } from '../../../../Common/models/DBResult';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
  constructor(private general: GeneralService, private router: Router
            , private route: RouteService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let headers: HttpHeaders = new HttpHeaders();
    let customReq: any;

    // const token = this.getCookie('ACESS_TOKEN') || this.general.token;
    // if (token) {
    //   headers = headers.set('token', token);
    // }

    customReq = req.clone({ headers });

    return next.handle(customReq).pipe(map(event => {
      const dontValid: any[] = [
        `${this.route.host}auth/login`
        , `${this.route.host}auth/valid`
        , `${this.route.host}auth/initialLoad`
        , `${this.route.host}auth/logout`
        , `assets/i18n`
        , `assets/images`
        , `${this.route.host}test`
      ];

      if (event && event instanceof HttpResponse) {
        // const resultHeaders = event.headers.get('token');
        // if (resultHeaders) {
        //   const data = JSON.parse(resultHeaders);
        //   this.saveToken(data.token, data.expiresIn);
        // } else if (dontValid.filter(f => event.url.includes(f)).length === 0) {
        //   this.auth.logout()
        //   .subscribe((out: DBResult) => {
        //     this.router.navigateByUrl('auth');
        //     this.general.openDialog([{
        //       id: 'label'
        //       , type: 'text'
        //       , caption: event.body.message
        //       , size: 'large'
        //       , translate: true
        //     }], 0, 'Warning', true);
        //   });
        // }
      }
      return event;
    }));
  }

  // saveToken(token: string, expiresIn: string) {
  //   const name = 'ACESS_TOKEN';
  //   const date = new Date();
  //   date.setSeconds(+expiresIn);
  //   const cookie = `${name}=${decodeURI(token)}; path=/; 'expires=' ${date}; cross-site-cookie=bar; SameSite=Strict`;
  //   document.cookie = cookie;
  // }

  // getCookie(name: string) {
  //   const decodedCookie = decodeURIComponent(document.cookie);
  //   const cookie = decodedCookie.split(';');
  //   for (let c of cookie) {
  //     while (c.charAt(0) === ' ') {
  //       c = c.substring(1);
  //     }
  //     if (c.indexOf(name) === 0) {
  //       return c.substring(name.length + 1, c.length);
  //     }
  //   }
  // }
}
