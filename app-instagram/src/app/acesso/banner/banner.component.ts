import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Imagem } from './imagem.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('banner', [
      state('escondido', style({
        opacity: 0
      })),
      state('visivel', style({
        opacity: 1
      })),
      transition('escondido <=> visivel', animate('2s ease-in'))
    ])
  ]
})
export class BannerComponent implements OnInit {

  public estado = 'escondido';

  public imagens: Imagem[] = [
    { estado: 'visivel', url: '/assets/banner-acesso/img_1.png'},
    { estado: 'escondido', url: '/assets/banner-acesso/img_2.png'},
    { estado: 'escondido', url: '/assets/banner-acesso/img_3.png'},
    { estado: 'escondido', url: '/assets/banner-acesso/img_4.png'}
  ];

  constructor() { }

  ngOnInit() {
    setTimeout(() => this.logicaRotacao(), 4000);
  }

  public logicaRotacao(): void {

    const i = this.imagens.findIndex( i => i.estado === 'visivel');
    this.imagens[i].estado = 'escondido';
    this.imagens[(i === this.imagens.length - 1 ) ? 0 : i + 1].estado = 'visivel';

    setTimeout(() => {
      this.logicaRotacao();
    }, 3000);

  }

}
