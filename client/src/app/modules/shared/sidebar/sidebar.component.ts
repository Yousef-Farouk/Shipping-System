import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';
import { Actions, PremissionMap, Roles } from '../Enums/rolesEnum';
import { GroupPrivilegeDTO } from '../../../features/admin/interfaces/group-privilege-dto';
import { PrivilegeService } from '../services/privilege.service';
import {Store } from '@ngrx/store';
import { Auth } from '../../../features/auth/store/auth.model';
import { AuthActions } from '../../../features/auth/store/auth.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  dropdownOpen = false;
  role : string | null = ''
  privileges: GroupPrivilegeDTO[] | null = null;
  Roles = Roles
  Actions = Actions
  constructor(private authService: AuthService, 
              private privilegeService: PrivilegeService,
              private store : Store<Auth>
            )
              {}

  ngOnInit(): void {
    // this.privileges = this.authService.getPrivileges();
    // console.log(this.privileges)

    this.role = this.authService.getRole(); 
  }
  
  hasPrivilege(premissionId: number, action: Actions): boolean {

    let hasPrivilege = this.authService.hasPremssion(premissionId,action);
    if(!hasPrivilege)
    {
      return false
    }

    //this.privilegeService.premissions
    return true  
  }

  logout() {
   // this.authService.logout();
   this.store.dispatch(AuthActions.logout())
  }

  get premission ()
  {
    return this.privilegeService.premissions
  }
}