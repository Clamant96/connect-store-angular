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

  findAllJogosComSeusConsolesEUsuarioCategoria(): Observable<Categoria[]> {

    return this.http.get<Categoria[]>(`${this.API}/categoria/all-jogos-com-console-usuario-e-categoria`, this.AUTORIZACAO)
  }

  findAllJogosComSeusConsolesEUsuarioCategoriaManyToManyJogos(): Observable<Categoria[]> {

    return this.http.get<Categoria[]>(`${this.API}/categoria/all-jogos-com-console-usuario-e-categoria-many-to-many-jogos`, this.AUTORIZACAO)
  }

  findAllJogosCategoriaByUri(uri: string): Observable<Categoria> {

    return this.http.get<Categoria>(`${this.API}/categoria/all-jogos-categoria-uri/${uri}`, this.AUTORIZACAO)
  }

  findAllJogosComSeusConsolesEUsuarioCategoriaByIdManyToManyJogos(id: number): Observable<Categoria> {

    return this.http.get<Categoria>(`${this.API}/categoria/all-jogos-com-console-usuario-e-categoria-by-uri-many-to-many-jogos/${id}`, this.AUTORIZACAO)
  }

  findAllJogosComSeusConsolesEUsuarioCategoriaByUriManyToManyJogos(uri: string): Observable<Categoria> {

    return this.http.get<Categoria>(`${this.API}/categoria/all-jogos-com-console-usuario-e-categoria-by-uri-many-to-many-jogos/${uri}`, this.AUTORIZACAO)
  }

  postCategoria(categoria: Categoria) {

    return this.http.post(`${this.API}/categoria/cadastrar-categoria`, categoria, this.AUTORIZACAO);
  }

  putCategoria(categoria: Categoria) {

    return this.http.put(`${this.API}/categoria/atualizar-categoria-obj`, categoria, this.AUTORIZACAO);
  }

  deleteCategoria(id: number) {

    return this.http.delete(`${this.API}/categoria/deletar-categoria-obj/${id}`, this.AUTORIZACAO);
  }

}
