import { Component, Input, OnInit } from '@angular/core';
import { Categoria } from '../models/categoria';
import { environment } from 'src/environments/environment.prod';
import { Jogo } from '../models/jogo';

@Component({
  selector: 'app-card-jogo',
  templateUrl: './card-jogo.component.html',
  styleUrls: ['./card-jogo.component.css']
})
export class CardJogoComponent implements OnInit {

  @Input() jogo: Jogo;

  public servidor: string = `${environment.server}${environment.porta}`;

  constructor() { }

  ngOnInit() {
    window.scroll(0,0);

  }

  ajustaTexto(texto: string) {

    let retorno: string = "";

    for(let i = 0; i < texto.length; i++) {

      if(i <= 21) {

        retorno += texto.charAt(i);

      }else if(i == 22) {

        retorno = `${retorno}...`;

      }

    }

    return retorno;
  }

  ajustaValor(preco: string, desconto: number) {
    return Number(preco.replace(',', '.')) - (Number(preco.replace(',', '.')) * Math.abs(desconto / 100));
  }

}
