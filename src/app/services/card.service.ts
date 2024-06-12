import { Injectable } from '@angular/core';
import { coreCards } from '../data/coreCards'
import { smCards } from '../data/smCards';
import { drsCards } from '../data/drsCards';
import { spdrCards } from '../data/spdrCards';
import {  spiderManStarterDeck,
          captainMarvelStarterDeck,
          blackPantherStarterDeck,
          spdrStarterDeck,
          sheHulkStarterDeck,
          ironManStarterDeck,
          drsStarterDeck,
          milesMoralesStarterDeck,
          ghostSpiderStarterDeck,
        } from '../data/decks';
import { CardJson } from '../models/card.json';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor() { }

  getHeroes(): CardJson[] {
    const heroes: CardJson[] = [];
    coreCards.forEach(item => {
      if (item.type_code == "hero") heroes.push(item)
    })
    smCards.forEach(item => {
      if (item.type_code == "hero") heroes.push(item)
    })
    drsCards.forEach(item => {
      if (item.type_code == "hero") heroes.push(item)
    })
    spdrCards.forEach(item => {
      if (item.type_code == "hero") heroes.push(item)
    })
    return heroes;
  }

  getVillains(): CardJson[][] {
    /*
    const villains: Card[] = [];
    coreCards.forEach(item => {
      if (item.type_code == "villain" && item.stage == 1) villains.push(item)
    })
    smCards.forEach(item => {
      if (item.type_code == "villain" && item.stage == 1) villains.push(item)
    })
    return villains;
*/
    const groups: { [key: string]: CardJson[] } = {};
    const coreCardModularEncounters = coreCards.filter(card => card.card_set_type_name_code == "villain" && card.stage == 1 && card.type_code == "villain")
    const smCardsdModularEncounters = smCards.filter(card => card.card_set_type_name_code == "villain" && card.stage == 1 && card.type_code == "villain")

    coreCardModularEncounters.forEach(card => {
      const key = card.card_set_code || 'undefined';
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(card);
    });

    smCardsdModularEncounters.forEach(card => {
      const key = card.card_set_code || 'undefined';
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(card);
    });


    return Object.values(groups);
    /* Esto para obtener las cartas de cada villano agrupadas
    const groups: { [key: string]: Card[] } = {};
    const coreCardModularEncounters = coreCards.filter(card => card.card_set_type_name_code == "villain")
    const smCardsdModularEncounters = smCards.filter(card => card.card_set_type_name_code == "villain")

    coreCardModularEncounters.forEach(card => {
      const key = card.card_set_code || 'undefined';
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(card);
    });

    smCardsdModularEncounters.forEach(card => {
      const key = card.card_set_code || 'undefined';
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(card);
    });
    

    return Object.values(groups);
    */
  }

  getModularEncounters(): CardJson[][] {
    const groups: { [key: string]: CardJson[] } = {};
    const coreCardModularEncounters = coreCards.filter(card => card.card_set_type_name_code == "modular")
    const smCardsdModularEncounters = smCards.filter(card => card.card_set_type_name_code == "modular")
    const spdrCardsdModularEncounters = spdrCards.filter(card => card.card_set_type_name_code == "modular")

    coreCardModularEncounters.forEach(card => {
      const key = card.card_set_code || 'undefined';
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(card);
    });

    smCardsdModularEncounters.forEach(card => {
      const key = card.card_set_code || 'undefined';
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(card);
    });

    spdrCardsdModularEncounters.forEach(card => {
      const key = card.card_set_code || 'undefined';
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(card);
    });

    return Object.values(groups);
  }

  getDeckByCardSetCode(setCode: string): GameCards {
    const deck: CardJson[] = [];
    const heroes: CardJson[] = [];
    const nemesis: CardJson[] = [];
    let obligation: CardJson = {};
    switch (setCode) {
      case "spider_man": {
        coreCards.forEach(card => {
          if (card.card_set_code == "spider_man" && card.type_code == "hero") {
            heroes.push(card)
          }
          if (card.card_set_code == "spider_man_nemesis") {
            for (let i = 0; i < card.quantity!; i++) {
              nemesis.push(card)
            }
          }
          if (card.card_set_code == "spider_man" && card.type_code == "obligation") {
            obligation = card;
          }
        })
        Object.entries(spiderManStarterDeck).forEach(([key, value]) => {
          coreCards.forEach(card => {
            if (card.code == key) {
              for (let i = 0; i < value; i++) {
                deck.push(card)
              }
            }
          })
        });
        break;
      }
      case "captain_marvel": {
        coreCards.forEach(card => {
          if (card.card_set_code == "captain_marvel" && card.type_code == "hero") {
            heroes.push(card)
          }
          if (card.card_set_code == "captain_marvel_nemesis") {
            for (let i = 0; i < card.quantity!; i++) {
              nemesis.push(card)
            }
          }
          if (card.card_set_code == "captain_marvel" && card.type_code == "obligation") {
            obligation = card;
          }
        })
        Object.entries(captainMarvelStarterDeck).forEach(([key, value]) => {
          coreCards.forEach(card => {
            if (card.code == key) {
              for (let i = 0; i < value; i++) {
                deck.push(card)
              }
            }
          })
        });
        break;
      }
      case "iron_man": {
        coreCards.forEach(card => {
          if (card.card_set_code == "iron_man" && card.type_code == "hero") {
            heroes.push(card)
          }
          if (card.card_set_code == "iron_man_nemesis") {
            for (let i = 0; i < card.quantity!; i++) {
              nemesis.push(card)
            }
          }
          if (card.card_set_code == "iron_man" && card.type_code == "obligation") {
            obligation = card;
          }
        })
        Object.entries(ironManStarterDeck).forEach(([key, value]) => {
          coreCards.forEach(card => {
            if (card.code == key) {
              for (let i = 0; i < value; i++) {
                deck.push(card)
              }
            }
          })
        });
        break;
      }
      case "she_hulk": {
        coreCards.forEach(card => {
          if (card.card_set_code == "she_hulk" && card.type_code == "hero") {
            heroes.push(card)
          }
          if (card.card_set_code == "she_hulk_nemesis") {
            for (let i = 0; i < card.quantity!; i++) {
              nemesis.push(card)
            }
          }
          if (card.card_set_code == "she_hulk" && card.type_code == "obligation") {
            obligation = card;
          }
        })
        Object.entries(sheHulkStarterDeck).forEach(([key, value]) => {
          coreCards.forEach(card => {
            if (card.code == key) {
              for (let i = 0; i < value; i++) {
                deck.push(card)
              }
            }
          })
        });
        break;
      }
      case "black_panther": {
        coreCards.forEach(card => {
          if (card.card_set_code == "black_panther" && card.type_code == "hero") {
            heroes.push(card)
          }
          if (card.card_set_code == "black_panther_nemesis") {
            for (let i = 0; i < card.quantity!; i++) {
              nemesis.push(card)
            }
          }
          if (card.card_set_code == "black_panther" && card.type_code == "obligation") {
            obligation = card;
          }
        })
        Object.entries(blackPantherStarterDeck).forEach(([key, value]) => {
          coreCards.forEach(card => {
            if (card.code == key) {
              for (let i = 0; i < value; i++) {
                deck.push(card)
              }
            }
          })
        });
        break;
      }
      case "ghost_spider": {
        smCards.forEach(card => {
          if (card.card_set_code == "ghost_spider" && card.type_code == "hero") {
            heroes.push(card)
          }
          if (card.card_set_code == "ghost_spider_nemesis") {
            for (let i = 0; i < card.quantity!; i++) {
              nemesis.push(card)
            }
          }
          if (card.card_set_code == "ghost_spider" && card.type_code == "obligation") {
            obligation = card;
          }
        })
        Object.entries(ghostSpiderStarterDeck).forEach(([key, value]) => {
          smCards.forEach(card => {
            if (card.code == key) {
              for (let i = 0; i < value; i++) {
                deck.push(card)
              }
            }
          })
        });
        break;
      }
      case "spider_man_morales": {
        smCards.forEach(card => {
          if (card.card_set_code == "spider_man_morales" && card.type_code == "hero") {
            heroes.push(card)
          }
          if (card.card_set_code == "spider_man_morales_nemesis") {
            for (let i = 0; i < card.quantity!; i++) {
              nemesis.push(card)
            }
          }
          if (card.card_set_code == "spider_man_morales" && card.type_code == "obligation") {
            obligation = card;
          }
        })
        Object.entries(milesMoralesStarterDeck).forEach(([key, value]) => {
          smCards.forEach(card => {
            if (card.code == key) {
              for (let i = 0; i < value; i++) {
                deck.push(card)
              }
            }
          })
        });
        break;
      }
      case "doctor_strange": {
        drsCards.forEach(card => {
          if (card.card_set_code == "doctor_strange" && card.type_code == "hero") {
            heroes.push(card)
          }
          if (card.card_set_code == "doctor_strange_nemesis") {
            for (let i = 0; i < card.quantity!; i++) {
              nemesis.push(card)
            }
          }
          if (card.type_code == "obligation") {
            obligation = card;
          }
        })
        Object.entries(drsStarterDeck).forEach(([key, value]) => {
          drsCards.forEach(card => {
            if (card.code == key) {
              for (let i = 0; i < value; i++) {
                deck.push(card)
              }
            }
          })
          coreCards.forEach(card => {
            if (card.code == key) {
              for (let i = 0; i < value; i++) {
                deck.push(card)
              }
            }
          })
        });
        break;
      }
      case "spdr": {
        spdrCards.forEach(card => {
          if (card.card_set_code == "spdr" && (card.type_code == "hero" || card.type_code == "alter_ego")) {
            heroes.push(card)
          }
          if (card.card_set_code == "spdr_nemesis") {
            for (let i = 0; i < card.quantity!; i++) {
              nemesis.push(card)
            }
          }
          if (card.type_code == "obligation") {
            obligation = card;
          }
        })
        Object.entries(spdrStarterDeck).forEach(([key, value]) => {
          spdrCards.forEach(card => {
            if (card.code == key) {
              for (let i = 0; i < value; i++) {
                deck.push(card)
              }
            }
          })
          coreCards.forEach(card => {
            if (card.code == key) {
              for (let i = 0; i < value; i++) {
                deck.push(card)
              }
            }
          })
        });
        break;
      }
    }
    return {
      heroes,
      deck,
      nemesis,
      obligation
    };
  }

  getVillainDeckByCardSetCode(villainSetCode: string, modularSetCode: string): VillainCards {
    const villainCards: VillainCards = {
      villains: [],
      mainSchemes: [],
      environments: [],
      encounters: []
    }
    // Obtain standard encounter cards
    coreCards.forEach(card => {
      if (card.card_set_code == "standard" || card.card_set_code == modularSetCode) {
        for (let i = 0; i < card.quantity!; i++) {
          villainCards.encounters.push(card)
        }
      }
    })
    smCards.forEach(card => {
      if (card.card_set_code == modularSetCode) {
        for (let i = 0; i < card.quantity!; i++) {
          villainCards.encounters.push(card)
        }
      }
    })
    spdrCards.forEach(card => {
      if (card.card_set_code == modularSetCode) {
        for (let i = 0; i < card.quantity!; i++) {
          villainCards.encounters.push(card)
        }
      }
    })
    switch (villainSetCode) {
      case "rhino":
      case "klaw":
      case "ultron": {
        coreCards.forEach(card => {
          if (card.card_set_code == villainSetCode && card.type_code == "villain") {
            for (let i = 0; i < card.quantity!; i++) {
              villainCards.villains.push(card)
            }
          }
          else if (card.card_set_code == villainSetCode && card.type_code == "main_scheme") {
            for (let i = 0; i < card.quantity!; i++) {
              villainCards.mainSchemes.push(card)
            }
          }
          else if (card.card_set_code == villainSetCode && card.type_code == "environment") {
            for (let i = 0; i < card.quantity!; i++) {
              villainCards.environments.push(card)
            }
          }
          else if (card.card_set_code == villainSetCode) {
            for (let i = 0; i < card.quantity!; i++) {
              villainCards.encounters.push(card)
            }
          }
        })
        break;
      }
      case "sandman":
      case "venom":
      case "sinister_six":
      case "venom_goblin":
      case "mysterio": {
        smCards.forEach(card => {
          if (card.card_set_code == villainSetCode && card.type_code == "villain") {
            for (let i = 0; i < card.quantity!; i++) {
              villainCards.villains.push(card)
            }
          }
          else if (card.card_set_code == villainSetCode && card.type_code == "main_scheme") {
            for (let i = 0; i < card.quantity!; i++) {
              villainCards.mainSchemes.push(card)
            }
          }
          else if (card.card_set_code == villainSetCode && card.type_code == "environment") {
            for (let i = 0; i < card.quantity!; i++) {
              villainCards.environments.push(card)
            }
          }
          else if (card.card_set_code == villainSetCode) {
            for (let i = 0; i < card.quantity!; i++) {
              villainCards.encounters.push(card)
            }
          }
        })
        break;
      }
    }
    return villainCards;
  }
}

export interface GameCards {
  heroes: CardJson[];
  deck: CardJson[];
  nemesis: CardJson[];
  obligation: CardJson;
}

export interface VillainCards {
  villains: CardJson[];
  mainSchemes: CardJson[];
  environments: CardJson[];
  encounters: CardJson[];
}
