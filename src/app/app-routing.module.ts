

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AllTemplateUserComponent} from "./frontOffice/all-template-user/all-template-user.component";
import {BodyUserComponent} from "./frontOffice/body-user/body-user.component";
import { ListProduitComponent } from './list-produit/list-produit.component';
import { ProduitComponent } from './produit/produit.component';

const routes: Routes = [
  { path :"", redirectTo:"admin", pathMatch:"full"},
  { path :'Produit', component:AllTemplateUserComponent,
    children:[
      { path :'AjouterProduit', component:ProduitComponent},
      { path :'ListProduit', component:ListProduitComponent},

       {path:"",component:BodyUserComponent}
    ]},

  {path:"**",component:AllTemplateUserComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
