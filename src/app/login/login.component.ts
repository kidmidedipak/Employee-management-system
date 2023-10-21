import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private http: HttpClient, private router: Router ) 
  {
     
  }

  email: string ="";
  password: string ="";


  login(){
    let bodyData = {
      "email" : this.email, 
      "originalpass" : this.password,
    };
    console.log(bodyData)
    this.http.post("http://localhost:8085/api/employee/login",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        if(resultData.status){
          this.router.navigate(['/dashboard']);
        }
      else{
        alert("Incorrect username or password")

      }  
      
    });
  }

}
