import { Component, OnInit } from '@angular/core';
import { ServiceLogicService } from '../service/service-logic.service';
import { ToastrService } from 'ngx-toastr';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { AddItemModel } from '../models/add-item.model';

@Component({
  selector: 'app-show-bills',
  templateUrl: './show-bills.component.html',
  styleUrl: './show-bills.component.css'
})

export class ShowBillsComponent implements OnInit {

  itemLists: any[] = [];

  constructor(public itemService: ServiceLogicService, private toastr: ToastrService, private landingPage: LandingPageComponent) { }

  ngOnInit(): void {
    this.refreshItemLists();
  }

  ngAfterContentChecked(): void {
    if (window.location.pathname.slice(11) === "search") {
      this.itemLists = this.landingPage.getSearchList();
    }
    else {
      if (LandingPageComponent.visit === 0) {
        this.refreshItemLists();
      }
    }
  };


  async refreshItemLists() {
    LandingPageComponent.visit++;
    let result = await this.itemService.getItemList();
    if (Number.isInteger(result)) {
      console.log(`Error code `, result, `. Issue with the data retrival.`);
      this.toastr.error('Error!', "Error code : " + result);
    }
    else {
      this.itemLists = [];
      let data = result.data;
      for (let i = 1; i < data.length; i++) {
        try{
          data[i].Item_Details = JSON.parse(data[i].Item_Details);
        }catch(e){
          console.log(e);
        }
        this.itemLists.push(data[i]);
      }
    }
  }
}
