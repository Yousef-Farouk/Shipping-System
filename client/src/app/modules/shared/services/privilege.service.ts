import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, pipe } from 'rxjs';
import { PrivilegeDTO } from '../../../features/admin/interfaces/privilege-dto';
import { environment } from '../../../../environments/environment';
import { PremissionMap } from '../Enums/rolesEnum';




@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {
  private apiUrl = `${environment.apiUrl}Privilege`;

  premissions : PremissionMap = {} as PremissionMap

  constructor(private http: HttpClient) {}

  getPrivileges(): Observable<PrivilegeDTO[]> {
    //console.log(this.apiUrl)
    return this.http.get<PrivilegeDTO[]>(this.apiUrl);
  }

  getPrivilegeById(id: number): Observable<PrivilegeDTO> {
    return this.http.get<PrivilegeDTO>(`${this.apiUrl}/GetPrivilegeById/${id}`);
  }

  loadPrivilege() : Observable<any>
  {
     return this.getPrivileges().pipe(

      catchError((error) => {
      console.log('Error loading privileges in APP_INITIALIZER:', error);
      // Return a successful observable with an empty value (like an empty array).
      // This allows the app to continue starting up even if the API call fails.
      return of([]); 
      }),
      tap(definitions => {
          this.premissions = definitions.reduce((map:PremissionMap,p)=>{
            map[p.name] = p.id
            return map;
          },{} as PremissionMap)
          console.log(this.premissions)
        }),  
      
    )
     

  }


}


