import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ImagemService {

  public API = `${environment.server}${environment.porta}`;

  constructor(
    private http: HttpClient

  ) { }

  public AUTORIZACAO = {
    headers: new HttpHeaders().set('Authorization', environment.token)

  }

  uploadImagem(image: File): Observable<string> {
    const data: FormData = new FormData();

    data.append('type', image.type);
    data.append('file', image);
    data.append('contentType', image);
    data.append('empty', String(false));
    data.append('name', image.name);
    data.append('originalFilename', image.name);
    data.append('size', String(image.size));

    return this.http.post<string>(`${this.API}/categoria/upload`, data, this.AUTORIZACAO);
  }

  renderImageByName(pasta: string, nomeArquivo: string) {

    return this.http.get(`${this.API}/categoria/render/${pasta}/${nomeArquivo}`);
  }

}
