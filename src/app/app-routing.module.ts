import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddItemFormComponent } from './add-item-form/add-item-form.component';
import { ShowBillsComponent } from './show-bills/show-bills.component';
import { BillsComponent } from './bills/bills.component';
import { LoginComponent } from './login/login.component';
import { LoaderComponent } from './loader/loader.component';

let routes : Routes = [];

if(localStorage.getItem("user") !== null){
  routes = [
    { path: '', component: HomeComponent },
    { path: 'addItem', component: AddItemFormComponent },
    { path: 'showBills/:flag', component: ShowBillsComponent },
    { path: 'viewBill/:SrNo', component: BillsComponent},
    { path: 'loading', component: LoaderComponent }
  ];
}else{
  routes = [
    { path: '', component: LoginComponent }
  ];
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, AddItemFormComponent, ShowBillsComponent, BillsComponent, LoginComponent];
