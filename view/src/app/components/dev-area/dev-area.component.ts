import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DevThemes } from 'src/app/datas/dev-themes';
import { RouteService } from 'src/app/services/route.service';
import { ShareService } from 'src/app/services/share.service';
import { DBResult } from '../../../../../Common/models/DBResult';
import { Run } from '../../../../../Common/models/Run';

declare var monaco: any;
let loadedMonaco = false;
let loadPromise: Promise<void>;

@Component({
  selector: 'app-dev-area',
  templateUrl: './dev-area.component.html',
  styleUrls: ['./dev-area.component.scss']
})
export class DevAreaComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [ 'input', 'output' ];
  dataIO: any[] = [{ input: 1, output: 2}, { input: 3, output: 4}, { input: 5, output: 6}, { input: 7, output: 8}, { input: 9, output: 10}]
  editor: any;
  
  timer: number = 0;
  timeView: string = '00:00:00';
  interval: any = null;

  @ViewChild('editorContainer', { static: true }) editorContainer: ElementRef | undefined;

  constructor(private share: ShareService, private cdRef: ChangeDetectorRef, private routeService: RouteService) { }

  ngOnInit(): void {
    this.loadMonaco();
    this.startTime();
  }

  ngOnDestroy(): void {
    this.clearInterval();
  }

  loadMonaco() {
    loadedMonaco = true;
    loadPromise = new Promise<void>((resolve: any) => {
      const baseUrl = './assets' + '/monaco-editor/min/vs';
      if (typeof (window as any).monaco === 'object') {
        resolve();
        return;
      }
      const onGotAmdLoader: any = () => {
        // Load monaco
        (window as any).require.config({ paths: { vs: `${baseUrl}` } });
        (window as any).require([`vs/editor/editor.main`], () => {
          this.initMonaco(null);
          resolve();
        });
      };

      // Load AMD loader if necessary
      if (!(window as any).require) {
        const loaderScript: HTMLScriptElement =
          document.createElement('script');
        loaderScript.type = 'text/javascript';
        loaderScript.src = `${baseUrl}/loader.js`;
        loaderScript.addEventListener('load', onGotAmdLoader);
        document.body.appendChild(loaderScript);
      } else {
        onGotAmdLoader();
      }
    });
  }

  initMonaco(options: any): void {
    this.editor = monaco.editor.create(this.editorContainer?.nativeElement, {
      value: ['class ClassName {', '\tpublic static void main(String[] args) {', '\t\t', '\t}', '}'].join('\n'),
      language: 'java',
      automaticLayout: true
    });
    monaco.editor.defineTheme('dark', new DevThemes().getDarkMode());

    this.share.theme.subscribe((theme: string) => monaco.editor.setTheme(theme));
  }

  startTime() {
    const convert = (value: number) => {
      return value < 10 ? ('0' + value) : value;
    };
    this.interval = setInterval(() => {
      this.timer++;
      const hours: any = Math.floor(this.timer / 3600); //get hours
      const minutes: any = Math.floor((this.timer - (hours * 3600)) / 60); //get minutes
      const seconds: any = this.timer - (hours * 3600) - (minutes * 60); //get seconds
      console.log(hours, minutes, seconds);
      this.timeView = `${convert(hours)}:${convert(minutes)}:${convert(seconds)}`; //return is HH:MM:ss
    }, 1000);
  }

  clearInterval() {
    clearInterval(this.interval);
    this.timer = 0;
    this.timeView = '00:00:00';
  }

  confirm() {
    this.routeService.compileAndExec(new Run(this.editor.getValue(), 1, this.timer))
    .subscribe((resultDb: DBResult) => {
      console.log('-----> ', resultDb);
    });
  }
}