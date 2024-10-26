import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cidade } from '../models/cidade.model';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {
  private baseUrl = 'http://localhost:8080/cidades';

  constructor(private httpClient: HttpClient) { }

  findAll(page?: number, pageSize?: number): Observable<Cidade[]>{
    let params = {};

    if (page !== undefined && pageSize !== undefined){
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }

    console.log(params);

    return this.httpClient.get<Cidade[]>(this.baseUrl, {params}); //(`${this.baseUrl}`, {params})
  }

  count(): Observable<number>{
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findById(id: string): Observable<Cidade>{
    return this.httpClient.get<Cidade>(`${this.baseUrl}/${id}`);
  }

  insert(cidade: Cidade): Observable<Cidade>{
    const data = {
      nome: cidade.nome,
      idEstado: cidade.estado.id
    };
    return this.httpClient.post<Cidade>(this.baseUrl, data);
  }

  update(cidade: Cidade): Observable<Cidade>{
    const data = {
      nome: cidade.nome,
      idEstado: cidade.estado.id
    };
    return this.httpClient.put<Cidade>(`${this.baseUrl}/${cidade.id}`, data);
  }

  delete(cidade: Cidade): Observable<any>{
    return this.httpClient.delete<any>(`${this.baseUrl}/${cidade.id}`);
  }

}
