import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor, NgIf, AsyncPipe, NgStyle } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Game } from '../../models/game';
import { CardJson } from '../../models/card.json';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { GameService } from '../../services/game.service';
import { Observable } from 'rxjs';
import { PlayCardDialogComponent } from './play-card-dialog/play-card-dialog.component';
import { PlayerCard } from '../../models/cards/playerCard';
import { DialogService } from '../../services/dialog.service';
import { Ally } from '../../models/cards/ally';
import { Hero } from '../../models/cards/hero';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [NgFor, MatButtonModule, MatMenuModule, NgIf, AsyncPipe, NgStyle],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {
  private pressTimer: any;
  private zoomOverlay: HTMLElement | null = null;
  private zoomedCard: HTMLElement | null = null;
  game$: Observable<Game>;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const heroSelected = params['heroSelected'];
      const villainSelected = params['villainSelected'];
      const encounterSelected = params['encounterSelected'];
      this.gameService.initGame(heroSelected, villainSelected, encounterSelected);
    });
  }

  constructor(
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
    public dialog: MatDialog,
    private dialogService: DialogService
  ) {
    this.game$ = this.gameService.getGameObservable();
  }

  startZoom(event: Event) {
    //event.preventDefault();
    const target = event.target as HTMLElement;
    const card = target.closest('.card') as HTMLElement;
    card.addEventListener("touchend", () => {
      this.removeZoom.bind(this)
    }
    );
    this.pressTimer = setTimeout(() => {
      this.zoomOverlay = this.renderer.createElement('div');
      this.renderer.addClass(this.zoomOverlay, 'zoom-overlay');
      this.zoomedCard = card.cloneNode(true) as HTMLElement;
      const isScheme = card.classList.contains('scheme')
      if (isScheme) {
        this.renderer.addClass(this.zoomedCard, 'zoomed-scheme');
      } else {
        this.renderer.addClass(this.zoomedCard, 'zoomed-card');
      }

      this.renderer.appendChild(this.zoomOverlay, this.zoomedCard);
      this.renderer.appendChild(document.body, this.zoomOverlay);

      // Agregar eventos a la superposición para cerrarla
      this.renderer.listen(this.zoomOverlay, 'mouseup', this.removeZoom.bind(this));
      this.renderer.listen(this.zoomOverlay, 'touchend', this.removeZoom.bind(this));
      this.renderer.listen(this.zoomOverlay, 'touchstart', this.preventDefault.bind(this));
      this.renderer.listen(this.zoomOverlay, 'contextmenu', this.preventDefault.bind(this));

    }, 200);
  }


  stopZoom(event: Event) {
    clearTimeout(this.pressTimer);
    this.removeZoom(event)
  }

  removeZoom(event: Event) {
    if (this.zoomOverlay) {
      this.renderer.removeChild(document.body, this.zoomOverlay);
      this.zoomOverlay = null;
      this.zoomedCard = null;
    }
  }

  removeZoomCard(card: HTMLElement) {
    card.classList.remove("card-zoomed")
  }

  preventDefault(e: Event) {
    e.preventDefault();
    e.stopPropagation();
  }

  toggleHero() {
    this.gameService.toggleHero();
  }

  openDialog(cardToPlay: PlayerCard, hand: PlayerCard[]): void {
    this.gameService.openPlayCardDialog({
      card: cardToPlay,
      hand
    }
    );
  }

  heroAttack(hero: Hero) {
    hero.executeAttack();
  }

  heroThwart(hero: Hero) {
    hero.executeThwart();
  }

  allyAttack(card: Ally) {
    card.executeAttack();
  }

  allyThwart(card: Ally) {
    card.executeThwart();
  }

  endTurn() {
    this.gameService.endTurn();
  }

}
