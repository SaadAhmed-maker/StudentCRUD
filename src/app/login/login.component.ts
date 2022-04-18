import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform!: FormGroup

  submitted = false;
  constructor(private formbuilder: FormBuilder, private http: HttpClient, private router: Router) { }


  ngOnInit(): void {
    this.loginform = this.formbuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ['', Validators.required]
    })

  }

  // login(data: any) {
  //   debugger;
  //   this.http.post<any>("http://localhost:3000/login/", +data)
  //     .subscribe(res => {
  //       localStorage.setItem("user", "1")
  //       alert("login success !!");
  //       this.router.navigate(['student-dash'])

  //     })
      
      
  // }
  get f() {
    // this.submitted= true;
    return this.loginform.controls;
  }

  onSubmit() 
      {
        
    console.log("asdasd")
    this.submitted = true;

    if (this.loginform.invalid) {
     
      return;

    }
    if(this.loginform.get('email')?.value=="user@gmail.com" && this.loginform.get('password')?.value=="123" ){
      alert("login success")
      this.router.navigate(["/student-dash"]);

    }
    else{
      alert('login failed')
    }
    // this.login(data:any);
  }
}


