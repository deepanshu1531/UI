import { Component, OnInit } from '@angular/core';
import { ServiceLogicService } from '../service/service-logic.service';
import { ToastrService } from 'ngx-toastr';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { GST_NO, SHOP_ADD, SHOP_CONT_NO, SHOP_EMAIL, SHOP_NAME } from '../service/constants';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrl: './bills.component.css'
})

export class BillsComponent implements OnInit {
  a: any;
  edit: boolean = false;
  itemLists = {
    Name: "",
    Mobile_no: "",
    Address: "",
    Bill_No: "",
    Bill_Date: "",
    Item_Details: [{
      item: "",
      Price: 0,
      dayRate: 0,
      making: 0,
      purity: "",
      soldBack: false,
      soldBackAmt: 0,
      weight: ""
    }],
    Item_Details_String: "",
    Calc_Amt: 0,
    Exchange: 0,
    Due: 0,
    Paid: 0,
    Sr_No: -1,
    Remark: "",
    Total_Amt: 0
  }

  SHOP_NAME = SHOP_NAME;
  SHOP_ADD = SHOP_ADD;
  SHOP_CONT_NO = SHOP_CONT_NO;
  GST_NO = GST_NO;
  SHOP_EMAIL = SHOP_EMAIL

  Math = Math

  constructor(public itemService: ServiceLogicService, private toastr: ToastrService) {
    this.a = window.location.pathname.slice(10);
  }

  ngOnInit(): void {
    this.getItem();
  }

  editBtn() {
    this.edit = true;
  }

  async updateBtn() {
    let newPaid = document.getElementById("paidAmt")?.innerText
    let popUp = document.getElementById("popUp");
    popUp?.removeAttribute("hidden");
    if (!newPaid?.slice(10, -3).includes(" ") && newPaid?.slice(10, -3) !== "" && newPaid?.slice(10, -3) !== undefined && !isNaN(Number(newPaid?.slice(10, -3)))) {
      this.itemLists.Paid = Number(newPaid?.slice(10, -3));
      this.itemLists.Due = Number(this.itemLists.Total_Amt - this.itemLists.Paid);
      this.itemLists.Item_Details_String = JSON.stringify(this.itemLists.Item_Details);
      let result: any;
      result = await this.itemService.updateBill(this.itemLists);
      if (result.status == 200) {
        LandingPageComponent.visit = 0;
        popUp?.setAttribute("hidden", "");
        this.toastr.success('Updated Successfully!');
      }
      else {
        popUp?.setAttribute("hidden", "");
        this.toastr.error('Error!', 'Item Not Added!!');
      }
      this.edit = false;
    } else {
      alert("Entered value is not valid or same as previous value");
      popUp?.setAttribute("hidden", "");
      this.toastr.error('Error!', 'Value is not valid');
    }
  }

  soldBack(index: number) {
    let soldBackAmt = prompt("Enter Price");
    if (!isNaN(Number(soldBackAmt)) && soldBackAmt !== undefined && soldBackAmt !== null && soldBackAmt !== "" && !soldBackAmt?.includes(" ")) {
      this.itemLists.Item_Details[index].soldBackAmt = parseInt(soldBackAmt + "");
      this.itemLists.Item_Details[index].soldBack = true;
    }else{
      alert("Entered value is not valid.");
      this.toastr.error('Error!', 'Value is not valid');
    }
  }

  printPdf(): void {
    const printContent = document.getElementById("bill")?.innerHTML;
    if (printContent === undefined) {
      console.error(`Element with ID bill not found`);
      return;
    }
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    location.reload();
  }

  async getItem() {
    let res = await this.itemService.getItemList();
    if (Number.isInteger(res)) {
      console.log(`Error code `, res, `. Issue with the data retrival.`);
      this.toastr.error('Error!', "Error code : " + res);
    }
    else {
      let data = res.data;
      console.log(data)
      for (let i = 1; i < data.length; i++) {
        try {
          data[i].Item_Details = JSON.parse(data[i].Item_Details);
        } catch (e) {
          console.log(e);
        }
        if (data[i].Sr_No == this.a) {
          this.itemLists = data[i];
          console.log(data[i])
        }
      }
      console.log(this.itemLists)
    }
  }

  async deleteBill(id: number){
    let popUp = document.getElementById("popUp");
    popUp?.removeAttribute("hidden");
    let res = await this.itemService.deleteBill(id);
    if (Number.isInteger(res)) {
      this.toastr.error('Error!', "Error code : " + res);
    }
    else {
      let data = res;
      popUp?.setAttribute("hidden", "");
      window.location.href = '/showBills/all';
      this.toastr.success('Bill deleted sucessfully', data)
    }
  }

}
