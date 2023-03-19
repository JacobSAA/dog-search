import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-match-dialog',
  templateUrl: './match-dialog.component.html',
  styleUrls: ['./match-dialog.component.scss']
})
export class MatchDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MatchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick() {
    this.dialogRef.close();
  }

  // TODO add functionality
  match() {
    this.dialogRef.close();
  }
}
