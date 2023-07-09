import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { LoginComponent } from './Components/login/login.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { AnasayfaComponent } from './Components/anasayfa/anasayfa.component';

import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { ProfilComponent } from './Components/profil/profil.component';
import { GirisService } from './Service/giris.service';
import { SepetComponent } from './Components/sepet/sepet.component';
import { OrderComponent } from './Components/order/order.component';
import { WhislistComponent } from './Components/whislist/whislist.component';
import { DegerlendirmeComponent } from './Components/degerlendirme/degerlendirme.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignUpComponent,
    AnasayfaComponent,
    ProfilComponent,
    SepetComponent,
    OrderComponent,
    WhislistComponent,
    DegerlendirmeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [GirisService],
  bootstrap: [AppComponent]
})
export class AppModule { }
