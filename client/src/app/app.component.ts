import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Auth } from './features/auth/store/auth.model';
import { AuthActions } from './features/auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'client';
  constructor(
    private store : Store<Auth>
  ){

  }

   
}
