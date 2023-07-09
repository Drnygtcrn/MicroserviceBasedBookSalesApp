import { HttpClient,HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GirisService } from 'src/app/Service/giris.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})


export class SignUpComponent {

  customer = {
    name: '',
    email: '',
    password: '',
    phone: '',
    age:''
  }
  customer_id?:string;

  constructor(private http: HttpClient,private router: Router,private girisService: GirisService) {}
  

  onSubmit(){
    const url = 'http://localhost:8000/customer/signup';
    console.log(this.customer.email.length);
    console.log(this.customer.password.length);
    if(this.customer.email.length > 7 && this.customer.password.length > 3){
      this.http.post<{id:string}>(url, this.customer).subscribe(
        (response) => {
          console.log('İstek başarılı:', response);
          this.customer_id = response.id;
          localStorage.setItem('existingCustomerId', this.customer_id);
          localStorage.setItem('girisDurumu', 'true');
          console.log(this.customer_id);
          if(this.customer_id != null){
            this.sepetOlustur(this.customer_id);
            this.listeOlustur(this.customer_id);
            this.router.navigate(['/']).then(() => {
              window.location.reload();
            });
          }
          else{
            //notify
            localStorage.setItem('existingCustomerId', "null"); 
            localStorage.setItem('girisDurumu',"false");
          }
        },
        (error) => {
          console.error('İstek hatası:', error);
          // başarısızsa sayfada kal bilgi ver
        }
      );
      
    }
    else{
      //notify server
    }
  }

  sepetOlustur(customerId:string){
    console.log("aa",customerId);
    
    const params = new HttpParams().append('CustomerId', customerId); // append metodu kullanılıyor
    this.http.post<{id:string}>('http://localhost:8000/basket/create',null, { params }).subscribe(
        (response) => {
            console.log("Sepet oluşturuldu");


        },
        (error) => {
          console.error('İstek hatası:', error);
          // başarısızsa sayfada kal bilgi ver
        });

  }
  listeOlustur(customerId:string){
    console.log("aa",customerId);
    
    const params = new HttpParams().append('CustomerId', customerId); // append metodu kullanılıyor
    this.http.post<{id:string}>('http://localhost:8000/whislist/create',null, { params }).subscribe(
        (response) => {
            console.log("Sepet oluşturuldu");


        },
        (error) => {
          console.error('İstek hatası:', error);
          // başarısızsa sayfada kal bilgi ver
        });

  }


}
