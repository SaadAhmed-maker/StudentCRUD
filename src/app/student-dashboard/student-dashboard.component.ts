import { Component, OnInit} from '@angular/core';
import { FormArray, FormBuilder,FormControl,FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { StudentModel} from './student.model';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  
  studentValue!: FormGroup;

  studentObj: StudentModel = new StudentModel;

  studentList: any = [];

  btnSaveShow: boolean = true;
  btnUpdateShow: boolean = false;
  submitted = false;



  constructor(private formbuilder: FormBuilder, private api: ApiService, private router: Router , 
    private http:HttpClient) {}

  ngOnInit(): void {

    this.studentValue = this.formbuilder.group({
      name: ['', [Validators.required, Validators.pattern("^[a-zA-Z]*$")]],
      class: ['', [Validators.required,Validators.pattern ("^[a-zA-Z0-9_]*$")]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      filename: [''],
      
      // <-----------------------FORM ARRAY STARTS----------------->
      skills: new FormArray([
        new FormControl(null)
      
        
      ])

      //<------------------------FORM ARRAY ENDS------------------------->

    })
      this.getStudent();


  }

  AddStudent() {
    this.studentObj.name = this.studentValue.value.name;
    this.studentObj.class = this.studentValue.value.class;
    this.studentObj.email = this.studentValue.value.email;
    this.studentObj.mobile = this.studentValue.value.mobile;
    this.studentObj.filename = this.studentValue.value.filename;
    this.api.postStudent(this.studentObj).subscribe({
      next: (v) => {
        console.log(v)
      },
      error: (e) => {
        console.log(e)
        alert("Error")
      },

      complete: () => {
        console.log('Student record added!')
        alert("Student record added!")
        this.getStudent();
        this.studentValue.reset();

      }
    })
  }

  getStudent() {
    this.api.getStudent().subscribe(res => {
      this.studentList = res;
    })

  }

  deleteStudent(data: any) {
    this.api.deleteStudent(data.id).subscribe({
      next: (v) => {
        console.log(v)
      },
      error: (e) => {
        console.log(e)
        alert("Error")
      },

      complete: () => {
        console.log('Student record deleted!')
        alert("Student record deleted!")
        this.getStudent();


      }
    })
  }

  editStudent(data: any) {
    this.studentValue.controls["name"].setValue(data.name);
    this.studentValue.controls["class"].setValue(data.class);
    this.studentValue.controls["email"].setValue(data.email);
    this.studentValue.controls["mobile"].setValue(data.mobile);
    this.studentObj.id = data.id;
    this.showUpdate();
  }

  updateStudent() {
    this.submitted = true;
    if (this.studentValue.invalid) {

      return;
    }
    this.studentObj.name = this.studentValue.value.name;
    this.studentObj.class = this.studentValue.value.class;
    this.studentObj.email = this.studentValue.value.email;
    this.studentObj.mobile = this.studentValue.value.mobile;
    // this.onSubmit()

    this.api.putStudent(this.studentObj, this.studentObj.id).subscribe({
      next: (v) => {
        console.log(v)
      },
      error: (e) => {
        console.log(e)
        alert("Error")
      },

      complete: () => {
        console.log('Student record Updated!')
        alert("Student record Updated!")
        this.getStudent();
        this.studentValue.reset();
        this.showSave();
        this.studentObj.id = 0;

      }
    })
  }

  showSave() {
    this.btnSaveShow = true;
    this.btnUpdateShow = false;
  }

  showUpdate() {
    this.btnSaveShow = false;
    this.btnUpdateShow = true;
  }

  
  onSubmit() {
    
    this.submitted = true;
    if (this.studentValue.invalid) {

      return;
    }
    this.AddStudent();
    //this.updateStudent();
  }
  get f() {
    // this.submitted= true;
    return this.studentValue.controls;
  }

  Logout(){
    localStorage.removeItem("user")
    this.router.navigate(['login'])
}

// <---------------File upload Feature----------->
  name:string = ""
  file:any;

  getName(name: string) {
    this.name = name;
  }

  getFile(event:any) {
    this.file = event.target.files[0];
    console.log("file",this.file);
  
  
  }

  submitData(){

      let formData = new FormData();
      formData.set("name", this.name)
      formData.set("file",this.file)
      this.studentObj.filename = this.studentValue.value.filename;

      this.api.postStudent(this.studentObj).subscribe({
        next: (v) => {
          console.log(v)
        },
        error: (e) => {
          console.log(e)
          alert("Error")
        },
  
        // complete: () => {
        //   console.log('Student record added!')
        //   alert("Student record added!")
        //   this.getStudent();
        //   this.studentValue.reset();
  
        })
       }

        // <-------------------------FormArray-------------->
       onAddSkills(){
         (<FormArray>this.studentValue.get('skills')).push(new FormControl(null))
       }
 // <-------------------------FormArray-------------->
    }
