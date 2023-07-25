import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
  
})
export class EmpAddEditComponent implements OnInit {
  empForm : FormGroup;
  premiumCollegeControl = new FormControl();
  optionsControl = new FormControl();

  saveData() {
    let data = [{id:1, firstName:'G',lastName:'Sudhakar',email:'sudhakargmk12@gmail.com',dob:'1994-02-12',gender:'male',education:'Graduate',company:'Value Momentum',experience:'1',package:'6'},
    {id:2, firstName:'G',lastName:'Sandeep',email:'sandy78@gmail.com',dob:'1994-07-08',gender:'male',education:'Graduate',company:'TCS',experience:'2',package:'7'},
    {id:3, firstName:'D',lastName:'Teja',email:'teja15@gmail.com',dob:'1994-08-04',gender:'male',education:'Graduate',company:'Wipro',experience:'2',package:'10'},
    {id:4, firstName:'K',lastName:'Seshu',email:'seshu7@gmail.com',dob:'1994-08-17',gender:'male',education:'Graduate',company:'Lowes',experience:'2',package:'6'}
  ];

    localStorage.setItem('session', JSON.stringify(data));
  }

  education: string[] = [
    'Metric' ,
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate'

  ]

  constructor(private _fb:FormBuilder, private _empService: EmployeeService , private _dialogRef: DialogRef<EmpAddEditComponent>)
  
  {
  
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: ''
    }) 
   }

   onFormSubmit() {
    if(this.empForm.valid) {
      this._empService.addEmployee(this.empForm.value).subscribe({
        next: (val: any) => {
        alert('Employee added successfully');
        this._dialogRef.close();
        },
        error: (err: any) => {
          console.error(err);
        }
      })
     // console.log(this.empForm.value);
    }
   }

  ngOnInit(): void {
    this.premiumCollegeControl.valueChanges.subscribe((value) => {
      if (value === 'yes') {
        this.optionsControl.setValue('');
        this.optionsControl.enable();
      } 
      else if (value === 'no') {
        this.optionsControl.setValue('');
        this.optionsControl.enable();
      } 
      else {
        this.optionsControl.setValue('');
        this.optionsControl.disable();
      }
    });
  }

}
