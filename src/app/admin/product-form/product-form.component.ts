import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getCategories();
  }

  save(product) {
    this.productService.create(product.value);
  }
}