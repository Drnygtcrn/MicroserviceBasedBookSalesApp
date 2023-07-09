import { Component } from '@angular/core';
import { GirisService } from 'src/app/Service/giris.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  activeLink: string = '';
  giris: boolean = false;
  _id?:string;
  constructor(private girisService: GirisService) { 
    const localStorageGirisDurumu = localStorage.getItem('girisDurumu');
    if (localStorageGirisDurumu !== null) {
      this.giris = localStorageGirisDurumu === 'true';
    }
    const localStorageId = localStorage.getItem('existingCustomerId');
    if (localStorageId!== null) {
      this._id = localStorageId;
    } 
   }
    
  ngOnInit() {
    
  }

  ngAfterViewInit() {
    
  }

  setActiveLink(link: string) {
    this.activeLink = link;
  }

  degistir() {
    this.girisService.degistir(!this.giris);
  }

  sakk(){
    localStorage.setItem('existingCustomerId', "null"); 
    localStorage.setItem('girisDurumu',"false");
    this.degistir();
  }

}
