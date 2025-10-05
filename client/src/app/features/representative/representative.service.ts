import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Representative } from '../../modules/shared/Models/Representative';
@Injectable({
  providedIn: 'root',
})
export class RepresentativeService {
  private apiURL = 'https://localhost:5000/api/Representatives';

  constructor(private http: HttpClient) {}

  getRepresentatives(): Observable<Representative[]> {
    return this.http.get<Representative[]>(`${this.apiURL}`);
  }

  registerRepresentative(representative: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}`, representative);
  }

  deleteRepresentative(representativeId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${representativeId}`);
  }

  updateRepresentative(representativeId: string, representative: any): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/${representativeId}`, representative);
  }
  
  getGovernorates(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/governorates`);
  }
  getBranches(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/branches`);
  }
}
