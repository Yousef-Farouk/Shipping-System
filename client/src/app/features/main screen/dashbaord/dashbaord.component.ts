import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../modules/shared/services/auth.service';
import { PrivilegeService } from '../../../modules/shared/services/privilege.service';
import { Roles } from '../../../modules/shared/Enums/rolesEnum';

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrl: './dashbaord.component.css'
})
export class DashbaordComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private premissionService: PrivilegeService
  ) {}

  ngOnInit(): void {
    // Only redirect if no child route is currently active.
    if (!this.activatedRoute.firstChild) {
      const role = this.authService.getRole();

      if (role === Roles.employee) {
        this.router.navigate(['employee'], { relativeTo: this.activatedRoute, replaceUrl: true });
        this.authService.loadGroupPrivilege();
      } else if (role === Roles.representative) {
        this.router.navigate(['representative'], { relativeTo: this.activatedRoute, replaceUrl: true });
      } else if (role === Roles.merchant) {
        this.router.navigate(['merchant'], { relativeTo: this.activatedRoute, replaceUrl: true });
      }
    }
  }
}
