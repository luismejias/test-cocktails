import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogDetailComponent } from './dialog-detail.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('DialogDetailComponent', () => {
  let component: DialogDetailComponent;
  let fixture: ComponentFixture<DialogDetailComponent>;
  let dialogRefMock: Partial<MatDialogRef<DialogDetailComponent>>;
  let dataMock: any;

  beforeEach(async () => {
    dialogRefMock = {
      close: jest.fn(),
    };
    dataMock = { name: 'Cocktail Name', id: 1 };

    await TestBed.configureTestingModule({
      imports: [DialogDetailComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dataMock },
        { provide: MatDialogRef, useValue: dialogRefMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the dialog detail component', () => {
    expect(component).toBeTruthy();
  });

  it('should inject the dialog data correctly', () => {
    expect(component.data).toEqual(dataMock);
  });

  it('should call dialogRef.close when close is invoked', () => {
    component.dialogRef.close();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });
});
