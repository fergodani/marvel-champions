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
import { GameService } from '../../../services/game.service';

export interface DialogData {
  card: PlayerCard,
  hand: PlayerCard[]
}

@Component({
  selector: 'app-play-card-dialog',
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
  templateUrl: './play-card-dialog.component.html',
  styleUrl: './play-card-dialog.component.css'
})
export class PlayCardDialogComponent {
  isDiscardCards: boolean = false;
  selectedCards: Set<PlayerCard> = new Set<PlayerCard>();
  physical: number = 0;
  wild: number = 0;
  mental: number = 0;
  energy: number = 0;
  constructor(
    public dialogRef: MatDialogRef<PlayCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  goToDiscard() {
    if (this.data.card.getCost() == 0) {
      this.dialogRef.close();
      return;
    }
    this.isDiscardCards = true;
  }

  discardAndPlay() {
    this.dialogRef.close(this.selectedCards);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  toggleCardSelection(card: PlayerCard): void {
    if (this.selectedCards.has(card)) {
      this.selectedCards.delete(card);
      this.energy -= card.getEnergyResources();
      this.mental -= card.getMentalResources();
      this.wild -= card.getWildResources();
      this.physical -= card.getPhysicalResources();
    } else {
      this.selectedCards.add(card);
      this.energy += card.getEnergyResources();
      this.mental += card.getMentalResources();
      this.wild += card.getWildResources();
      this.physical += card.getPhysicalResources();
    }
  }

  isSelected(card: PlayerCard): boolean {
    return this.selectedCards.has(card);
  }

}
