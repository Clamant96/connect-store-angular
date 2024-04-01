import { Jogo } from 'src/app/models/jogo';
import { Component, OnInit } from '@angular/core';
import { ImagemService } from '../service/imagem.service';
import { Console } from '../models/console';
import { ConsoleService } from '../service/console.service';
import { environment } from 'src/environments/environment.prod';
import { JogoService } from '../service/jogo.service';
import { Router } from '@angular/router';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit {

  public idUsuario = environment.usuario_id;

  public jogo: Jogo = new Jogo();

  public listaConsoles: Console[] = [];

  public selectedFile: ImageSnippet;
  public nomeArquivo: string = "";

  constructor(
    private imagemService: ImagemService,
    private consoleService: ConsoleService,
    private jogoService: JogoService,
    private router: Router,
  ) { }

  ngOnInit() {
    window.scroll(0,0);

    /*if(environment.token != '') {
      this.router.navigate(['/login']);

    }*/

    this.getAllConsoles();

  }

  getAllConsoles() {
    this.consoleService.findAllConsoles().subscribe((resp: Console[]) => {
      this.listaConsoles = resp;

      console.log("this.listaConsoles: ", this.listaConsoles);

    }, (err) => {
      console.log('Ocorreu um erro com a requisicao: ', err);

    });
  }

  ajustaTexto(texto: string) {

    let retorno: string = "";

    try {
      for(let i = 0; i < texto.length; i++) {

        if(i <= 21) {

          retorno += texto.charAt(i);

        }else if(i == 22) {

          retorno = `${retorno}...`;

        }

      }

      return retorno;
    }catch{return retorno;}

  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;

      this.imagemService.uploadImagemJogo(this.selectedFile.file).subscribe(
        (res) => {
          this.nomeArquivo = res;
          this.jogo.img = this.selectedFile.src;
          // console.log('this.nomeArquivo: ', this.nomeArquivo);

        },
        (err) => {
          this.nomeArquivo = err.error?.text;
          this.jogo.img = this.selectedFile.src;
          // console.log('this.nomeArquivo: ', this.nomeArquivo);

        })
    });

    reader.readAsDataURL(file);
  }

  handleIdConsole(event: any) {

    console.log('ID: ', event?.target?.value);

    this.listaConsoles?.some((console) => {

      if(console.id == Number(event?.target?.value)) {

        if (!this.jogo?.consoles?.some(selecao => selecao.id === Number(event?.target?.value))) {
          this.jogo.consoles.push(console);

        }

      }

    });

    if(!this.jogo.img) {
      this.jogo.img = "https://www.designi.com.br/images/preview/10902609.jpg";

    }


  }

  removeItemDeJogo(id: number, tag: string) {

    if(tag.includes('consoles')) {
      this.jogo.consoles = this.jogo?.consoles.filter(console => console.id !== id);

    }

  }

  cadastrarJogo() {

    this.jogo.usuario_id = this.idUsuario;
    this.jogo.img = this.nomeArquivo;

    console.log('this.jogo: ', this.jogo);

    this.jogoService.postJogo(this.jogo).subscribe((resp: any) => {
      console.log('resp: ', resp);

      this.router.navigate(['/home']);

    }, (err) => {
      console.log('err: ', err);
      if(String(err?.error?.text).includes('Jogo cadastrado com sucesso!')) {
        this.router.navigate(['/home']);
      }

    });

  }

  ajustaValor(preco: string, desconto: number) {
    return Number(preco.replace(',', '.')) - (Number(preco.replace(',', '.')) * Math.abs(desconto / 100));
  }

}
