import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevAreaComponent } from './components/dev-area/dev-area.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DataResolverService } from './services/data-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }
  , { path: 'login', component: LoginComponent }
  , { path: 'problem/:id', component: DevAreaComponent }
  , { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
