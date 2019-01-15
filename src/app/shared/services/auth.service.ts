import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppUser } from 'shared/models/app-user';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) {
    this.user$ = this.afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(result => {
        if(result.user) {
          this.userService.save(result.user);

          let route = localStorage.getItem('returnUrl');
          this.router.navigateByUrl(route);
        }
      });
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(result => {
        this.router.navigate(['/']);
      });
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap(user => {
        if(user) return  this.userService.get(user.uid).valueChanges();

        return of(null);
      })
    );
  }
}
