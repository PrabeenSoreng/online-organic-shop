import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CustomFormsModule } from 'ng2-validation';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    NgbModule.forRoot()
  ],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent
  ],
  providers: [
    AuthService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService,
    AuthGuard,
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    CommonModule,
    FormsModule,
    CustomFormsModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    NgbModule.forRoot().ngModule
  ]
})
export class SharedModule { }
