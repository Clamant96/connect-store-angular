import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { Jogo } from '../models/jogo';

@Injectable({
  providedIn: 'root'
})
export class JogoService {

  public API = `${environment.server}${environment.porta}`;

  constructor(
    private http: HttpClient

  ) { }

  public AUTORIZACAO = {
    headers: new HttpHeaders().set('Authorization', environment.token)

  }

  findAllJogos(): Observable<Jogo[]> {

    return this.http.get<Jogo[]>(`${this.API}/jogo/`, this.AUTORIZACAO)
  }

}
