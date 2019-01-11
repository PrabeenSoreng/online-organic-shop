import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  categories$;
  products: Product[] = [];
  filteredProduct: Product[] = [];
  category: string;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) { }

  ngOnInit() {
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

    this.categories$ = this.categoryService.getCategories();
  }
}
