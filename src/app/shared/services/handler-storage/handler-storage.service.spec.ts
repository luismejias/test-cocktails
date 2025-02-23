import { TestBed } from '@angular/core/testing';
import { HandlerStorageService } from './handler-storage.service';
import { BehaviorSubject, Observable, take } from 'rxjs';

describe('HandlerStorageService', () => {
  let service: HandlerStorageService;
  const storageKey = 'testKey';
  const mockData = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandlerStorageService);
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('getData$', () => {
    it('should return an observable with the data from localStorage', (done) => {
      localStorage.setItem(storageKey, JSON.stringify(mockData));
      service.getData$(storageKey).subscribe((data) => {
        expect(data).toEqual(mockData);
        done();
      });
    });

    it('should initialize a new Observable if not exists', () => {
      const result$ = service.getData$(storageKey);
      expect(result$).toBeInstanceOf(Observable);
    });

    it('should reuse existing BehaviorSubject', () => {
      const firstSubject = service.getData$(storageKey);
      const secondSubject = service.getData$(storageKey);
      expect(firstSubject).toEqual(secondSubject);
    });
  });

  describe('getDataFromStorage', () => {
    it('should return parsed data from localStorage', () => {
      localStorage.setItem(storageKey, JSON.stringify(mockData));
      const data = service.getDataFromStorage(storageKey);
      expect(data).toEqual(mockData);
    });

    it('should return an empty array if no data found', () => {
      const data = service.getDataFromStorage('nonExistentKey');
      expect(data).toEqual([]);
    });
  });

  describe('setDataInStorage', () => {
    it('should save data in localStorage', () => {
      service.setDataInStorage(storageKey, mockData);
      const storedData = JSON.parse(localStorage.getItem(storageKey) || '[]');
      expect(storedData).toEqual(mockData);
    });

    it('should update the BehaviorSubject if it exists', (done) => {
      service.getData$(storageKey).subscribe((data) => {
        expect(data).toEqual(mockData);
        done();
      });
      service.setDataInStorage(storageKey, mockData);
    });

    it('should create a new BehaviorSubject if not exists', () => {
      service.setDataInStorage(storageKey, mockData);
      expect(service['subjects'][storageKey]).toBeInstanceOf(BehaviorSubject);
    });
  });

  describe('refreshData', () => {
    it('should update the BehaviorSubject with fresh data from localStorage', (done) => {
      const updatedData = [{ id: 3, name: 'Updated Item' }];
      localStorage.setItem(storageKey, JSON.stringify(updatedData));

      service.getData$(storageKey).pipe(take(1)).subscribe((data) => {
        expect(data).toEqual(updatedData);
        done();
      });

      service.refreshData(storageKey);
    });

    it('should create a new BehaviorSubject if not exists', () => {
      service.refreshData(storageKey);
      expect(service['subjects'][storageKey]).toBeInstanceOf(BehaviorSubject);
    });
  });
});
