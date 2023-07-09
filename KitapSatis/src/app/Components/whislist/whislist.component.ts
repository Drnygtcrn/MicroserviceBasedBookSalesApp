import { Component } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Whislist } from 'src/app/Class/Whislist';
import { Router } from '@angular/router';

@Component({
  selector: 'app-whislist',
  templateUrl: './whislist.component.html',
  styleUrls: ['./whislist.component.css']
})
export class WhislistComponent {

  public whislist: Whislist = {};

  _id?:string;
  kitab?:any = [{}];
  p:number =1;
  sayfadakiSayi:number =16;
  toplam: number = this.whislist.Products ? this.whislist.Products.length : 0;
  constructor(private http: HttpClient,private router: Router) { 
  }

  ngOnInit():void{
    const existingCustomerId = localStorage.getItem('existingCustomerId'); // Local Storage'dan veriyi al
    if (existingCustomerId) {
      this._id = existingCustomerId;
      const params = new HttpParams().set("CustomerId", this._id);
      console.log(this._id);
      this.http.get<{basketResult: Whislist }>('http://localhost:8000/whislist/get',{ params }).subscribe(data => {
      this.whislist = data.basketResult;
      this.kitab = this.whislist.Products;
      console.log(this.whislist);  
    });
    };
    
    
  }
  sepeteEkle(kitap: any) {
    this.kitab = kitap;
    if (this._id != null){  //yani kullanıcı oturum açmışsa
      const sepetItem = {
        CustomerId: this._id,
        Products: [this.kitab] // Eklenecek ürünü bir dizi içinde gönderiyoruz
      };
      console.log("ID",this._id);
      this.http.post('http://localhost:8000/basket/addItemWhislist', sepetItem).subscribe(data => {
      // İstek başarılı olduğunda burada işlemler yapabilirsiniz
      console.log(data);
    }, error => {
      // İstek başarısız olduğunda burada hata yönetimi yapabilirsiniz
      console.error(error);
    });
    }
    else{
      //notify ile bilgi ver logine routing
    }
  }

  
  listedenCikar(kitap: any) {
    this.kitab = kitap;
    if (this._id != null){  //yani kullanıcı oturum açmışsa
      const httpOptions = {
        body: {
          CustomerId: this._id,
          productId: kitap.proid
        }
      };
  
      this.http.delete<{whislistResult:Whislist}>('http://localhost:8000/whislist/deleteItem', httpOptions).subscribe(
        (response) => {
          this.whislist = response.whislistResult;
          this.kitab = this.whislist.Products;
        },
        (error) => {
          // İstek sırasında bir hata oluştu
          console.error(error);
        }
      );
    }
    else{
      //notify ile bilgi ver logine routing
    }
  }


  detay(kitap:any){
    this.kitab = kitap;
    if (this._id != null){  //yani kullanıcı oturum açmışsa
      localStorage.setItem('proId', kitap.proid); 
      this.router.navigate(['/Degerlendirme']).then(() => {
        window.location.reload();
      });
    }
    else{
      //notify ile bilgi ver logine routing
    }

  }
  


}
