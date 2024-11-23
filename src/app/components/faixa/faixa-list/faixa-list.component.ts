import { Component, OnInit } from '@angular/core';
import { Faixa } from '../../../models/faixa.model';
import { FaixaService } from '../../../services/faixa.service';
import { CommonModule, NgFor } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-faixa-list',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, RouterModule, MatPaginatorModule, CommonModule],
  templateUrl: './faixa-list.component.html',
  styleUrl: './faixa-list.component.css'
})
export class FaixaListComponent implements OnInit {
  faixas: Faixa[] = [];
  displayedColumns: string[] = ['id', 'nome', 'descricao', 'preco', 'estoque', 'modalidade', 'acao'];

  //variaveis de controle para a paginação
  totalRecords = 0;
  pageSize = 2;
  page = 0;

  constructor(private faixaService: FaixaService) {

  }

  ngOnInit(): void {
    this.faixaService.findAll(this.page, this.pageSize).subscribe(
      data => { this.faixas = data }
    );

    this.faixaService.count().subscribe(
      data => { this.totalRecords = data }
    );
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  excluir(faixa: Faixa): void {
    if (confirm("Deseja realmente excluir este Faixa? Não será possivel reverter.")) {
      this.faixaService.delete(faixa).subscribe({
        next: () => {
          this.faixas = this.faixas.filter(e => e.id !== faixa.id);
        },
        error: (err) => {
          console.error('Erro ao tentar excluir o faixa', err);
        }
      });
    }
  }
}

