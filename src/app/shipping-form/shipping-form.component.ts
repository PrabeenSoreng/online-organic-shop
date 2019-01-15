import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Order } from 'shared/models/order';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  userId: string;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private auth: AuthService,
    private orderService: OrderService) { }

  ngOnInit() {
    this.userSubscription = this.auth.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder(form: NgForm) {
    let order = new Order(this.userId, form.value, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
