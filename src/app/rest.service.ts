import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private http: HttpClient) {}
  id:number=1000;

  getProduct() {
    return this.http.get<any>('  http://localhost:8000/getAllProducts').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  baseUrl="http://localhost:8000/"

  getOrders(){

    let url=this.baseUrl +"AllOrders";
    return this.http.get(url);
  }

  Order(orderDetails: any[]){

    let url=this.baseUrl +"orderPlaced";
    let header={'content-type':'application/json'}
     
    return this.http.post(url,orderDetails,{'headers':header, responseType:'text'});
  }
 
}
