import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Console } from '../models/console';

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {

  public API = `${environment.server}${environment.porta}`;

  constructor(
    private http: HttpClient

  ) { }

  public AUTORIZACAO = {
    headers: new HttpHeaders().set('Authorization', environment.token)

  }

  carregarArquivoDeIcones(): Observable<string[]> {

    return this.http.get<string[]>('../../assets/icons/icons.json', { responseType: 'json' });
  }

  findAllConsoles(): Observable<Console[]> {

    return this.http.get<Console[]>(`${this.API}/console/`, this.AUTORIZACAO)
  }

  findByIdConsole(id: number): Observable<Console> {

    return this.http.get<Console>(`${this.API}/console/${id}`, this.AUTORIZACAO)
  }

  postConsole(console: Console) {

    return this.http.post(`${this.API}/console/criar-console`, console, this.AUTORIZACAO)
  }

  putConsole(console: Console) {

    return this.http.put(`${this.API}/console/atualizar-console`, console, this.AUTORIZACAO)
  }

  deleteConsole(id: number) {

    return this.http.delete(`${this.API}/console/deletar-console/${id}`, this.AUTORIZACAO);
  }

}
