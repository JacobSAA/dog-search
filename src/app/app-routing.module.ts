import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DogSearchComponent } from './dog-search/dog-search.component';

const routes: Routes = [
  {
    path: 'dog-search',
    component: DogSearchComponent
  },
  {
    path: 'login', 
    component: LoginComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dog-search'
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'dog-search'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
