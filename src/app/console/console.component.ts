import { Component, OnInit } from '@angular/core';
import { Console } from '../models/console';
import { environment } from 'src/environments/environment.prod';
import { ConsoleService } from '../service/console.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {

  public idUsuario: number = environment.usuario_id;

  public console: Console = new Console();

  public listaIcons: string[] = [];

  constructor(
    private consoleService: ConsoleService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    /*if(environment.token != '') {
      this.router.navigate(['/login']);

    }*/

    this.carregarArquivoDeIcones();

  }

  carregarArquivoDeIcones() {
    this.consoleService.carregarArquivoDeIcones().subscribe((resp: string[]) => {
      this.listaIcons = resp;
    });

  }

  gerenciaNomeConsole() {
    if(this.console?.nome) {
      return this.console.nome;
    }

    return 'Console';
  }

  handleNomeIcone(event: any) {
    if(event?.target?.value) {
      this.console.icone = `bi bi-${event?.target?.value}`;
    }
  }

  cadastrarConsole() {
    this.console.usuario_id = this.idUsuario;

    this.consoleService.postConsole(this.console).subscribe((resp: any) => {
      console.log('resp: ', resp);

      this.router.navigate(['/home']);

    }, (err) => {
      console.log('err: ', err);

    });
  }

}
