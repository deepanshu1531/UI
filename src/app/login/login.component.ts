import { CSP_NONCE, Component } from '@angular/core';
import { ServiceLogicService } from '../service/service-logic.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(public itemService: ServiceLogicService, private toastr: ToastrService) { }

  uname: string = "";
  password: string = "";

  login = async () => {
    let popUp = document.getElementById("popUp");
    if (this.uname !== "" && this.password !== "") {
      popUp?.removeAttribute("hidden");
      let result = await this.itemService.getUser();
      if (Number.isInteger(result)) {
        console.log(`Error code `, result, `. Issue with the data retrival.`);
        this.toastr.error('Error!', "Error code : " + result);
      }
      else {
        let data = result.data;
        for (let i = 1; i < data.length; i++) {
          try {
            if (this.uname === data[i].username) {
              if (this.password === data[i].password) {
                localStorage.setItem("user", JSON.stringify(data[i]))
                console.log(localStorage.getItem("user"));
                window.location.reload();
                break;
              }
              else {
                popUp?.setAttribute("hidden", "")
                this.toastr.error('Wrong Credentials');
              }
            } else {
              popUp?.setAttribute("hidden", "")
              this.toastr.error('Wrong Credentials');
            }
          } catch (e) {
            console.log(e);
            popUp?.setAttribute("hidden", "")
            this.toastr.error('Something Went Wrong!!');
          }
        }
      }
    } else {
      popUp?.setAttribute("hidden", "")
      this.toastr.error('All fields are mandatory');
    }
  }

}
