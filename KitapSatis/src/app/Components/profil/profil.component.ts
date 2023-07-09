import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { profil } from 'src/app/Class/Profil';
import { Address } from 'src/app/Class/Customer';
import { Order } from 'src/app/Class/Order';
import { Degerlendirme } from 'src/app/Class/Degerlendirme';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {

  activeItem: string = '';
  
  adresler:Address[] = [
    {},
  ];
  seciliAdres:Address = {};
  _id = " ";
  profil:profil = {};
  sipariss:Order[] = [{}];
  yorumlar:Degerlendirme[] = [{ }];

  constructor(private http: HttpClient,private router: Router) { 
  }

  ngOnInit():void{
    const existingCustomerId = localStorage.getItem('existingCustomerId'); // Local Storage'dan veriyi al
    if (existingCustomerId) {
      this._id = existingCustomerId;
    };

  }

  Guncellenen:profil = this.profil;
  Guncelle(){
    const params = {
      id : this._id,
      name:this.Guncellenen.name,
      email:this.Guncellenen.email,
      phone:this.Guncellenen.phone,
      age:this.Guncellenen.age
    };
    console.log(params);
    this.http.post<any>('http://localhost:8000/customer/editProfile',  params ).subscribe(data => {      
      console.log(this.profil);
      console.log(this._id);
  });
    

  }
  Iptal(){
    this.router.navigate(['/Profil']).then(() => {
      window.location.reload();
    });
  }
  
  address:Address = {}
  AddressEkle(){
    const params = {
      _id : this._id,
      street:this.address.street,
      postalCode:this.address.postalCode,
      city:this.address.city,
      country:this.address.country
    };

    console.log(params);
    
   
    this.http.post<any>('http://localhost:8000/customer/addAddress',  params ).subscribe(data => {      
      console.log(this.profil);
  });
    
  }
  AddressSil(adres: Address){
    const httpOptions = {
      body: {
        CustomerId: this._id,
        addressId: adres._id
      }
    };

   
    this.http.delete<any>('http://localhost:8000/customer/deleteAddress',  httpOptions ).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        // İstek sırasında bir hata oluştu
        console.error(error);
      
  });
    
  }
   






  setActiveItem(item: string) {
    this.activeItem = item;
    if(item=='Adreslerim'){
      this.adres();
    }
    if(item=='BilgileriniGuncelle'){
      this.profill();
    }
    if(item=='Sipariş'){
      this.siparis();
    }
    if(item=='Değerlendirmelerim'){
      this.degerlendirme();
    }

  }


  degerlendirme(){
    if(this._id){
      const params = {
        CustomerID : this._id
      };
      this.http.get<Degerlendirme[]>('http://localhost:8000/degerlendirme/getByCustomer', { params }).subscribe(data => {
        this.yorumlar = data;
    });
    }
  }



  siparis(){
    const params = {
      customerId : this._id
    };
    this.http.get<{Siparis:Order[]}>('http://localhost:8000/order/getOrder', { params }).subscribe(data => {
    this.sipariss = data.Siparis;
    console.log(this.sipariss[0].Books);
  });
  }




  profill(){
    const params = {
      id : this._id
    };
    this.http.get<any>('http://localhost:8000/customer/profile', { params }).subscribe(data => {
    this.profil.name = data.name;
    this.profil.email = data.email;
    this.profil.age = data.age;
    this.profil.phone = data.phone;
    console.log(this.profil);
  });
  }


  adres(){
    const params = {
      _id : this._id
    };
    console.log(params);
    this.http.get<{addressResult:Address[]}>('http://localhost:8000/customer/Address',  {params} ).subscribe(data => {      
      this.adresler = data.addressResult;
  });
  }


  getAdresBilgileri(adres: any) {
    this.seciliAdres = adres;
  }
  

  CommentSil(yorum:any){
    const params = {
      commentId:yorum._id
    }
    this.http.delete<{addressResult:Address[]}>('http://localhost:8000/degerlendirme/delete',  {params} ).subscribe(data => {      
      this.adresler = data.addressResult;
      this.degerlendirme();
  });

  }
  GuncelleComment(){
    
  }

  ActiveAddress(adres: Address){
   

    this.seciliAdres = adres;


  }


}
