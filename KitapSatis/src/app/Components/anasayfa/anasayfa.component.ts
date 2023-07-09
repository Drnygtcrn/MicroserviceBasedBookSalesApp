import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { product } from 'src/app/Class/kitap';
import { GirisService } from 'src/app/Service/giris.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anasayfa',
  templateUrl: './anasayfa.component.html',
  styleUrls: ['./anasayfa.component.css']
})
export class AnasayfaComponent {

  KitapListesi: product[] = [];
  data?:boolean;
  _id?:string;

  yazarAramaKelimesi: string = '';
  yazarListesi: any[] = [];

  yayinEviAramaKelimesi: string = '';
  yayinEviListesi: any[] = [];

  TurAramaKelimesi: string = '';
  turListesi: any[] = []; 

  activeItem: string = 'Tümü';
  
  constructor(private http: HttpClient,private girisService: GirisService,private router: Router) { 
  }
  kitab?:any = {};
  /*
    this.girisService.dondur().subscribe((value) => {
      this.data = value;
    });
    this.girisService.dondurId().subscribe((value) => {
      this._id = value;
    });
  */
 
  ngOnInit():void{
    this.http.get<{products: product[]}>('http://localhost:8000/product/all').subscribe(data => {
        this.KitapListesi = data.products;
    }
    )
    const existingCustomerId = localStorage.getItem('existingCustomerId'); // Local Storage'dan veriyi al
    if (existingCustomerId) {
      this._id = existingCustomerId;
    }; 
    
  }

  sepeteEkle(kitap: any) {
    this.kitab = kitap;
    if (this._id != null){  //yani kullanıcı oturum açmışsa
      const sepetItem = {
        CustomerId: this._id,
        Products: [this.kitab] // Eklenecek ürünü bir dizi içinde gönderiyoruz
      };
      console.log(this.kitab);
      console.log("ID",this._id);
      this.http.post('http://localhost:8000/basket/addItem', sepetItem).subscribe(data => {
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
  listeyeEkle(kitap: any) {
    this.kitab = kitap;
    if (this._id != null){  //yani kullanıcı oturum açmışsa
      const requestBody = {
        CustomerId: this._id,
        Products: [this.kitab]
      };
    
      this.http.post('http://localhost:8000/whislist/addItem', requestBody).subscribe(
        data => {
          console.log("Oley");
        },
        error => {
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
      localStorage.setItem('proId', kitap._id); 
      this.router.navigate(['/Degerlendirme']).then(() => {
        window.location.reload();
      });
    }
    else{
      //notify ile bilgi ver logine routing
    }

  }

  setActiveItem(item: string) {
    this.activeItem = item;
    
    if(item=='Yazar'){
      this.getYazarListesi(); 
      //this.profill();
    }
    if(item=='YayinEvi'){
      this.getYayinEviListesi();
      //this.siparis();
    }
    if(item=='Tur'){
      this.getTurListesi();
      //this.degerlendirme();
    }

  }
  p:number =1;
  sayfadakiSayi:number =16;
  toplam:number = this.KitapListesi.length;

  public filtre!:string ;

  searchCategory: string = '';

  openSearch(category: string) {
    this.searchCategory = category;
  }

   araYazar(author: any) {
   
     this.yazarAramaKelimesi = author;
   }
   araYayinEvi(yayinevi: any) {
 
     this.yayinEviAramaKelimesi = yayinevi;
   }
   araTur(tur: any) {
    
     this.TurAramaKelimesi = tur; 
   }
  // yazarSayac(author: any){
  //   if(!this.yazarListesi.includes(author)){
  //     this.yazarListesi.push(author);
  //   }
    
  // }
  // YazariSil(){
  //   this.yazarListesi = [];
  // }
  getYazarListesi() {
    const yazarlistesi: product[] = [];
  
    this.KitapListesi.forEach((kitap) => {
      const yazarIndex = yazarlistesi.findIndex((yazar) => yazar.author === kitap.author);
      if (yazarIndex === -1) {
        yazarlistesi.push({ author: kitap.author, sayac: 1 });
      } else {
        const yazar = yazarlistesi[yazarIndex];
      if (yazar && yazar.sayac) {
        yazar.sayac++;
      } else {
        yazarlistesi[yazarIndex].sayac = 1;
      }
    }
    });
  
    this.yazarListesi = yazarlistesi;
    console.log(this.yazarListesi.length);
  }

  getYayinEviListesi() {
    const yayinevilistesi: product[] = [];
  
    this.KitapListesi.forEach((kitap) => {
      const yayinEviIndex = yayinevilistesi.findIndex((yayinevi) => yayinevi.publisher === kitap.publisher);
      if (yayinEviIndex === -1) {
        yayinevilistesi.push({ publisher: kitap.publisher, sayac: 1 });
      } else {
        const yayinevi = yayinevilistesi[yayinEviIndex];
      if (yayinevi && yayinevi.sayac) {
        yayinevi.sayac++;
      } else {
        yayinevilistesi[yayinEviIndex].sayac = 1;
      }
    }
    });
  
    this.yayinEviListesi = yayinevilistesi;
    console.log(this.yayinEviListesi.length);
  }
  getTurListesi() {
    const turlistesi: product[] = [];
  
    this.KitapListesi.forEach((kitap) => {
      const turIndex = turlistesi.findIndex((yazar) => yazar.type === kitap.type);
      if (turIndex === -1) {
        turlistesi.push({ type: kitap.type, sayac: 1 });
      } else {
        const tur = turlistesi[turIndex];
      if (tur && tur.sayac) {
        tur.sayac++;
      } else {
        turlistesi[turIndex].sayac = 1;
      }
    }
    });
  
    this.turListesi = turlistesi;
    console.log(this.turListesi.length);
  }
  closeAllMenus(){
    this.activeItem = '';
  }
  

}
