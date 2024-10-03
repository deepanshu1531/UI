# Google Apps Script API - School Management Application

## Overview
This is a **Google Apps Script API** that provides several endpoints to manage data for a school management system. The API supports various operations like fetching, adding, updating, and deleting data for users. The application is designed for handling requests through Google Apps Script Web Apps deployment.

## Deployment Details
- **Deployment ID**: `AKfycbw0tDG7sfYo7i-2qDu2ZEmEmypsGTuoMi1CJtgvb8T7-cgzSYYzX5MMAuVk7sZfFRBFcA`
- **Base URL**: [https://script.google.com/macros/s/AKfycbw0tDG7sfYo7i-2qDu2ZEmEmypsGTuoMi1CJtgvb8T7-cgzSYYzX5MMAuVk7sZfFRBFcA/exec](https://script.google.com/macros/s/AKfycbw0tDG7sfYo7i-2qDu2ZEmEmypsGTuoMi1CJtgvb8T7-cgzSYYzX5MMAuVk7sZfFRBFcA/exec)

## GET Requests

### Get All Data
Retrieve all records from the database.

```bash
GET https://script.google.com/macros/s/AKfycbw0tDG7sfYo7i-2qDu2ZEmEmypsGTuoMi1CJtgvb8T7-cgzSYYzX5MMAuVk7sZfFRBFcA/exec?action=read
```
### Find Data by Keyword
Retrieve all records from the database.

```bash
GET https://script.google.com/macros/s/AKfycbw0tDG7sfYo7i-2qDu2ZEmEmypsGTuoMi1CJtgvb8T7-cgzSYYzX5MMAuVk7sZfFRBFcA/exec?action=find&key=deep
```
### Delete by ID

```bash
GET https://script.google.com/macros/s/AKfycbw0tDG7sfYo7i-2qDu2ZEmEmypsGTuoMi1CJtgvb8T7-cgzSYYzX5MMAuVk7sZfFRBFcA/exec?srNo=2&action=delete
```
### Get All Users
Retrieve all records from the database.

```bash
GET https://script.google.com/macros/s/AKfycbw0tDG7sfYo7i-2qDu2ZEmEmypsGTuoMi1CJtgvb8T7-cgzSYYzX5MMAuVk7sZfFRBFcA/exec?action=login
```
### Add Data
Retrieve all records from the database.

```bash
POST https://script.google.com/macros/s/AKfycbw0tDG7sfYo7i-2qDu2ZEmEmypsGTuoMi1CJtgvb8T7-cgzSYYzX5MMAuVk7sZfFRBFcA/exec?action=add

{
    "name": "Deepanshu Verma",
    "mob": "9131283011",
    "add": "Jabalpur",
    "billNo": 123,
    "billDate": "25/05/2024",
    "itemDetailsString": "[{\"item\": \"Gold Chain\", \"dayRate\": 7200.00, \"making\": 100.00, \"purity\": \"24k\", \"weight\": \"10gm\", \"Price\": 72000.00, \"soldBack\": false}]",
    "calcAmt": 72600,
    "Exchange": "",
    "amt": 72000,
    "due": 0,
    "paid": 72000,
    "remark": "NIL"
}
```
### Update Data
Retrieve all records from the database.

```bash
POST https://script.google.com/macros/s/AKfycbw0tDG7sfYo7i-2qDu2ZEmEmypsGTuoMi1CJtgvb8T7-cgzSYYzX5MMAuVk7sZfFRBFcA/exec?action=update

{
    "Sr_No": 1,
    "Name": "Deepanshu Verma",
    "Mobile_No": "9131283011",
    "Address": "Jabalpur",
    "Bill_No": 123,
    "Bill_Date": "25/05/2024",
    "Item_Details": "[{\"item\": \"Gold Chain\", \"dayRate\": 7200.00, \"purity\": \"24k\", \"weight\": \"10gm\", \"Price\": 72000.00, \"soldBack\": false}]",
    "Calc_Amt": 72600,
    "Exchange": "",
    "Total_Amt": 72000,
    "Due": 0,
    "Paid": 72000,
    "Remark": "NIL"
}
```
## Note
- At least one entry should be present in the database before making any POST requests.
- Before starting the UI for the first time, ensure to run:
```
npm i --save
```


