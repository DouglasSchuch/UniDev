import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { DevThemes } from 'src/app/datas/dev-themes';
import { RouteService } from 'src/app/services/route.service';
import { ShareService } from 'src/app/services/share.service';
import { DBResult } from '../../../../../Common/models/DBResult';
import { Problem } from '../../../../../Common/models/Problem';
import { ProblemTest } from '../../../../../Common/models/ProblemTest';
import { ProblemTestParameter } from '../../../../../Common/models/ProblemTestParameter';
import { Run } from '../../../../../Common/models/Run';

declare var monaco: any;
let loadedMonaco = false;
let loadPromise: Promise<void>;

@Component({
  selector: 'app-dev-area',
  templateUrl: './dev-area.component.html',
  styleUrls: ['./dev-area.component.scss']
})
export class DevAreaComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = [ 'index', 'value' ];
  dataParams: any[] = [{ index: 1, value: 2}, { index: 1, value: 2}, { index: 1, value: 2}, { index: 1, value: 2}]
  editor: any = null;
  
  timer: number = 0;
  timeView: string = '00:00:00';
  interval: any = null;

  problem: Problem | null = null;
  problemTests: any[] = [];

  isShow: boolean = false;
  consoleText: string = '';

  @ViewChild('editorContainer', { static: true }) editorContainer: ElementRef | undefined;

  constructor(
    private app: AppComponent
    , private share: ShareService
    , private cdRef: ChangeDetectorRef
    , private routeService: RouteService
    , private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // console.log('------', this.editor, monaco);
    // console.log('route>>>> ', this.route);
  }
  
  ngAfterViewInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (!id) {
        console.log('NÃO EXISTE ID, ERRO')
        return;
      }
      this.routeService.getProblemById(id).subscribe((resultDb: DBResult) => {
        if (!resultDb.data) {
          console.log('IS NÃO ENCONTRADO, ERRO');
          return;
        }
        this.problem = <any>resultDb.data;
        // if (this.problem) {
        //   this.problem.description = this.problem.description.toString().replace(/(?:\r\n|\r|\n)/g, '<br>');
        // }
        console.log('this.problem>>>', this.problem);
        this.loadParams();
        this.loadComponents();
      })
    });
  }

  ngOnDestroy(): void {
    this.clearInterval();
  }

  loadComponents() {
    this.loadMonaco();
    this.startTime();
    this.cdRef.detectChanges();
  }

  loadMonaco() {
    loadedMonaco = true;
    loadPromise = new Promise<void>((resolve: any) => {
      const baseUrl = './assets' + '/monaco-editor/min/vs';
      // if (typeof (window as any).monaco === 'object') {
      //   resolve();
      //   return;
      // }
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
        const loaderScript: HTMLScriptElement = document.createElement('script');
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
    monaco.editor.getModels().forEach((model: any) => model.dispose());
    this.editor = monaco.editor.create(this.editorContainer?.nativeElement, {
      value: this.problem?.codeDefault || '',
      language: 'java',
      automaticLayout: true
    });
    monaco.editor.defineTheme('dark', new DevThemes().getDarkMode());

    this.share.theme.subscribe((theme: string) => monaco.editor.setTheme(theme));
    setTimeout(() => this.cdRef.detectChanges(), 500);
  }

  loadParams(): void {
    for (let i = 0; this.problem && i < this.problem.problemTests.length; i++) {
      const pt: ProblemTest = this.problem.problemTests[i];
      const parameters: any = [];
      const test = { result: pt.result, parameters };
      for (let j = 0; pt && j < pt.problemTestParameters.length; j++) {
        test.parameters.push({ value: pt.problemTestParameters[j].value, index: j })
      }
      if (test.parameters.length) {
        this.problemTests.push(test);
      }
    }
    this.cdRef.detectChanges();
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
      this.timeView = `${convert(hours)}:${convert(minutes)}:${convert(seconds)}`; //return is HH:MM:ss
    }, 1000);
  }

  onShowOrHide() {
    this.isShow = !this.isShow;
  }

  onClearConsole() {
    this.consoleText = '';
  }

  clearInterval() {
    clearInterval(this.interval);
    this.timer = 0;
    this.timeView = '00:00:00';
  }

  confirm() {
    if (this.problem) {
      const segMarathonIndex = this.route.snapshot.url.findIndex((u: any) => u.path === 'marathon');
      let marathonId: number | null = null;
      if (segMarathonIndex > -1 && this.route.snapshot.url[segMarathonIndex + 1]) {
        marathonId = +this.route.snapshot.url[segMarathonIndex + 1].path;
      }

      this.routeService.compileAndExec(new Run(this.editor.getValue(), 1, this.problem.id, this.timer, marathonId))
      .subscribe((resultDb: DBResult) => {
        this.consoleText += 'Sucesso\n';
        // setTimeout(() => {
        //   this.app.onBackPage();
        // }, 1500)
      }, (err: any) => {
        this.consoleText = this.consoleText || '';
        this.consoleText += (err.error.message || err.error.data) + '\n'
      });
    }
  }
}