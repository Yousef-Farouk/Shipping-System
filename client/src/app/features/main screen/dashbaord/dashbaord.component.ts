import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { AuthService } from '../../../modules/shared/services/auth.service';
import { PrivilegeService } from '../../../modules/shared/services/privilege.service';

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrl: './dashbaord.component.css'
})
export class DashbaordComponent implements OnInit{

  constructor(private authService : AuthService,
              private route : Router,
              private premissionService : PrivilegeService) {
    
    
  }
  ngOnInit(): void {

    const role = this.authService.getRole();

    if(role == 'employee')
    {
      this.route.navigate(['/employee'])
      this.authService.loadGroupPrivilege();
    }
    else if (role == 'representative')
    {
        this.route.navigate(['/representative'])
    }
    else if(role == 'merchant')
    {
        this.route.navigate(['/merchant'])
    }

  }

}
