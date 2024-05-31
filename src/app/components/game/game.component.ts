import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { coreCards } from '../../../assets/coreCards';
import { smCards } from '../../../assets/smCards';
import { drsCards } from '../../../assets/drsCards';
import { spdrCards } from '../../../assets/spdrCards';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CardService } from '../../services/card.service';
import { Game } from '../../models/game';
import { Card } from '../../models/card';
import { CardJson } from '../../models/card.json';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [NgFor, MatButtonModule, MatMenuModule, NgIf],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {
  private pressTimer: any;
  private zoomOverlay: HTMLElement | null = null;
  private zoomedCard: HTMLElement | null = null;
  game: Game = new Game();

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const heroSelected = params['heroSelected'];
      const villainSelected = params['villainSelected'];
      const encounterSelected = params['encounterSelected'];
      const gameCards = this.cardService.getDeckByCardSetCode(heroSelected)
      this.game.heroCards = gameCards.heroes;
      this.game.nemesisDeck = gameCards.nemesis;
      this.game.playerDeck = gameCards.deck;
      console.log(villainSelected)
      const villainCards = this.cardService.getVillainDeckByCardSetCode(villainSelected, encounterSelected);
      const encounterDeck: Card[] = []
      villainCards.encounters.forEach(card => encounterDeck.push(card))
      encounterDeck.push(gameCards.obligation)
      villainCards.environments.forEach(card => {
        this.game.environments.push(card)
      })
      encounterDeck.forEach(card => this.game.encounterDeck.push(card))
      villainCards.villains.forEach(card => this.game.villainCards.push(card))
      villainCards.mainSchemes.forEach(card => this.game.mainSchemes.push(card))
      console.log(this.game)
      this.initializeGame();
      
    });
  }

  constructor(
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router,
    private cardService: CardService,
  ) { }

  coreCards = coreCards;
  smCards = smCards;
  drsCards = drsCards;
  spdrCards = spdrCards;

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

  rotate: boolean = false; // Estado inicial de la rotación

  toggleRotation() {
    this.rotate = !this.rotate; // Alterna el estado de rotación
  }

  initializeGame() {
    this.shuffleDeck(this.game.playerDeck);
    this.game.playerHand.push(this.game.playerDeck.shift()!)
    this.game.playerHand.push(this.game.playerDeck.shift()!)
    this.game.playerHand.push(this.game.playerDeck.shift()!)
    this.game.playerHand.push(this.game.playerDeck.shift()!)
  }

  shuffleDeck(deck: CardJson[]) {
    // Iteramos desde el final del array hacia el principio
    for (let i = deck.length - 1; i > 0; i--) {
        // Seleccionamos un índice aleatorio entre 0 y i
        const j = Math.floor(Math.random() * (i + 1));
        // Intercambiamos los elementos en los índices i y j
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

}
