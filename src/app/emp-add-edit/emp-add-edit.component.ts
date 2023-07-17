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
