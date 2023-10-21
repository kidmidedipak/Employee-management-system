import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  constructor(private http:HttpClient) { 
    
    this.http.get("http://localhost:8085/api/employee/")
    .subscribe((resultData: any)=>
    {
        console.log(resultData.data);
        this.employeeArray = resultData.data;
    });
 
  }

 private employeeArray : any[] = [];
  setlist(list:any){
this.employeeArray=list
  }

  getlist(){
    return this.employeeArray;
  }


}
