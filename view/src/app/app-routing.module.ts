import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevAreaComponent } from './components/dev-area/dev-area.component';
import { DataResolverService } from './services/data-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }
  , { path: 'problem/:id', component: DevAreaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
