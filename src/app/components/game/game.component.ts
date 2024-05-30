import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { coreCards } from '../../../assets/coreCards';
import { smCards } from '../../../assets/smCards';
import { drsCards } from '../../../assets/drsCards';
import { spdrCards } from '../../../assets/spdrCards';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [NgFor, MatButtonModule, MatMenuModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {
  private pressTimer: any;
  private zoomOverlay: HTMLElement | null = null;
  private zoomedCard: HTMLElement | null = null;

  ngOnInit(): void {
    const types: String[] = []
    coreCards.forEach(card => {
      if (card.type_code && !types.includes(card.type_code)) types.push(card.type_code)
    })
    console.log(types)
  }

  constructor(private renderer: Renderer2) { }

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



}
