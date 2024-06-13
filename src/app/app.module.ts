import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomeComponent } from './home/home.component';
import { AddItemFormComponent } from './add-item-form/add-item-form.component';
import { ShowBillsComponent } from './show-bills/show-bills.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ItemListsComponent } from './item-lists/item-lists.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr'
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { BillsComponent } from './bills/bills.component';
import { LoginComponent } from './login/login.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HomeComponent,
    AddItemFormComponent,
    ShowBillsComponent,
    CarouselComponent,
    routingComponents,
    ItemListsComponent,
    BillsComponent,
    LoginComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpClient, BillsComponent, LandingPageComponent
  ],
  bootstrap: [AppComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
