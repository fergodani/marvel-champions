import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, NgStyle, NgIf } from '@angular/common';
import { CardJson } from '../../models/card.json';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-select-game',
  standalone: true,
  imports: [NgFor, NgStyle, NgIf],
  templateUrl: './select-game.component.html',
  styleUrl: './select-game.component.css'
})
export class SelectGameComponent implements OnInit {

  ngOnInit(): void {
  }
  heroes: CardJson[] = [];
  villains: CardJson[][] = [];
  modularEncounters: CardJson[][] = [];
  isHeroes: boolean = true;
  isVillains: boolean = false;
  isEncounters: boolean = false;
  heroSelected: string = "";
  villainSelected: string = "";
  encounterSelected: string = "";

  constructor(
    private cardService: CardService,
    private router: Router
  ) {
    this.heroes = this.cardService.getHeroes();
    this.villains = this.cardService.getVillains();
    this.modularEncounters = this.cardService.getModularEncounters();
  }

  selectHero(card: CardJson) {
    this.heroSelected = card.card_set_code!;
    this.isHeroes = false;
    this.isVillains = true;
  }

  selectVillain(card: CardJson) {
    this.villainSelected = card.card_set_code!;
    this.isVillains = false;
    this.isEncounters = true;
  }

  selectModularEncounter(card: CardJson) {
    this.encounterSelected = card.card_set_code!;
    const params = {
      heroSelected: this.heroSelected,
      villainSelected: this.villainSelected,
      encounterSelected: this.encounterSelected
    };
    this.router.navigate(['/game'], { queryParams: params });
  }

}
