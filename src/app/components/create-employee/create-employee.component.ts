import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  createEmployee: FormGroup;
  submited = false;
  loading = false;
  id : string | null;
  title_scene = "Add employee";
  status_action = "Add new";

  constructor(private fb: FormBuilder, private _employee: EmployeeService, private router: Router,
    private toastr: ToastrService, private aRoute: ActivatedRoute) {
    this.createEmployee = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      document: ['', Validators.required],
      salary: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.isEdit();
  }

  create_employee(){
    this.submited = true;
    if(this.createEmployee.invalid){
      return;
    }

    if(this.id === null){
      this.addEmployee();
    }else {
      this.editEmployee(this.id);
    }
  }

  addEmployee(){
    const employee: any = {
      name : this.createEmployee.value.name,
      lastname : this.createEmployee.value.lastname,
      document : this.createEmployee.value.document,
      salary : this.createEmployee.value.salary,
      create_date : new Date(),
      update_date : new Date()
    }

    this.loading = true;

    this._employee.addEmployeeFirebase(employee).then(() => {
      this.toastr.success('The employee is successfully created', 'Successful registration', {
        positionClass	: 'toast-top-right',
        timeOut: 2000
      })
      this.loading = false;
      this.router.navigate(['/list-employes']);
    }).catch(error =>{
      console.log(error)
    });

  }

  editEmployee(id: string){
    this.loading = true;

    const employee: any = {
      name : this.createEmployee.value.name,
      lastname : this.createEmployee.value.lastname,
      document : this.createEmployee.value.document,
      salary : this.createEmployee.value.salary,
      update_date : new Date()
    }

    this._employee.editEmployeeFirebase(id, employee).then(() =>{
      this.toastr.success('The employee was successfully modified', 'Editing successful', {
        positionClass	: 'toast-top-right',
        timeOut: 2000
      })
      this.loading = false;
      this.router.navigate(['/list-employes']);
    }).catch(error => {
      console.log(error);
    })

  }

  isEdit(){    
    if(this.id !== null){
      this.loading = true;
      this.title_scene = "Edit employee";
      this.status_action = "Save"
      this._employee.getEmployeeInfoFirebase(this.id).subscribe(data => {
        this.loading = false;
        this.createEmployee.setValue({
          name : data.payload.data()['name'],
          lastname : data.payload.data()['lastname'],
          document : data.payload.data()['document'],
          salary : data.payload.data()['salary']
        });
      });
    }
  }

}
