import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-detail',
  standalone: true,
  imports: [],
  templateUrl: './dialog-detail.component.html',
  styleUrl: './dialog-detail.component.scss'
})
export class DialogDetailComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<DialogDetailComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  ngOnInit(): void {
    console.log('DATA DIALOG => ', this.data);

  }

  
}
