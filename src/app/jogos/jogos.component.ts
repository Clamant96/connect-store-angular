import { environment } from 'src/environments/environment.prod';
import { ImagemService } from './../service/imagem.service';
import { CategoriaService } from './../service/categoria.service';
import { Categoria } from './../models/categoria';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Jogo } from '../models/jogo';

@Component({
  selector: 'app-jogos',
  templateUrl: './jogos.component.html',
  styleUrls: ['./jogos.component.css']
})
export class JogosComponent implements OnInit {

  public categoria: Categoria = new Categoria();

  public idConsolePesquisa: number = 0;
  public precoJogoPesquisa: string = "";
  public nomeJogoPesquisa: string = "";

  public servidor: string = `${environment.server}${environment.porta}`;
  public classe: string = "categoria"
  public pasta: string = "categorias";

  public isEditar: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private categoriaService: CategoriaService,
    private imagemService: ImagemService

  ) { }

  ngOnInit() {
    window.scroll(0,0);

    /*if(environment.token != '') {
      this.router.navigate(['/login']);

    }*/

    let uri = this.route.snapshot.params['uri'];

    if(uri != "" || uri != undefined) {
      this.getAllJogosByUriCategoria(uri);

    }


  }

  getAllJogosByUriCategoria(uri: string) {
    this.categoriaService.findAllJogosComSeusConsolesEUsuarioCategoriaByUriManyToManyJogos(uri).subscribe((resp: Categoria) => {
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

  renderizaQtdItens(categoria: Categoria) {

    try {

      if(categoria.jogos) {
        return categoria.jogos.length;
      }

    }catch{return 0;}

    return 0;
  }

  renderImagem(pasta: string, nomeArquivo: string) {
    this.imagemService.renderImageByName(pasta, nomeArquivo).subscribe((resp) => {
      console.log('resp: ', resp);
      return resp;
    })
  }

  ajustaObjCategoria(categoria: Categoria, idConsole: number, precoJogo: string, nomeJogo: string) {

    let memoriaCategoria: Categoria = new Categoria();

    memoriaCategoria.id = categoria.id;
    memoriaCategoria.img = categoria.img;
    memoriaCategoria.nome = categoria.nome;
    memoriaCategoria.uri = categoria.uri;
    memoriaCategoria.usuarios = categoria.usuarios;
    memoriaCategoria.jogos = [];
    memoriaCategoria.consoles = [];

    if(precoJogo != '' && idConsole == 0) {

      categoria.jogos?.map((jogo) => {

        if(Number(jogo.preco) <= Number(precoJogo)) {

          memoriaCategoria.jogos.push(jogo);

        }

      });

    }else if(idConsole >= 0 && precoJogo == '') {

      categoria.jogos?.map((jogo) => {

        jogo.consoles.map((console) => {

          if(console.id == idConsole) {

            memoriaCategoria.jogos.push(jogo);

          }

        });

      });

    }else if(precoJogo != '' && idConsole >= 0) {

      categoria.jogos?.map((jogo) => {

        jogo.consoles.map((console) => {

          if(Number(jogo.preco) <= Number(precoJogo) && console.id == idConsole) {

            memoriaCategoria.jogos.push(jogo);

          }

        });

      });

    }

    if((precoJogo != '' || idConsole > 0) && nomeJogo == '') {

      return memoriaCategoria;
    }else {

      if(nomeJogo != '') {

        this.idConsolePesquisa = 0; // VOLTA O VALOR PADRAO
        this.precoJogoPesquisa = ""; // VOLTA O VALOR PADRAO

        categoria.jogos?.map((jogo) => {

          if(jogo.nome.toLocaleLowerCase().includes(nomeJogo.toLocaleLowerCase())) {

            memoriaCategoria.jogos.push(jogo);

          }

        });

        return memoriaCategoria;
      }

      return categoria;
    }

  }

  handleIdConsole(event: any) {
    console.log('CONSOLE ID: ', event.target.value);

    this.idConsolePesquisa = Number(event.target.value);

  }

  handlePrecoJogo(event: any) {
    console.log('PRECO JOGO: ', event.target.value);

    this.precoJogoPesquisa = String(event.target.value);

  }

  handleNomeJogo(event: any) {
    console.log('NOME JOGO: ', event.target.value);

    this.nomeJogoPesquisa = String(event.target.value);

  }

  gerenciaBotaoEditar(editar: boolean) {
    this.isEditar = editar;

  }

}
