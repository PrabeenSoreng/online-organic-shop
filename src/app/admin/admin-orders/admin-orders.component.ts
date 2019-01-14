import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/models/order';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayColumns: string[] = ['orderId', 'date', 'link'];
  orders: MatTableDataSource<any>;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getOrder().subscribe(data => {
      this.orders = new MatTableDataSource(data);
      this.orders.paginator = this.paginator;
    });
  }
}
