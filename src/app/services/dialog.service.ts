import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlayCardDialogComponent } from '../components/game/play-card-dialog/play-card-dialog.component';
import { GameService } from './game.service';
import { PlayerCard } from '../models/cards/playerCard';
import { SelectTargetDialogComponent } from '../components/game/select-target-dialog/select-target-dialog.component';

export interface DialogData {
  card: PlayerCard,
  hand: PlayerCard[]
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private gameService: GameService,
    private dialog: MatDialog) {}

  openPlayCardDialog(data: DialogData): void {
    data.hand = data.hand.filter(card => data.card != card)
    const dialogRef = this.dialog.open(PlayCardDialogComponent, {
      data: {
        card: data.card,
        hand: data.hand
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.gameService.discardCards(result);
        this.gameService.playCard(data.card);
      }
    });
  }

  openDamageTargetDialog(amount: number): void {
    const dialogRef = this.dialog.open(SelectTargetDialogComponent, {
     
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
  }
}
