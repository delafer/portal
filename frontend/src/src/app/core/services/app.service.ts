import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }


  public getTiles() {
    return ['Akte', 'Limit'];
  }
}
