import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GirisService {

  private dataSource = new BehaviorSubject<boolean>(false);
  public data = this.dataSource.asObservable();

  private id = new BehaviorSubject<string>("asdsad");
  public IdData = this.id.asObservable();

  constructor() { }
  
  degistir(message: boolean) {
    this.dataSource.next(message);
  }
  

  dondur():Observable<boolean>{
    return this.data;
  }
  

}
