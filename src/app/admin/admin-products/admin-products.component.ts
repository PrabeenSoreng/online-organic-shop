import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  products: MatTableDataSource<Product>;
  filteredProducts: any[] = [];
  subscription: Subscription;
  displayColumns: string[] = ['title', 'price', 'link'];


  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.subscription = this.productService.getAll()
    .subscribe(products => {
      this.filteredProducts = products;
      this.products = new MatTableDataSource(products);
      this.products.paginator = this.paginator;
      this.products.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.products.filter = filterValue.trim().toLowerCase();

    if(this.products.paginator) this.products.paginator.firstPage();
  }

  // filter(query: string) {
  //   this.filteredProducts = (query) ?
  //     this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
  //     this.products;
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}