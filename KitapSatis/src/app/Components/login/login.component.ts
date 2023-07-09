import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from 'src/app/Class/Customer';
import { GirisService } from 'src/app/Service/giris.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  existingCustomer:Customer = {
    _id:'',
    name: '',
    email: '',
    password: '',
    phone: '',
    age:''
  }

  sorgu = {
    email:'',
    password:''
  }

  id:string = "asd";
  giris: boolean = false;
  
  constructor(private http: HttpClient,private girisService: GirisService,private router: Router) {
    this.girisService.data.subscribe( (msg) => { this.giris = msg } );
  }
  
  degistir() {
    this.girisService.degistir(!this.giris);
  }

  onSubmit() {
    const url = 'http://localhost:8000/customer/login';
    console.log(this.sorgu);
  
    const params = {
      email: this.sorgu.email,
      password: this.sorgu.password
    };
 


    this.http.get<{ existingCustomer: Customer }>(url, { params }).subscribe(
      (response) => {
        console.log('İstek başarılı:', response);
        this.existingCustomer = response.existingCustomer;
        if (this.existingCustomer && this.existingCustomer._id) {
          localStorage.setItem('existingCustomerId', this.existingCustomer._id); 
          localStorage.setItem('girisDurumu', 'true');
          //this.degistir();
        }
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      },
      (error) => {
        console.error('İstek hatası:', error);
        // başarısızsa sayfada kal bilgi ver
      }
    );
  }


  




  
  /*
  onSubmit(){
    const url = 'http://localhost:8000/customer/login';
    console.log(this.sorgu);
    this.http.get<Customer>(url,{params: this.sorgu}).subscribe(
      (response) => {
        console.log('İstek başarılı:', response);
        this.existingCustomer = response;
        this.degistir();
      },
      (error) => {
        console.error('İstek hatası:', error);
        // başarısızsa sayfada kal bilgi ver
      }
    );
  } 
  */













  /*
  onSubmit(){
    const url = 'http://localhost:8000/customer/login';
    console.log(this.sorgu);
    this.http.get<Customer>(url,{params: this.sorgu}).subscribe(
      (response) => {
        console.log('İstek başarılı:', response);
        this.customer = response;
        this.degistir();
      },
      (error) => {
        console.error('İstek hatası:', error);
        // başarısızsa sayfada kal bilgi ver
      }
    );
  }*/


}
