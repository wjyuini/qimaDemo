import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePageComponent } from './create-page/create-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { UpdatePageComponent } from './update-page/update-page.component';

const routes: Routes = [
  { path: 'mainPage', component: MainPageComponent },
  { path: 'creationPage', component: CreatePageComponent },
  { path: 'updatePage/:status', component: UpdatePageComponent },
  { path: '**', redirectTo: '/mainPage', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
