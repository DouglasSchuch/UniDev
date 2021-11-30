import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ShareService } from './services/share.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'UniDev';
  initialLoad: any = {
    theme: 'dark',
    user: {
      name: 'Douglas Schuch'
      , username: 'DouglasSchuch'
      , age: '25'
      , email: 'douglasschuch2@gmail.com'
      , password: '123'
      , city: 'Novo Hamburgo'
      , course: 'Sistemas de Informação'
      , university: 'UNISINOS'
    }
  };
  themes: any = {
    light: {
      '--toolbar-top': '#64B7CC',
      '--color-000': 'transparent',
      '--color-100': 'black',
      '--color-200': '#717171',
      '--color-300': '#808080',
      '--color-400': '#B5B5B5',
      '--color-500': '#D9D9D9',
      '--color-600': '#C1C1C1',
      '--color-700': '#CECDCD',
      '--color-800': '#EFEFEF',
      '--color-900': '#E1E1E1',
      '--color-1000': '#888787',
      '--text-color': 'var(--color-100)',
      '--icons-color': 'var(--color-100)'
      }
    , dark: {
      '--toolbar-top': '#64B7CC',
      '--color-000': 'transparent',
      '--color-100': 'white',
      '--color-200': '#D2D2D2',
      '--color-300': '#C2C2C2',
      '--color-400': '#6D6D6D',
      '--color-500': '#606060',
      '--color-600': '#535353',
      '--color-700': '#4A4A4A',
      '--color-800': '#424242',
      '--color-900': '#333333',
      '--color-1000': '#272727',
      '--text-color': '#F5F5F5',
      '--icons-color': 'var(--color-100)'
    }
  }

  constructor(private cdRef: ChangeDetectorRef, private share: ShareService) { }

  ngOnInit(): void {
    this.changeTheme(this.initialLoad.theme);
  }

  changeTheme(theme: string) {
    for (let prop in this.themes[theme]) {
      document.documentElement.style.setProperty(prop, this.themes[theme][prop]);
    }
    this.initialLoad.theme = theme;
    this.share.changeTheme(theme);
    this.cdRef.detectChanges();
  }
}
