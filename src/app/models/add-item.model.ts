import { ItemDetailsModel } from "./item-details.model";

export class AddItemModel{
    name: string = "";
    mob: string = "";
    add : string = "";
    city : string = "";
    state : string = "";
    billNo : string = "";
    billDate : Date = new Date();
    itemDetails: ItemDetailsModel[] = [];
    itemDetailsString : string = "";
    calcAmt!: number;
    gstApplied: boolean = true;
    exchange: boolean = false;
    exchangeAmt!: number;
    amt! : number;
    due! : number; 
    paid! : number;
    srNo! : number;
    remark : string = "";
}
