import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { switchMap, take } from 'rxjs/operators';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProduct: Product[] = [];
  category: string;
  cart: any;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private cartService: ShoppingCartService,
    private productService: ProductService) { }

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart()).snapshotChanges()
      .subscribe(cart => {
        this.cart = cart.payload.val();
      });

    this.productService.getAll().pipe(
      switchMap(products => {
        this.products = products
        return this.route.queryParamMap;
      })
    )
    .subscribe(params => {
      this.category = params.get('category');
      this.filteredProduct = (this.category) ?
        this.products.filter(p => p.category === this.category) :
        this.products;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
