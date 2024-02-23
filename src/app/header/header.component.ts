import { ConsoleService } from 'src/app/service/console.service';
import { Component, OnInit } from '@angular/core';
import { Console } from '../models/console';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public listaConsoles: Console[] = [];

  public idCategoria: number = 0;

  constructor(
    private consoleService: ConsoleService,
    private router: Router,
  ) { }

  ngOnInit() {
    window.scroll(0,0);

    this.getAllConsoles();

  }

  getAllConsoles() {
    this.consoleService.findAllConsoles().subscribe((resp: Console[]) => {
      this.listaConsoles = resp;

    }, (err) => {
      console.log('err: ', err);

    });

  }

  editarConsole(console: Console) {

    this.idCategoria = console.id;

  }

  renderizaURL(id: number) {

    if(id == 0) {
      return `/console`;
    }

    return `/console/${id}`;
  }

}
