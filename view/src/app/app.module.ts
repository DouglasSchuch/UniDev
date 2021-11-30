import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

import { DevAreaComponent } from '../app/components/dev-area/dev-area.component'
import { HomeComponent } from '../app/components/home/home.component'
import { LoginComponent } from '../app/components/login/login.component'

@NgModule({
  declarations: [
    AppComponent,
    DevAreaComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    FlexLayoutModule,
    MatTooltipModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatSelectModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatInputModule,
    MatTableModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
