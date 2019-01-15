import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from './shopping-cart.service';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private db: AngularFireDatabase,
    private auth: AuthService,
    private cartService: ShoppingCartService) { }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }

  getOrder() {
    return this.db.list('/orders', ref => ref.orderByChild('datePlaced')).snapshotChanges().pipe(
      map(action => {
        return action.map(payload => {
          return {
            key: payload.key,
            ...payload.payload.val()
          };
        });
      })
    );
  }

  private getAllByUser(userId: string) {
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId)).snapshotChanges();
  }

  getUserOrder() {
    return this.auth.user$.pipe(
      switchMap(user => this.getAllByUser(user.uid)),
      map(action => {
        return action.map(payload => {
          return {
            key: payload.key,
            ...payload.payload.val()
          };
        });
      })
    );
  }
}
