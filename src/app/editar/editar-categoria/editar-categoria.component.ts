import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { Console } from 'src/app/models/console';
import { Jogo } from 'src/app/models/jogo';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ConsoleService } from 'src/app/service/console.service';
import { ImagemService } from 'src/app/service/imagem.service';
import { JogoService } from 'src/app/service/jogo.service';
import { environment } from 'src/environments/environment.prod';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {

  @Input() categoria: Categoria = new Categoria();

  public idUsuario: number = environment.usuario_id;

  public listaConsoles: Console[] = [];
  public listaJogos: Jogo[] = [];

  public selectedFile: ImageSnippet;
  public nomeArquivo: string = "";

  // public categoria: Categoria = new Categoria();

  public consoleSelecionado: string = "";

  public servidor: string = "http://localhost:8080";
  public classe: string = "categoria"
  public pasta: string = "categorias";

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

  atualizarCategoria() {

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

    }else if(this.categoria?.img) {
      return `background-image: url('${this.servidor}/${this.classe}/render/${this.pasta}/${this.categoria?.img}');`;

    }

    return "background-image: var(--img-tela-console);";
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
