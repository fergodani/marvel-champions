import { Component, OnInit } from '@angular/core';
import { coreCards } from '../../../assets/coreCards';
import { smCards } from '../../../assets/smCards';
import { drsCards } from '../../../assets/drsCards';
import { spdrCards } from '../../../assets/spdrCards';
import { NgFor } from '@angular/common';
import { Card } from '../../core/model/card.model';

@Component({
  selector: 'app-select-game',
  standalone: true,
  imports: [NgFor],
  templateUrl: './select-game.component.html',
  styleUrl: './select-game.component.css'
})
export class SelectGameComponent implements OnInit {

  ngOnInit(): void {
  }
  heroes : Card[] = [];
  constructor() {
    coreCards.forEach(item => {
      if (item.type_code == "hero") this.heroes.push(item)
    })
    smCards.forEach(item => {
      if (item.type_code == "hero") this.heroes.push(item)
    })
    drsCards.forEach(item => {
      if (item.type_code == "hero") this.heroes.push(item)
    })
    spdrCards.forEach(item => {
      if (item.type_code == "hero") this.heroes.push(item)
    })
  }

}
