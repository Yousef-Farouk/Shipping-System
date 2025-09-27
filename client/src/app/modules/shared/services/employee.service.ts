import { ApiService } from './api.service';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Employee } from '../Models/Employee';
import { environment } from '../../../../environments/environment';
ApiService


@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends ApiService<Employee> {
  


  constructor(http:HttpClient , @Inject('apiUrl') protected apiUrl:string ) 
  {
    super(http,environment.apiUrl+'Employees')
  }


  searchByName(name : string):Observable<Employee>{
    return this.http.get<Employee>(`${this.apiUrL}/name/${name}`)
  }

 
}
