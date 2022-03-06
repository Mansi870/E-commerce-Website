import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartComponent } from './component/cart/cart.component';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { ProductComponent } from './component/product/product.component';

import { OrdersComponent } from './orders/orders.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'products', component: ProductComponent },
 

  {path: 'orders', component: OrdersComponent },
  { path: 'cart', component: CartComponent }
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
