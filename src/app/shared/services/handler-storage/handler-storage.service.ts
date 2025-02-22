import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HandlerStorageService { 
  getDataFromStorage(key: string): any {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  }

   setDataInStorage(data: any, key: string): void {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
