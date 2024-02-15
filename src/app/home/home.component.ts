import { environment } from 'src/environments/environment.prod';
import { JogoService } from './../service/jogo.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Jogo } from '../models/jogo';
import { CategoriaService } from '../service/categoria.service';
import { Categoria } from '../models/categoria';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public listaJogos: Jogo[] = [];
  public listaCategorias: Categoria[] = [];

  constructor(
    private jogoService: JogoService,
    private categoriaService: CategoriaService,
    private router: Router,

  ) { }

  ngOnInit() {
    window.scroll(0,0)

    /*if(environment.token != '') {
      this.router.navigate(['/login']);

    }*/

    this.getAllJogos();
    this.getAllJogosCategoria();

  }

  getAllJogos() {
    this.jogoService.findAllJogos().subscribe((resp: Jogo[]) => {
      this.listaJogos = resp;

      console.log('this.listaJogos: ', this.listaJogos);

    },(err) => {
      console.log('Ocorreu um erro com a requisicao: ', err);

    });
  }

  getAllJogosCategoria() {
    this.categoriaService.findAllJogosComSeusConsolesEUsuarioCategoria().subscribe((resp: Categoria[]) => {
      this.listaCategorias = resp;

      console.log('this.listaJlistaCategoriasogos: ', this.listaCategorias);

    },(err) => {
      console.log('Ocorreu um erro com a requisicao: ', err);

    });
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

  ajustaImg(jogo: Jogo) {
    let retorno: string = "";

    console.log('img: ', jogo.img);

    retorno = `background-image: url('${jogo.img}');`;

    console.log('retorno: ', retorno);

    return retorno;
  }

}
