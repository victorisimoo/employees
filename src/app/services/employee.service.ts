import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private firestore : AngularFirestore) { }

  addEmployeeFirebase(employee: any): Promise<any> {
    return this.firestore.collection("employee").add(employee);
  }

  getEmployeeFirebase(): Observable<any>{
    return this.firestore.collection("employee", ref => ref.orderBy('create_date', 'desc')).snapshotChanges();
  }

  deleteEmployeeFirebase(id: string): Promise<any>{
    return this.firestore.collection("employee").doc(id).delete();
  }

  getEmployeeInfoFirebase(id: string): Observable<any>{
    return this.firestore.collection("employee").doc(id).snapshotChanges();
  }

  editEmployeeFirebase(id: string, data: any): Promise<any>{
    return this.firestore.collection("employee").doc(id).update(data);
  }
}


