import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DevThemes } from 'src/app/datas/dev-themes';
import { ShareService } from 'src/app/services/share.service';

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
  @ViewChild('editorContainer', { static: true }) editorContainer: ElementRef | undefined;

  constructor(private share: ShareService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadMonaco();
  }

  ngOnDestroy(): void {
    
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
      value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
      language: 'javascript'
    });
    monaco.editor.defineTheme('dark', new DevThemes().getDarkMode());

    this.share.theme.subscribe((theme: string) => monaco.editor.setTheme(theme));
  }
}