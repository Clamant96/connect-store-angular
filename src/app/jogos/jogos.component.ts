import { CategoriaService } from './../service/categoria.service';
import { Categoria } from './../models/categoria';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jogos',
  templateUrl: './jogos.component.html',
  styleUrls: ['./jogos.component.css']
})
export class JogosComponent implements OnInit {

  public categoria: Categoria = new Categoria();

  constructor(
    private route: ActivatedRoute,
    private categoriaService: CategoriaService

  ) { }

  ngOnInit() {
    window.scroll(0,0);

    /*if(environment.token != '') {
      this.router.navigate(['/login']);

    }*/

    let uri = this.route.snapshot.params['uri'];

    this.getAllJogosByUriCategoria(uri);

  }

  getAllJogosByUriCategoria(uri: string) {
    this.categoriaService.findAllJogosCategoriaByUri(uri).subscribe((resp: Categoria) => {
      this.categoria = resp;

      console.log('this.categoria: ', this.categoria);

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

}
