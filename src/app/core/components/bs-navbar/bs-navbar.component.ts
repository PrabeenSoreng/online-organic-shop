import { Component, OnInit } from '@angular/core';

import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(
    private cartSerivce: ShoppingCartService,
    private auth: AuthService) { }

  async ngOnInit() {
    this.auth.appUser$
      .subscribe(appUser => this.appUser = appUser);

      this.cart$ = await this.cartSerivce.getCart();
  }

  logout() {
    this.auth.logout();
  }
}
