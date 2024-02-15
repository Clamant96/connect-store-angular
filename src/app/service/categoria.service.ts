import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  public API = `${environment.server}${environment.porta}`;

  constructor(
    private http: HttpClient

  ) { }

  public AUTORIZACAO = {
    headers: new HttpHeaders().set('Authorization', environment.token)

  }

  findAllJogosCategoria(): Observable<Categoria[]> {

    return this.http.get<Categoria[]>(`${this.API}/categoria/all-jogos-categoria`, this.AUTORIZACAO)
  }

  findAllJogosCategoriaByUri(uri: string): Observable<Categoria> {

    return this.http.get<Categoria>(`${this.API}/categoria/all-jogos-categoria-uri/${uri}`, this.AUTORIZACAO)
  }

}
