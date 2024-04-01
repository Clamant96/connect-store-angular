import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JogosComponent } from './jogos/jogos.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ConsoleComponent } from './console/console.component';
import { EditarConsoleComponent } from './editar/editar-console/editar-console.component';
import { JogoComponent } from './jogo/jogo.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'jogos/:uri',
    component: JogosComponent
  },
  {
    path: 'categoria',
    component: CategoriaComponent
  },
  {
    path: 'console',
    component: ConsoleComponent
  },
  {
    path: 'console/:id',
    component: EditarConsoleComponent
  },
  {
    path: 'jogo',
    component: JogoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
