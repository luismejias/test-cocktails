import { TestBed } from '@angular/core/testing';
import { HandlerStorageService } from './handler-storage.service';


describe('HandlerStorageService', () => {
  let service: HandlerStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandlerStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
