import { HttpClient,HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Degerlendirme } from 'src/app/Class/Degerlendirme';
import { product } from 'src/app/Class/kitap';

@Component({
  selector: 'app-degerlendirme',
  templateUrl: './degerlendirme.component.html',
  styleUrls: ['./degerlendirme.component.css']
})
export class DegerlendirmeComponent {

  kitab?:any = {};
  bookId?:string;
  _id?:string;
  yorumlar:Degerlendirme[] = [{ }];
  constructor(private http: HttpClient) { 
  }

  ngOnInit():void{
    const existingCustomerId = localStorage.getItem('existingCustomerId'); // Local Storage'dan veriyi al
    if (existingCustomerId) {
      this._id = existingCustomerId;
    };
    const existingBookId = localStorage.getItem('proId');
    if (existingBookId){
      this.bookId = existingBookId;
      const params = new HttpParams().set("_id", this.bookId);
      this.http.get<any>('http://localhost:8000/product/get',{params}).subscribe(data => {
        this.kitab = data;
        console.log(this.kitab);
    }
    );
    this.degerlendirme(); 
    } 
  }

  degerlendirme(){
    if(this.bookId){
      const params = {
        ProductID : this.bookId
      };
      this.http.get<Degerlendirme[]>('http://localhost:8000/degerlendirme/getByProduct', { params }).subscribe(data => {
        this.yorumlar = data;
    });
    }
  }
  comment?:string;
  ekle() {
    if (this.bookId && this.comment) {
      this.kitab.proid = this.kitab._id;
      const params = new HttpParams()
        .set('User', JSON.stringify({
          UserId: this._id,
          Username: 'Deniz'
        }))
        .set('Book', JSON.stringify(this.kitab))
        .set('rating',3)
        .set('comment', this.comment);
  
      this.http.post<Degerlendirme[]>('http://localhost:8000/degerlendirme/create', null, { params }).subscribe(data => {
        this.yorumlar = data;
        this.degerlendirme();
        this.comment="";
      });
    }
  }
  


}
