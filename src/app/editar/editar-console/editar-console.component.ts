import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Console } from 'src/app/models/console';
import { ConsoleService } from 'src/app/service/console.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-editar-console',
  templateUrl: './editar-console.component.html',
  styleUrls: ['./editar-console.component.css']
})
export class EditarConsoleComponent implements OnInit {

  public idUsuario: number = environment.usuario_id;

  public console: Console = new Console();

  public listaIcons: string[] = [];

  constructor(
    private consoleService: ConsoleService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    window.scroll(0,0);

    /*if(environment.token != '') {
      this.router.navigate(['/login']);

    }*/

    let id = this.route.snapshot.params['id'];

    this.getByIdConsole(id);
    this.carregarArquivoDeIcones();

  }

  getByIdConsole(id: number) {
    this.consoleService.findByIdConsole(id).subscribe((resp: Console) => {
      resp.icone = resp.icone.replace('bi bi-', '');
      this.console = resp;

    }, (err) => {
      console.log('err: ', err);

    });

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
      this.console.icone = event?.target?.value;
    }
  }

  atualizarConsole() {
    this.console.usuario_id = this.idUsuario;
    this.console.icone = `bi bi-${this.console.icone}`;

    this.consoleService.putConsole(this.console).subscribe((resp: any) => {
      console.log('resp: ', resp);

      this.router.navigate(['/home']);

    }, (err) => {
      console.log('err: ', err);

    });
  }

  deletaConsole(id: number) {
    this.consoleService.deleteConsole(id).subscribe((resp: any) => {
      console.log(resp);

      this.router.navigate(['/home']);

    }, (err) => {
      console.log('err: ', err);
      if(String(err?.error?.text).includes('Console deletado com sucesso!')) {
        this.router.navigate(['/home']);
      }

    });
  }

}
