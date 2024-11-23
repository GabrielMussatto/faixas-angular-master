import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItem(key: string): any{
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null; //se exite o item, retorna o parse, se nao retorna nulo
  }

  setItem(key: string, value: any): void{
    localStorage.setItem(key, JSON.stringify(value)); //mandando em formato json
  }

  removeItem(key: string): void{
    localStorage.removeItem(key);
  }

}
