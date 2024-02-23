import { ImagemService } from './../service/imagem.service';
import { CategoriaService } from './../service/categoria.service';
import { JogoService } from './../service/jogo.service';
import { Categoria } from '../models/categoria';
import { Console } from '../models/console';
import { ConsoleService } from './../service/console.service';
import { Component, OnInit } from '@angular/core';
import { Jogo } from '../models/jogo';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  public idUsuario: number = environment.usuario_id;

  public listaConsoles: Console[] = [];
  public listaJogos: Jogo[] = [];

  public selectedFile: ImageSnippet;
  public nomeArquivo: string = "";

  public categoria: Categoria = new Categoria();

  public consoleSelecionado: string = "";

  constructor(
    private consoleService: ConsoleService,
    private jogoService: JogoService,
    private categoriaService: CategoriaService,
    private imagemService: ImagemService,
    private router: Router,

  ) { }

  ngOnInit() {
    window.scroll(0,0)

    /*if(environment.token != '') {
      this.router.navigate(['/login']);

    }*/

    this.getAllConsoles();
    this.getAllJogos();

  }

  getAllConsoles() {
    this.consoleService.findAllConsoles().subscribe((resp: Console[]) => {
      this.listaConsoles = resp;

    }, (err) => {
      console.log('Ocorreu um erro com a requisicao: ', err);

    });
  }

  getAllJogos() {
    this.jogoService.findAllJogos().subscribe((resp: Jogo[]) => {
      this.listaJogos = resp;

    }, (err) => {
      console.log('Ocorreu um erro com a requisicao: ', err);

    });
  }

  removeItemDeContegoria(id: number, tag: string) {
    if(tag.includes('consoles')) {
      this.categoria.consoles = this.categoria?.consoles.filter(console => console.id !== id);

    }else if(tag.includes('jogos')) {
      this.categoria.jogos = this.categoria.jogos.filter(jogo => jogo.id !== id);

    }


  }

  handleIdConsole(event: any) {

    console.log('ID: ', event?.target?.value);

    this.listaConsoles?.some((console) => {

      if(console.id == Number(event?.target?.value)) {

        if (!this.categoria?.consoles?.some(selecao => selecao.id === Number(event?.target?.value))) {
          this.categoria.consoles.push(console);

        }

      }

    });

  }

  handleIdJogo(event: any) {

    this.listaJogos?.some((jogo) => {

      if(jogo.id == Number(event?.target?.value)) {

        if (!this.categoria?.jogos?.some(selecao => selecao.id === Number(event?.target?.value))) {
          this.categoria.jogos.push(jogo);

        }

      }

    });

  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;

      this.imagemService.uploadImagem(this.selectedFile.file).subscribe(
        (res) => {
          this.nomeArquivo = res;
          // console.log('this.nomeArquivo: ', this.nomeArquivo);

        },
        (err) => {
          this.nomeArquivo = err.error?.text;
          // console.log('this.nomeArquivo: ', this.nomeArquivo);

        })
    });

    reader.readAsDataURL(file);
  }

  cadastrarCategoria() {

    this.categoria.usuario_id = this.idUsuario;
    this.categoria.img = this.nomeArquivo;
    this.categoria.uri = this.categoria.nome.toLowerCase();

    console.log('this.categoria: ', this.categoria);

    this.categoriaService.postCategoria(this.categoria).subscribe((resp: any) => {
      console.log('resp: ', resp);

      this.router.navigate(['/home']);

    }, (err) => {
      console.log('err: ', err);
      if(String(err?.error?.text).includes('Categoria cadastrado com sucesso!')) {
        this.router.navigate(['/home']);
      }

    });

  }

  gerenciaImagemBackgroundCategoria() {

    if(this.selectedFile) {
      return `background-image: url('${this.selectedFile.src}');`;
    }

    return "background-image: var(--img-tela-categoria);";
  }

  gerenciaNomeCategoria() {

    if(this.categoria?.nome) {
      return this.categoria.nome;
    }

    return 'Categoria';
  }

  gerenciaNomeConsole(console: string) {
    if(console != '') {
      return console;
    }

    return 'Plataforma';
  }

}
