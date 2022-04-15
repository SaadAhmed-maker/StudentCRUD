import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from "@angular/forms"
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginform!:FormGroup
  constructor(private formbuilder :FormBuilder, private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.loginform=this.formbuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }
  login(data:any){
    
    this.http.post<any>("http://localhost:3000/login/",data)
    .subscribe(res=>{

     // localStorage.setItem("user","1")
      // alert("login success !!");
      // this.router.navigate(['student-dashboard'])
      

    
    }
    )}
  
}


