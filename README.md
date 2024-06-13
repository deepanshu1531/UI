Deployment ID = AKfycbw0tDG7sfYo7i-2qDu2ZEmEmypsGTuoMi1CJtgvb8T7-cgzSYYzX5MMAuVk7sZfFRBFcA

URL = https://script.google.com/macros/s/AKfycbw0tDG7sfYo7i-2qDu2ZEmEmypsGTuoMi1CJtgvb8T7-cgzSYYzX5MMAuVk7sZfFRBFcA/exec

------------------------------------------------------------------------------------------------------------------------
================= GET Requests ==================

1. Get all data:
	https://script.google.com/macros/s/AKfycbw0tDG7sfYo7i-2qDu2ZEmEmypsGTuoMi1CJtgvb8T7-cgzSYYzX5MMAuVk7sZfFRBFcA/exec?action=read

2. Find by keyword:
	https://script.google.com/macros/s/AKfycbw0tDG7sfYo7i-2qDu2ZEmEmypsGTuoMi1CJtgvb8T7-cgzSYYzX5MMAuVk7sZfFRBFcA/exec?action=find&key=deep

3. Delete by ID:
	https://script.google.com/macros/s/AKfycbw0tDG7sfYo7i-2qDu2ZEmEmypsGTuoMi1CJtgvb8T7-cgzSYYzX5MMAuVk7sZfFRBFcA/exec?srNo=2&action=delete

4. Get all users:
	https://script.google.com/macros/s/AKfycbw0tDG7sfYo7i-2qDu2ZEmEmypsGTuoMi1CJtgvb8T7-cgzSYYzX5MMAuVk7sZfFRBFcA/exec?action=login


================= POST Requests =================

1. Add data:
	https://script.google.com/macros/s/AKfycbw0tDG7sfYo7i-2qDu2ZEmEmypsGTuoMi1CJtgvb8T7-cgzSYYzX5MMAuVk7sZfFRBFcA/exec?action=add

JSON Body- 

{
    "name":Deepanshu Verma, 
    "mob":"9131283011", 
    "add":"Jabalpur",
    "billNo":123, 
    "billDate":"25/05/2024", 
    "itemDetailsString":"[
			{
				"item" : "Gold Chain",
				"dayRate" : 7200.00,
				"making" : 100.00,
				"purity" : "24k",
				"weight" : "10gm",
				"Price" : 72000.00
				"soldBack" : false
			}
		]",
    "calcAmt":72600,
	"Exchange":"",
    "amt":72000, 
    "due":0, 
    "paid":72000,
    "remark":"NIL"
}


2. Update data:
	https://script.google.com/macros/s/AKfycbw0tDG7sfYo7i-2qDu2ZEmEmypsGTuoMi1CJtgvb8T7-cgzSYYzX5MMAuVk7sZfFRBFcA/exec?action=update

JSON Body-

{
    "Sr_No":1
    "Name":Deepanshu Verma, 
    "Mobile_No":"9131283011", 
    "Address":"Jabalpur",
    "Bill_No":123, 
    "Bill_Date":"25/05/2024", 
    "Item_Details":"[
			{
				"item" : "Gold Chain",
				"dayRate" : 7200.00,
				"purity" : "24k",
				"weight" : "10gm",
				"Price" : 72000.00
				"soldBack" : false
			}
		]",
    "Calc_Amt":72600, 
	"Exchange":"",
    "Total_Amt":72000, 
    "Due":0, 
    "Paid":72000,
    "Remark":"NIL"

}

-----------------------------------------------------------------------------------------
Note: 
1. Atleast one extry should be present in the database before any POST request.
2. Use "npm i --save" before starting the UI for the first time.
