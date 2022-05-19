import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { ListEmployeesComponent } from './components/list-employees/list-employees.component';

const routes: Routes = [
  {path:'', redirectTo:'list-employes', pathMatch:'full'},
  {path: 'list-employes', component: ListEmployeesComponent},
  {path: 'create-employee', component: CreateEmployeeComponent},
  {path: 'edit-employee/:id', component: CreateEmployeeComponent},
  {path:'**', redirectTo:'list-employes', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
