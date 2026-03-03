import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class Phone {
  private _currentUser: any = JSON.parse(localStorage.getItem('user_session') || 'null');

  get currentUser() { return this._currentUser; }

  set currentUser(value: any) {
    this._currentUser = value;
    if (value) localStorage.setItem('user_session', JSON.stringify(value));
    else localStorage.removeItem('user_session');
  }

  
  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }
  

}


