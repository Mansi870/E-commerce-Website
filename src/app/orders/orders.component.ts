import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  public products: any = [];
public orderList:any=[];
  constructor(private http:HttpClient,private restService : RestService) { }

  ngOnInit(): void {
    this.restService.getOrders().subscribe((res)=>{
      this.orderList=res;
      
      console.log(res)
    })
         
      }
      
      
  }

  

    
  


