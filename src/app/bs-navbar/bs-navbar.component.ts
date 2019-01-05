import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.user$ = this.afAuth.authState;
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
