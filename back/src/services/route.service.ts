import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RouteService {
  host: string;
  authUrl: string;

  constructor(private http: HttpService) {
    this.authUrl = process.env.AUTH_API;
  }

  updateProductionUrl(newUrl: string): void {
    this.host = newUrl.includes('http://') ? newUrl : `http://${newUrl}`;
  }

  pluginIFrameURL(url: string, terminal: string, required = false) {
    return this.http.post(`${this.host}/api/hub/PluginIFrameURL/${terminal}`, { URL: url, required, ShowPlugin: true }, { responseType: 'json' });
  }
}
