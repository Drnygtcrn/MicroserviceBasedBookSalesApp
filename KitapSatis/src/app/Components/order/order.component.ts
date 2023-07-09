import { Component } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Order } from 'src/app/Class/Order';
import { Invoice } from 'src/app/Class/Invoice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  _id?:string;
  total?:number;
  odeme?:boolean;
  orderId?:string;
  fatura?:Invoice;
  username?:string;
  books ?:any[];
  adres ?: {};
  constructor(private http: HttpClient,private router: Router) { 
  }

  ngOnInit():void{
    const existingCustomerId = localStorage.getItem('existingCustomerId'); // Local Storage'dan veriyi al
    const basketTotal= localStorage.getItem('basketTotal');
    if (existingCustomerId) {
      this._id = existingCustomerId;
    };  
    if(basketTotal){
      this.total = parseFloat(basketTotal);
    }
    const Books: any = [];        //bunları da local storage'dan alıcaz.
    const serializedBasket = localStorage.getItem('Basket');
    console.log(serializedBasket);
    if (serializedBasket) {
      const basket = JSON.parse(serializedBasket);
      for (const product of basket.Products) {
        const proid = product.proid;
        const name = product.name;
        const price = product.price;
        const quantity = product.quantity;
        const book = {
          proid:proid,
          name: name,
          price: price,
          quantity: quantity
        };
        Books.push(book);
      }
      console.log(Books); 
    }
    
            
    let isValidd = true;
    
    const booksParam = encodeURIComponent(JSON.stringify(Books));
    const params = new HttpParams().set('books', booksParam);
    console.log(params);

    this.http.get<{isValid:boolean}>('http://localhost:8000/storage/control', { params }).subscribe((response) => {
      isValidd = response.isValid;
      console.log('Sonuç:', isValidd);
    }, (error) => {
      console.error('Hata:', error);
    });

    const User:any = {
      UserId:this._id,
      Username:"Deniz Dilbaz",      //bunları local storage'dan alıcaz
      UserPhone:"05414015011"
    }
    const Address: any = {
      street:"Mansuroğlu",          //bunları da 
      postalCode:"31231",
      city:"izmir",
      country:"Türkiye"
    }
    const status = "sipariş alındı";      
    const total = this.total; 

    if(isValidd){
      const params = {
        User,Books,Address,status,total
      };
      this.http.post<{OrderId: string}>('http://localhost:8000/order/create', params ).subscribe(data => {
      this.orderId = data.OrderId;
      console.log("ID:",this.orderId);
    });
    }


    this.books = Books;
    this.odeme = true;
  }

  depo(){
    const booksParam = encodeURIComponent(JSON.stringify(this.books));
    const params = new HttpParams().set('books', booksParam);
    console.log(this.books);

    let isValidd = false;

    this.http.get<{isValid:boolean}>('http://localhost:8000/storage/decreaseall', { params }).subscribe((response) => {
      isValidd = response.isValid;
      console.log('Sonuç:', isValidd);
    }, (error) => {
      console.error('Hata:', error);
    });

    if (isValidd){
      //notify
    }
    else{
      //notify
    }
  }

  siparisOlustur(){
    this.odeme = !this.odeme;
    //sepeti temizle
    if (this.orderId) {
      this.depo();
      const params = new HttpParams().set('OrderId', this.orderId);
      console.log("ID:",this.orderId);
      this.http.get<{Username: string, Books: any[], Adres: any, Total: number}>('http://localhost:8000/order/getInvoice',  {params}  ).subscribe(data => {
        this.username = data.Username;
        this.books = data.Books;
        console.log(this.books);
        this.adres = data.Adres;
        this.total = data.Total;
        this.falseSil();
      });
    }


  }

  falseSil(){
    //order payment == false olanları sil.
  }

  siparisiBitir(){
    this.odeme = !this.odeme;
    localStorage.setItem('basketTotal',"0");
    const requestBody = {
      CustomerId: this._id
    };
  
    this.http.delete('http://localhost:8000/basket/deleteAll', { body: requestBody }).subscribe(
      (response) => {
        localStorage.removeItem('Basket');
      },
      (error) => {
        // İstek sırasında bir hata oluştu
        console.error(error);
      }
    );
    this.router.navigate(['/Sepet']).then(() => {
      window.location.reload();
    });
    
    
  }

  getTotalPrice(book:any){
    return parseFloat(book.price) * book.quantity;
  }




}
