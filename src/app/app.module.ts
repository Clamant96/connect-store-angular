import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { JogosComponent } from './jogos/jogos.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { EditarCategoriaComponent } from './editar/editar-categoria/editar-categoria.component';
import { ConsoleComponent } from './console/console.component';
import { EditarConsoleComponent } from './editar/editar-console/editar-console.component';
import { JogoComponent } from './jogo/jogo.component';
import { CardJogoComponent } from './card-jogo/card-jogo.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JogosComponent,
    HeaderComponent,
    CategoriaComponent,
    EditarCategoriaComponent,
    ConsoleComponent,
    EditarConsoleComponent,
    JogoComponent,
    CardJogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
