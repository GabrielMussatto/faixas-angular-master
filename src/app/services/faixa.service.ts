import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Faixa } from '../models/faixa.model';
import { Modalidade } from '../models/modalidade.model';

@Injectable({
  providedIn: 'root'
})
export class FaixaService {
  private baseUrl = 'http://localhost:8080/faixas';

  constructor(private httpClient: HttpClient) {
  }

  getUrlImage(nomeImagem: string): string{
    return `${this.baseUrl}/image/download/${nomeImagem}`;
  }

  uploadImage(id: number, nomeImagem: string, imagem: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('id', id.toString());
    formData.append('nomeImagem', imagem.name);
    formData.append('imagem', imagem, imagem.name);
    
    return this.httpClient.patch<Faixa>(`${this.baseUrl}/image/upload`, formData);
  }

  findModalidades(): Observable<Modalidade[]> {
    return this.httpClient.get<Modalidade[]>(`${this.baseUrl}/modalidades`);
  } //acho que resolve o enum do form

  findAll(page?: number, pageSize?: number): Observable<Faixa[]>{
    let params = {};

    if (page !== undefined && pageSize !== undefined){
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }

    console.log(params);

    return this.httpClient.get<Faixa[]>(this.baseUrl, {params}); //(`${this.baseUrl}`, {params})
  }

  count(): Observable<number>{
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findById(id: string): Observable<Faixa>{
    return this.httpClient.get<Faixa>(`${this.baseUrl}/${id}`);
  }

  insert(faixa: Faixa): Observable<Faixa> {
    const data = { //mesmo nome doq esta na api (localhost:8080)
      nome: faixa.nome,
      descricao: faixa.descricao,
      idModalidade: faixa.modalidade.id,
      preco: faixa.preco,
      estoque: faixa.estoque
    };
    return this.httpClient.post<Faixa>(this.baseUrl, data);
  }

  update(faixa: Faixa): Observable<Faixa>{
    const data = {
      nome: faixa.nome,
      descricao: faixa.descricao,
      idModalidade: faixa.modalidade.id,
      preco: faixa.preco,
      estoque: faixa.estoque
    };
    return this.httpClient.put<Faixa>(`${this.baseUrl}/${faixa.id}`, data);
  }

  delete(faixa: Faixa): Observable<any>{//void, sem retorno
    return this.httpClient.delete<any>(`${this.baseUrl}/${faixa.id}`);
  }
  
}
