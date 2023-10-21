import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {


  employeeArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
   name: string ="";
  phonenumber: string ="";
  address: string ="";
  email: string ="";
  password: string ="";
  originalpass:string="";
  currentemployeeID = "";
  constructor(private http: HttpClient ) 
  {
    this.getAllemployee();
  }
  ngOnInit(): void {
  }
  getAllemployee()
  { 
    this.http.get("http://localhost:8085/api/employee/")
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.employeeArray = resultData.data;
    });
  }
  
  register()
  {
    
    let bodyData = {
      "name" : this.name,
      "phonenumber" : this.phonenumber,
      "email" : this.email,
      "address" : this.address,
      "password" : this.password,
      "originalpass":this.password
    };
    this.http.post("http://localhost:8085/api/employee/add",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        if(resultData.status)
        {
        alert("Employee Registered Successfully")
        
        this.getAllemployee();
        }else{
          alert('Employee already Exist')
        }
      
    });
  }
  setUpdate(data: any) 
  {
   this.name = data.name;
   this.phonenumber = data.phonenumber;
   this.email = data.email;
  this.address=data.address;
  this.password=data.password;
  this.originalpass=data.originalpass;
   this.currentemployeeID = data.id;
 
  }
  UpdateRecords()
  {
    let bodyData = 
    {
      "name" : this.name,
      "phonenumber" : this.phonenumber,
      "email" : this.email,
      "address" : this.address,
      "password" : this.password,
      "originalpass":this.originalpass

    };
    
    if(this.isvalid())
    {
    this.http.put("http://localhost:8085/api/employee/update"+ "/"+ this.currentemployeeID,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("employee Registered Updated")
        this.clear();
        this.getAllemployee();
      
    });
  }else{
    alert('please fill up all fields')
  }
  }
 
  save()
  {
    
    if(this.isvalid()==true)
    {
    if(this.currentemployeeID == '')
    {
        this.register();
        this.clear();
    }
      else
      {
       this.UpdateRecords();
       this.clear();
      } 
    }else{
      alert('please fill up all fields')
    }     
  }
  setDelete(data: any)
  {
    this.http.delete("http://localhost:8085/api/employee/delete"+ "/"+ data.id).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("employee Delete")
        this.clear();
        this.getAllemployee();
    });
  }

  clear(){
    this.name = '';
     this.phonenumber = '';
     this.email ='';
     this.password ='';
     this.address ='';
     this.currentemployeeID = "";
     this.originalpass='';
  }

  mobile:String='';
  isvalid(){
    if(this.name=='' || this.name.trim().length==0 ||  this.password =='' ||  this.password.trim().length==0
   ||this.email.trim().length==0 || this.email=='' ||  this.phonenumber =='' ||  
      this.address==''  || this.address.trim().length==0)
    {
      return false;
    }else{
      let ck = this.validateEmail(this.email);
      if (ck) {
       this.mobile=this.phonenumber+"";
      if(this.mobile.length!=10)
      {
        alert('enter valid 10 digit phone number')
        return false;
      }else{
      return true;
      }
    }else{
      alert('Invalid email address');
      return false;
    }
    }
  }

   validateEmail(email: string): boolean {
    
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
  

}
