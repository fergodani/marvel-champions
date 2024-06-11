import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PlayerCard } from '../../../models/cards/playerCard';
import { CardJson } from '../../../models/card.json';
import { DamageTarget } from '../../../models/cards/interfaces/damageTarget';
import { Scheme } from '../../../models/cards/interfaces/schemes';

@Component({
  selector: 'app-select-scheme-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    NgFor, NgIf
  ],
  templateUrl: './select-scheme-dialog.component.html',
  styleUrl: './select-scheme-dialog.component.css'
})
export class SelectSchemeDialogComponent {
  selectedCard: Scheme | null = null;
  constructor(
    public dialogRef: MatDialogRef<SelectSchemeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public targets: Scheme[],
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectTarget(card: Scheme): void {
    if (this.selectedCard === card)
      this.selectedCard = null;
    else
      this.selectedCard = card;
  }

  isSelected(card: Scheme): boolean {
    return card === this.selectedCard;
  }

  attack(): void {
    this.dialogRef.close(this.selectedCard);
  }
}
