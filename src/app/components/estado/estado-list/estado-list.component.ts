import { Component, OnInit } from '@angular/core';
import { Estado } from '../../../models/estado.model';
import { EstadoService } from '../../../services/estado.service';
import { NgFor } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-estado-list',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, RouterModule, MatPaginatorModule],
  templateUrl: './estado-list.component.html',
  styleUrl: './estado-list.component.css'
})
export class EstadoListComponent implements OnInit {
  estados: Estado[] = [];
  displayedColumns: string[] = ['id', 'nome', 'sigla', 'acao'];

  //variaveis de controle para a paginação
  totalRecords = 0;
  pageSize = 2;
  page = 0;

  constructor(private estadoService: EstadoService) {

  }

  ngOnInit(): void {
    this.estadoService.findAll(this.page, this.pageSize).subscribe(
      data => { this.estados = data }
    );

    this.estadoService.count().subscribe(
      data => { this.totalRecords = data }
    );
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  excluir(estado: Estado): void {
    if (confirm("Deseja realmente excluir este Estado? Não será possivel reverter.")) {
      this.estadoService.delete(estado).subscribe({
        next: () => {
          this.estados = this.estados.filter(e => e.id !== estado.id);
        },
        error: (err) => {
          console.error('Erro ao tentar excluir o estado', err);
        }
      });
    }
  }
}

