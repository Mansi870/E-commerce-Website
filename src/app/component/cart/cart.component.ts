import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';
import { RestService } from 'src/app/rest.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public products: any = [];

  public grandTotal!: number;
  currentDateObj=new Date();
  orderDetails: any[] | undefined;
  arrayDemo: any=[];
 

  constructor(private cartService: CartService,private http: HttpClient,private restService: RestService,private router:Router) {}



  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res) => {
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
      
    });
  }
 

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }
  emptycart() {
    this.cartService.removeAllCart();
  }

  Order(){
    alert("Order Placed");
    this.orderDetails=[];
    for(let item in this.products){

      var OrderObj={
        id:0,
        title:'',
        image:'',
        price:'',
        OrderDate:'',
        DeliveryDate:''
      }
      OrderObj.id=++this.restService.id,
      OrderObj.title=this.products[item].title;
      OrderObj.image=this.products[item].image;
      OrderObj.price=this.products[item].price;
      OrderObj.OrderDate="22-02-2022";
      OrderObj.DeliveryDate="25-02-2022"

      this.orderDetails.push(OrderObj); 
    }
      this.restService.Order(this.orderDetails).subscribe((res)=>{
      console.log('Order Placed');
    this.emptycart();
    this.router.navigate(['/orders'])
    // alert("Order placed");
    });

  }
  addAddress(email: string,
    address: string,
    city: string,
    phone: string){
    let userAddressObject={
      email,
      address,
      city,
      phone
    }
    console.log(userAddressObject)
    this.arrayDemo.push(userAddressObject);
    console.log(this.arrayDemo)

   
    
  }
}
