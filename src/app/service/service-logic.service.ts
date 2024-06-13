import { Injectable } from '@angular/core';
import { AddItemModel } from '../models/add-item.model';
import { BACKEND_URL , TEST_BACKEND_URL} from './constants';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ServiceLogicService {

  selectedItem!: AddItemModel;
  items: AddItemModel[] = [];
  // Testing BACKEND and DB
  // readonly baseURL = TEST_BACKEND_URL;
  readonly baseURL = BACKEND_URL;

  constructor() { }

  async getItemList() {
    try {
      let result = await axios.get(this.baseURL + "?action=read");
      if(result.status === 200)
        return result.data;
      else
        return result.status
    } catch (e) {
      console.log(e);
      return 404;
    }
  }

  async addBill(item: AddItemModel) {
    try {
      let result = await axios.post(this.baseURL + "?action=add", item, {
        headers: {
          "Content-Type": "text/plain",
        }
      });
      return result;
    } catch (e) {
      console.log(e);
      return 404;
    }

  }

  async updateBill(item: any) {
    try {
      let result = await axios.post(this.baseURL + "?action=update", item, {
        headers: {
          "Content-Type": "text/plain",
        }
      });
      return result;
    } catch (e) {
      console.log(e);
      return 404;
    }
  }

  async deleteBill(id: number){
    try{
      let result = await axios.get(this.baseURL + "?srNo="+id+"&action=delete");
      if(result.status === 200)
        return result.data;
      else
        return result.status
    } catch (e){
      console.log(e);
      return 404;
    }
  }

  async getUser(){
    try {
      let user = await axios.get(this.baseURL + "?action=login");
      if(user.status === 200)
        return user.data;
      else
        return user.status
    } catch (e) {
      console.log(e);
      return 404;
    }
  }
}
