import { Component, OnInit } from '@angular/core';
import { Cidade } from '../../../models/cidade.model';
import { CidadeService } from '../../../services/cidade.service';
import { NgFor } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cidade-list',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, RouterModule],
  templateUrl: './cidade-list.component.html',
  styleUrl: './cidade-list.component.css'
})
export class CidadeListComponent implements OnInit{
  displayedColumns: string[] = ['id', 'municipio', 'sigla', 'acao'];
  cidades: Cidade[] = [];

  constructor(private cidadeService: CidadeService) { 

  }

  ngOnInit(): void {
      this.cidadeService.findAll().subscribe(
        data => {this.cidades = data}
      );
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
