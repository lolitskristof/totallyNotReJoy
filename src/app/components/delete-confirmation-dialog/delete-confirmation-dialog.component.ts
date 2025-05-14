import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'delete-confirmation-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Törlés megerősítése</h2>
    <mat-dialog-content>
      Biztosan törölni szeretnéd ezt a terméket?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">Mégse</button>
      <button mat-button color="warn" [mat-dialog-close]="true">Törlés</button>
    </mat-dialog-actions>
  `,
})
export class DeleteConfirmationDialog {}
