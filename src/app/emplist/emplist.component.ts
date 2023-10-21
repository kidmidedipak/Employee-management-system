import { Component } from '@angular/core';
import { MyserviceService } from '../services/myservice.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-emplist',
  templateUrl: './emplist.component.html',
  styleUrls: ['./emplist.component.css']
})
export class EmplistComponent {

  constructor(private myser:MyserviceService, private http:HttpClient){
    
      this.http.get("http://localhost:8085/api/employee/")
      .subscribe((resultData: any)=>
      {
          
          console.log(resultData.data);
          this.employeeArray = resultData.data;
      });
 
    
  }

  employeeArray : any[] = [];
  

}
