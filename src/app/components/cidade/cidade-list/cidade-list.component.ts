import { Component, OnInit } from '@angular/core';
import { Cidade } from '../../../models/cidade.model';
import { CidadeService } from '../../../services/cidade.service';
import { NgFor } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-cidade-list',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, RouterModule, MatPaginatorModule],
  templateUrl: './cidade-list.component.html',
  styleUrl: './cidade-list.component.css'
})
export class CidadeListComponent implements OnInit{
  displayedColumns: string[] = ['id', 'municipio', 'estado', 'acao'];
  cidades: Cidade[] = [];

  //variaveis de controle para a paginação
  totalRecords = 0;
  pageSize = 2;
  page = 0;

  constructor(private cidadeService: CidadeService) { 

  }

  ngOnInit(): void {
    this.cidadeService.findAll(this.page, this.pageSize).subscribe(
      data => { this.cidades = data }
    );

    this.cidadeService.count().subscribe(
      data => { this.totalRecords = data }
    );
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  excluir(cidade: Cidade): void{
    if(confirm("Deseja realmente excluir este Municipio? Não será possivel reverter.")){
      this.cidadeService.delete(cidade).subscribe({
        next: () => {
          this.cidades = this.cidades.filter(e => e.id != cidade.id);
        },
        error: (err) => {
          console.error('Erro ao tentar excluir o Municipio', err);
        }
      });
    }
  }

}
