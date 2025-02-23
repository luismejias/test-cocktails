import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HandlerStorageService {
  private subjects: { [key: string]: BehaviorSubject<any[]> } = {};

  /**
   * Returns an Observable of the reactive state based on the `localStorage` key.
   * If the `BehaviorSubject` does not exist, it creates and initializes it with the `localStorage` data.
   */
  getData$(key: string): Observable<any[]> {
    if (!this.subjects[key]) {
      this.subjects[key] = new BehaviorSubject<any[]>(
        this.getDataFromStorage(key)
      );
    }
    return this.subjects[key].asObservable();
  }
  /**
   * Load data directly from `localStorage` without subscription.
   */
  getDataFromStorage(key: string): any[] {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  }

  /**
   * Saves the data in `localStorage` and updates the corresponding `BehaviorSubject`.
   */
  setDataInStorage(key: string, data: any[]) {
    localStorage.setItem(key, JSON.stringify(data));
    if (!this.subjects[key]) {
      this.subjects[key] = new BehaviorSubject<any[]>(data);
    } else {
      this.subjects[key].next(data);
    }
  }

   /**
   * Forces the reloading of the `BehaviorSubject` from `localStorage`.
   */
  refreshData(key: string) {
    const data = this.getDataFromStorage(key);
    if (!this.subjects[key]) {
      this.subjects[key] = new BehaviorSubject<any[]>(data);
    } else {
      this.subjects[key].next(data);
    }
  }
}
