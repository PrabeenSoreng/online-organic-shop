import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayColumns: string[] = ['orderId', 'date', 'link'];
  orders: MatTableDataSource<any>;

  constructor(
    private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getUserOrder().subscribe(data => {
      this.orders = new MatTableDataSource(data);
      this.orders.paginator = this.paginator;
    });
  }
}
