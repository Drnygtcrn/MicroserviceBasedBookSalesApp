import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { AnasayfaComponent } from './Components/anasayfa/anasayfa.component';
import { ProfilComponent } from './Components/profil/profil.component';
import { SepetComponent } from './Components/sepet/sepet.component';
import { OrderComponent } from './Components/order/order.component';
import { WhislistComponent } from './Components/whislist/whislist.component';
import { DegerlendirmeComponent } from './Components/degerlendirme/degerlendirme.component';

const routes: Routes = [
  {path:"LogIn",component:LoginComponent},
  {path:"SignUp",component:SignUpComponent},
  {path:'',pathMatch:'full',component:AnasayfaComponent},
  {path:"Profil",component:ProfilComponent},
  {path:"Sepet",component:SepetComponent},
  {path:"Order",component:OrderComponent},
  {path:"Favoriler",component:WhislistComponent},
  {path:"Degerlendirme",component:DegerlendirmeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
