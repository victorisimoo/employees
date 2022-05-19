import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { ToastrService } from 'ngx-toastr';{}

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  employees: any[] = [];

  constructor(private _employeeService: EmployeeService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(){
    this._employeeService.getEmployeeFirebase().subscribe(data =>{
      this.employees = [];
      data.forEach((element: any) => {
        this.employees.push({
          id: element.payload.doc.id, 
          ...element.payload.doc.data()
        })
      });
      console.log(this.employees)
    });
  }

  deleteEmployee(id: string){
    this._employeeService.deleteEmployeeFirebase(id).then(() => {
      this.toastr.success('The employee was correctly eliminated', 'Correct elimination', {
        positionClass	: 'toast-top-right',
        timeOut: 2000
      })
    }).catch(error => {
      console.log(error);
    })
  }
}
