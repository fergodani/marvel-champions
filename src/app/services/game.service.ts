import { Injectable } from '@angular/core';
import { CardJson } from "../models/card.json";
import { BehaviorSubject, Observable } from 'rxjs';
import { CardService } from './card.service';
import { Game } from '../models/game';
import { Hero } from '../models/cards/hero';
import { Villain } from '../models/cards/villain';
import { MainScheme } from '../models/cards/mainScheme';
import { PlayerCard } from '../models/cards/playerCard';
import { Ally } from '../models/cards/ally';
import { Upgrade } from '../models/cards/upgrade';
import { Support } from '../models/cards/support';
import { Event } from '../models/cards/event';
import { Resource } from '../models/cards/resource';
import { MatDialog } from '@angular/material/dialog';
import { PlayCardDialogComponent } from '../components/game/play-card-dialog/play-card-dialog.component';
import { SelectTargetDialogComponent } from '../components/game/select-target-dialog/select-target-dialog.component';
import { interval, take, lastValueFrom } from 'rxjs';
import { DamageTarget } from '../models/cards/interfaces/damageTarget';
import { Scheme } from '../models/cards/interfaces/schemes';
import { SelectSchemeDialogComponent } from '../components/game/select-scheme-dialog/select-scheme-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private game: BehaviorSubject<Game>;

  constructor(
    private cardService: CardService,
    private dialog: MatDialog
  ) {
    this.game = new BehaviorSubject(new Game());
  }

  getGameObservable() {
    return this.game.asObservable();
  }

  private getGame() {
    return this.game.value;
  }

  private updateGame(game: Game) {
    this.game.next(game);
  }

  initGame(hero: string, villain: string, modularEncounter: string) {
    const gameCards = this.cardService.getDeckByCardSetCode(hero);
    const villainCards = this.cardService.getVillainDeckByCardSetCode(villain, modularEncounter);



    const game = this.getGame();

    // New
    game.setHero(new Hero(gameCards.heroes[0], this));
    game.setVillain(new Villain(villainCards.villains));
    game.setMainScheme(new MainScheme(villainCards.mainSchemes));
    // Fin new

    //game.setHeroCards(gameCards.heroes);
    game.setNemesisDeck(gameCards.nemesis);
    gameCards.deck.forEach(card => {
      game.getPlayerDeck().push(this.createCard(card))
    })

    const encounterDeck: CardJson[] = [];
    encounterDeck.push(gameCards.obligation)
    villainCards.encounters.forEach(card => encounterDeck.push(card))
    game.setEncounterDeck(encounterDeck);
    const environments: CardJson[] = [];
    villainCards.environments.forEach(card => {
      environments.push(card)
    })
    game.setEnvironments(environments);
    const villains: CardJson[] = [];
    const mainSchemes: CardJson[] = [];
    villainCards.villains.forEach(card => villains.push(card));
    villainCards.mainSchemes.forEach(card => mainSchemes.push(card));
    game.setVillainCards(villains)
    //game.setMainSchemes(mainSchemes)

    this.shuffleHeroDeck()
    this.drawCard(game.getHero().getAlterEgoHandSize());
    console.log(this.getGame())
  }

  createCard(cardData: CardJson): PlayerCard {
    switch (cardData.type_code) {
      case 'ally':
        return new Ally(cardData, this);
      case 'event':
        return new Event(cardData);
      case 'upgrade':
        return new Upgrade(cardData);
      case 'support':
        return new Support(cardData);
      case 'resource':
        return new Resource(cardData);
      default:
        throw new Error(`Unknown card type: ${cardData.type_code}`);
    }
  }

  toggleHero() {
    const game = this.getGame();
    game.getHero().setIsAlterEgo(!game.getHero().getIsAlterEgo())
    this.updateGame(game);
  }

  shuffleHeroDeck() {
    const game = this.getGame();
    // Iteramos desde el final del array hacia el principio
    for (let i = game.getPlayerDeck().length - 1; i > 0; i--) {
      // Seleccionamos un índice aleatorio entre 0 y i
      const j = Math.floor(Math.random() * (i + 1));
      // Intercambiamos los elementos en los índices i y j
      [game.getPlayerDeck()[i], game.getPlayerDeck()[j]] = [game.getPlayerDeck()[j], game.getPlayerDeck()[i]];
    }
    this.updateGame(game);
  }

  drawCard(amount: number) {
    const game = this.getGame();
    for (let i = 0; i < amount; i++) {
      if (game.getPlayerDeck().length == 0)
        this.shuffleDiscardIntoDeck();
      else
        game.getPlayerHand().push(game.getPlayerDeck().shift()!);
    }
    this.updateGame(game);
  }

  playCard(cardPlayed: PlayerCard) {
    const game = this.getGame();
    game.setPlayerHand(game.getPlayerHand().filter(card => card !== cardPlayed))
    if (cardPlayed instanceof Upgrade) {
      cardPlayed.play();
      game.getHeroUpgrades().push(cardPlayed);
    } else if (cardPlayed instanceof Ally) {
      cardPlayed.play();
      game.getAllies().push(cardPlayed);
    } else if (cardPlayed instanceof Support) {
      cardPlayed.play();
      game.getHeroSupport().push(cardPlayed);
    } else if (cardPlayed instanceof Event) {
      cardPlayed.play();
    }

  }

  discardCards(cards: PlayerCard[]) {
    const game = this.getGame();
    cards.forEach(card => {
      game.getPlayerDiscardDeck().push(card);
    })
    game.setPlayerHand(game.getPlayerHand().filter(card => !Array.from(cards).some(card2 => card2 === card)))
    this.updateGame(game);
  }

  shuffleDiscardIntoDeck() { }

  heroAttack() {
    const game = this.getGame();
    game.getHero().executeAttack();
    this.updateGame(game);
  }

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
        this.discardCards(result);
        this.playCard(data.card);
      }
    });
  }

  async openDamageTargetDialog(): Promise<DamageTarget> {
    const game = this.getGame();
    const targets: DamageTarget[] = [];
    targets.push(game.getVillain())
    game.getMinions().forEach(minion => targets.push(minion))
    const dialogRef = this.dialog.open(SelectTargetDialogComponent, {
      data: targets,
      disableClose: true
    },
    );

    return await lastValueFrom(dialogRef.afterClosed());
  }

  async openSchemeTargetDialog(): Promise<Scheme> {
    const game = this.getGame();
    const targets: Scheme[] = [];
    targets.push(game.getMainScheme());
    game.getSideSchemes().forEach(scheme => targets.push(scheme))
    const dialogRef = this.dialog.open(SelectSchemeDialogComponent, {
      data: targets,
      disableClose: false
    })
    return await lastValueFrom(dialogRef.afterClosed());
  }

  preparePlayerCards() {
    const game = this.getGame();
    game.getHero().prepare();
    game.getAllies().forEach(ally => ally.prepare())
  }

}

export interface DialogData {
  card: PlayerCard,
  hand: PlayerCard[]
}
