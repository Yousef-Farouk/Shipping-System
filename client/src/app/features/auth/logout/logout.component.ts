import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../modules/shared/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private authService: AuthService, private router: Router) {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
