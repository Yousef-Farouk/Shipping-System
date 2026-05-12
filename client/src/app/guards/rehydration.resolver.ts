import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { first, switchMap, skip, take, map } from 'rxjs';
import { AuthActions } from '../features/auth/store/auth.actions';
import { selectToken } from '../features/auth/store/auth.selectors';
import { Auth } from '../features/auth/store/auth.model';

@Injectable({ providedIn: 'root' })
export class RehydrationResolver implements Resolve<boolean> {
  constructor(private store: Store<Auth>) {}

  resolve(): Observable<boolean> {
    return this.store.select(selectToken).pipe(
      take(1),
      switchMap(token => {
        if (token) {
          // If a token already exists, rehydration has already happened or is not needed.
          return of(true);
        }

        // If no token, dispatch rehydration and wait for it to complete.
        this.store.dispatch(AuthActions.rehydtrateAuth());

        return this.store.select(selectToken).pipe(
          skip(1), // Skip the initial null value.
          take(1), // Take the next value, which is the result of the rehydration attempt.
          map(() => true) // Signal that the resolver is done.
        );
      })
    );
  }
}