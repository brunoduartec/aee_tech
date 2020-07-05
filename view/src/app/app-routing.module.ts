import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CentroListComponent } from './centro-list/centro-list.component';


const routes: Routes = [{
  path: "centros",
  component: CentroListComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
