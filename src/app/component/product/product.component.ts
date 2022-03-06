import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { RestService } from 'src/app/rest.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  public product: any;
  public filterCategory: any;
  
  searchKey: string = '';
  // selectedValue: any;

  constructor(
    private restService: RestService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.restService.getProduct().subscribe((res) => {
      this.product = res;
      this.filterCategory = res;
      this.product.forEach((a: any) => {
       
        Object.assign(a, { quantity: 1, total: a.price });
      });
      console.log(this.product);
    });

    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }
  addtocart(item: any) {
    this.cartService.addtoCart(item);
  }
  filter(category: string) {
    this.filterCategory = this.product.filter((a: any) => {
      if (a.category == category || category == '') {
        return a;
      }
    });
  }
    stars: number[]=[1,2,3,4,5];
    selectedValue:number=0;
    ratingFilter(rating:any){

      this.filterCategory=this.product.filter((a:any) =>{
        if(a.rate >= rating){
          return a;
        }
      });
      this.selectedValue =rating;
      
    }


    priceFilter(e: any){
      this.filterCategory=this.product.filter((a:any)=>{

        if(a.price<=e.value){
            return a;
        }
      });
    }
  
}




