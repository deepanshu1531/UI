import { Component, OnInit } from '@angular/core';
import { ServiceLogicService } from '../service/service-logic.service';
import { BillsComponent } from '../bills/bills.component';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';
import { LocalizedString } from '@angular/compiler';
import { DB_URL } from '../service/constants';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit {

  _searchTerm: string = "";
  itemList: any[] = [];
  static searchList: any[] = [];
  static visit = 0
  auth = localStorage;
  DB_URL = DB_URL;

  constructor(public itemService: ServiceLogicService, private router:Router, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.refreshItemLists();
  }

  async searchItem(event: any) {
    event.preventDefault(); 
    this._searchTerm = event.target.value;
    if(this._searchTerm !== ""){
    let val = Number(event.target.value.slice(1))
    await this.setSearchList(val);
    if(this.getSearchList().length !== 0){
      this.router.navigate(['/showBills/search']); 
    }
    else{
      let toasterId = this.toastr.info("No Bill Found").toastId;
      setTimeout(() => this.toastr.clear(toasterId), 300);
    }
  }
  else{
    LandingPageComponent.visit = 0
    window.history.back();
    // this.router.navigate(['/showBills/all']);
  }
  }

  async setSearchList(val: any){
    console.log(val)
    if(isNaN(val)){
      let res = this.itemList.filter((result) => {
        return result.Name.toLowerCase().includes(this._searchTerm.toLowerCase());
      });
      LandingPageComponent.searchList = (res);
    }
    else {
      console.log(this._searchTerm)
      let res = this.itemList.filter((result) => {
        console.log(result.Bill_No.toLowerCase() == this._searchTerm)
        return result.Bill_No.toLowerCase() == this._searchTerm
      });
      LandingPageComponent.searchList = (res);
    }
  }

  getSearchList(){
    return LandingPageComponent.searchList;
  }

  async refreshItemLists() {
    let result = await this.itemService.getItemList();
    if (Number.isInteger(result)) {
      console.log(`Error code `, result, `. Issue with the data retrival.`);
      // this.toastr.error('Error!', "Error code : " + result);
    }
    else {
      let data = result.data;
      for (let i = 1; i < data.length; i++) {
        try{
          data[i].Item_Details = JSON.parse(data[i].Item_Details);
        }catch(e){
          console.log(e);
        }
        this.itemList.push(data[i]);
      }
    }
  }

  logOut(){
    localStorage.removeItem("user");
    window.location.reload();
  }
}
