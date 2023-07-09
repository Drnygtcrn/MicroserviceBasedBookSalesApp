import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Basket } from 'src/app/Class/Basket';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sepet',
  templateUrl: './sepet.component.html',
  styleUrls: ['./sepet.component.css']
})
export class SepetComponent {

  public Basket:Basket = { };
  

   _id = " ";
  
  constructor(private http: HttpClient,private router: Router) { 
  }
  kitab?:any = {};

  totalPrice?:number;
  
  ngOnInit():void{
    const existingCustomerId = localStorage.getItem('existingCustomerId'); // Local Storage'dan veriyi al
    if (existingCustomerId) {
      this._id = existingCustomerId;
      /*const params = new HttpParams().set('CustomerId', this._id);
      this.http.get<{ basketResult: Basket[] }>('http://localhost:8000/basket/get', { params }).subscribe(data => {
      this.Basket = data.Products;
    });*/
    };
    const params = {
        CustomerId : this._id
      };
      this.http.get<{basketResult: Basket}>('http://localhost:8000/basket/get', { params }).subscribe(data => {
      this.Basket = data.basketResult;
      this.totalPrice = this.Basket.total;
      console.log("Basket:",this.Basket);
    });
  }
  /*
  getCustomer(){
    const existingCustomerId = localStorage.getItem('existingCustomerId'); // Local Storage'dan veriyi al
    if (existingCustomerId) {
      this._id = existingCustomerId;
    };
  }*/

  decreaseQuantity(product: any): void {
    if (product.quantity > 1 && this.totalPrice != null) {
      product.quantity--;      
      this.totalPrice -= parseFloat(product.price)
      const requestBody = {
        CustomerId: this._id,
        ProductId: product.proid
      };
  
      this.http.post('http://localhost:8000/basket/updateDownQuantity', requestBody).subscribe(
        (response) => {
          // İstek başarıyla tamamlandı
          console.log(response);
        },
        (error) => {
          // İstek sırasında bir hata oluştu
          console.error(error);
        }
      );
    }
  }

  increaseQuantity(product: any): void {
    product.quantity++;
    if(this.totalPrice != null){
      this.totalPrice += parseFloat(product.price)
    }
    const requestBody = {
      CustomerId: this._id,
      ProductId: product.proid
    };

    this.http.post('http://localhost:8000/basket/updateUpQuantity', requestBody).subscribe(
      (response) => {
        // İstek başarıyla tamamlandı
        console.log(response);
      },
      (error) => {
        // İstek sırasında bir hata oluştu
        console.error(error);
      }
    );
  }

  getTotalPrice(product: any): number {
    return parseFloat(product.price) * product.quantity;
  }

  delete(product:any){
    if(this.totalPrice != null){
      this.totalPrice -= product.price * product.quantity;
    }
    const httpOptions = {
      body: {
        CustomerId: this._id,
        productId: product.proid
      }
    };

    this.http.delete<{basketResult:Basket}>('http://localhost:8000/basket/deleteItem', httpOptions).subscribe(
      (response) => {
        this.Basket = response.basketResult;
      },
      (error) => {
        // İstek sırasında bir hata oluştu
        console.error(error);
      }
    );
    
  }

  order(){
    if(this.totalPrice != undefined){
      localStorage.setItem('basketTotal', this.totalPrice.toString());
      const params = {
        CustomerId : this._id
      };
      this.http.get<{basketResult: Basket}>('http://localhost:8000/basket/get', { params }).subscribe(data => {
      this.Basket = data.basketResult;
      localStorage.setItem('Basket', JSON.stringify(this.Basket));
      this.router.navigate(['/Order']).then(() => {
        window.location.reload();
      });

    });
    }
  }

}
