import { Component, OnInit } from '@angular/core';
import { ServiceLogicService } from '../service/service-logic.service';
import { AddItemModel } from '../models/add-item.model';
import { NgForm } from '@angular/forms';
import { ItemDetailsModel } from '../models/item-details.model';
import { ToastrService } from 'ngx-toastr';
import { LandingPageComponent } from '../landing-page/landing-page.component';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrl: './add-item-form.component.css',
  providers: [ServiceLogicService]
})
export class AddItemFormComponent implements OnInit {

  itemDetailsLocal: ItemDetailsModel = new ItemDetailsModel;
  count: number = 0;
  submitDisable = true;
  exchangeDisable = true;
  makingCharge = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

  ngOnInit(): void {
    this.resetForm();
  }
  constructor(public itemService: ServiceLogicService, private toastr: ToastrService) { }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }

    this.itemService.selectedItem = {
      name: "",
      mob: "",
      add: "",
      city: "",
      state: "",
      billNo: "",
      billDate: new Date(),
      itemDetails: [],
      itemDetailsString: "",
      calcAmt: 0,
      amt: 0,
      due: 0,
      paid: 0,
      srNo: -1,
      remark: "",
      gstApplied: true,
      exchange: false,
      exchangeAmt: 0
    }
  }

  // To add item in the form..
  addItemDetails(itemDetail: ItemDetailsModel) {
    if (this.addItemValidation(itemDetail)) {
      itemDetail.item = itemDetail.itemType + " " + itemDetail.itemDis.toLowerCase();
      this.itemService.selectedItem.itemDetails.push(itemDetail);
      this.onGSTcheck();
      this.itemDetailsLocal = new ItemDetailsModel();
      if (this.itemService.selectedItem.itemDetails.length !== 0) {
        this.submitDisable = false;
      }
    } else {
      this.toastr.error('Error!', 'Fields are not correct!!');
    }
  }

  // Making charges calculation
  async makingCalc() {
    if (this.itemDetailsLocal.dayRate > 0 && this.itemDetailsLocal.weight) {
      setTimeout(() => {
        let dayRateAndWeight = (Number(this.itemDetailsLocal.dayRate) / 10) * Number(this.itemDetailsLocal.weight);
        let makingPercentage = Number(this.itemDetailsLocal.makingPer) / 100;
        this.itemDetailsLocal.making = Math.round(dayRateAndWeight * makingPercentage);
        console.log(this.itemDetailsLocal.making);
      }, 200);
    }
  }

  // Form submit...
  async onSubmit(form: NgForm) {
    let popUp = document.getElementById("popUp");
    popUp?.removeAttribute("hidden");
    if (this.submitValidation(form)) {
      try {
        if (form.value.srNo < 0) {
          let result: any;
          this.itemService.selectedItem.billNo = this.itemService.selectedItem.billNo.toUpperCase();
          this.itemService.selectedItem.add = this.itemService.selectedItem.add.concat(", ", this.itemService.selectedItem.city.toUpperCase(), ", ", this.itemService.selectedItem.state.toUpperCase(), ", India");
          this.itemService.selectedItem.due = this.itemService.selectedItem.amt - this.itemService.selectedItem.paid;
          if (this.itemService.selectedItem.gstApplied)
            this.itemService.selectedItem.remark += " ||-(Bill with 3.0 % GST)"
          this.itemService.selectedItem.itemDetailsString = JSON.stringify(this.itemService.selectedItem.itemDetails);
          result = await this.itemService.addBill(this.itemService.selectedItem);
          console.log(result)
          if (result.status == 200) {
            LandingPageComponent.visit = 0;
            this.toastr.success('Saved Successfully!', 'Item Added!!');
            form.reset();
            window.location.href = '/viewBill/' + result.data;
          }
          else {
            popUp?.setAttribute("hidden", "");
            this.toastr.error('Error!', 'Item Not Added!!');
          }
        }
      } catch (error) {
        if (error) {
          popUp?.setAttribute("hidden", "");
          console.log("Error Occureed!!", error);
          this.toastr.error('Error!', 'Error!!');
        }
      }
    } else {
      popUp?.setAttribute("hidden", "");
      this.toastr.error('Error!', 'Fields are not correct!!');
    }
  }

  // GST calculation...
  onGSTcheck() {
    setTimeout(() => {
      this.itemService.selectedItem.calcAmt = 0;
      for (let itemDetail of this.itemService.selectedItem.itemDetails) {
        console.log((Number(itemDetail.dayRate) / 10) + " " + Number(itemDetail.weight) + " " + Number(itemDetail.making))
        if (this.itemService.selectedItem.gstApplied) {
          let localPrice = ((Number(itemDetail.dayRate) / 10) * Number(itemDetail.weight)) + Number(itemDetail.making);
          itemDetail.Price = localPrice + (localPrice * 0.03);
          this.itemService.selectedItem.calcAmt += itemDetail.Price;
        }
        else {
          itemDetail.Price = ((Number(itemDetail.dayRate) / 10) * Number(itemDetail.weight)) + Number(itemDetail.making);
          this.itemService.selectedItem.calcAmt += itemDetail.Price;
        }
      }
    }, 1)
  }

  // Exchange calculation
  onExchangeCheck() {
    setTimeout(() => {
      if (!this.exchangeDisable) {
        this.itemService.selectedItem.exchangeAmt = 0;
      }
      this.exchangeDisable = !this.exchangeDisable;
    }, 1);
  }

  // To Delete added item in the field..
  onDeleteItemDetail(item: ItemDetailsModel, index: number) {
    this.itemService.selectedItem.calcAmt -= item.Price;
    this.itemService.selectedItem.itemDetails.splice(index, 1);
    this.toastr.success('deleted!');
    if (this.itemService.selectedItem.itemDetails.length === 0) {
      this.submitDisable = true;
    }
  }

  // Form validation on submit...
  submitValidation(form: NgForm): boolean {
    const selectedItem = this.itemService.selectedItem;
    if (!selectedItem.name || selectedItem.name.trim() === '') {
      alert('Name is required');
      return false;
    }
    if (!selectedItem.mob || !/^\d{10}$/.test(selectedItem.mob)) {
      alert('Valid mobile number is required');
      return false;
    }
    if (!selectedItem.add || selectedItem.add.trim() === '') {
      alert('Address is required');
      return false;
    }
    if (!selectedItem.city || selectedItem.city.trim() === '') {
      alert('City is required');
      return false;
    }
    if (!selectedItem.state || selectedItem.state.trim() === '') {
      alert('State is required');
      return false;
    }
    if (!selectedItem.billNo || selectedItem.billNo.trim() === '') {
      alert('Bill number is required');
      return false;
    }
    if (!selectedItem.billDate) {
      alert('Bill date is required');
      return false;
    }
    if (selectedItem.exchange) {
      if (selectedItem.exchangeAmt < 0) {
        alert('Invalid exchange amount');
        return false;
      }
    }
    if (!selectedItem.amt) {
      alert('Amount is required');
      return false;
    }
    if (!selectedItem.itemDetails.length) {
      alert('At least one item detail is required');
      return false;
    }
    return true;
  }

  // Item validation on add item..
  addItemValidation(item: ItemDetailsModel) {
    if (!item.itemType || item.itemType.trim() === '') {
      alert('Item type is required');
      return false;
    }
    if (!item.itemDis || item.itemDis.trim() === '') {
      alert('Item description is required');
      return false;
    }
    if (item.dayRate <= 0 || item.dayRate === undefined) {
      alert('Day rate must be greater than zero');
      return false;
    }
    if (Number(item.weight) <= 0 || item.weight === undefined) {
      alert('Weight must be greater than zero');
      return false;
    }
    if (item.itemType === "Gold") {
      if (item.purity <= 0 || item.purity === undefined) {
        alert('Purity must be greater than zero');
        return false;
      }
    }
    if (item.making <= 0) {
      alert('Making charges cannot be negative');
      return false;
    }
    if (item.makingPer === undefined) {
      alert('Select making charges %');
      return false;
    }
    return true
  }

}
