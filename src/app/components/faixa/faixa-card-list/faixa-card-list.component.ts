import { Component, OnInit, signal } from '@angular/core';
import { Faixa } from '../../../models/faixa.model';
import { FaixaService } from '../../../services/faixa.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardActions, MatCardContent, MatCardModule, MatCardTitle } from '@angular/material/card';
import { NgFor } from '@angular/common';

type Card = {
  titulo: string;
  modalidade: string;
  preco: number;
  imageUrl: string;
}

@Component({
  selector: 'app-faixa-card-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgFor, MatCardActions, MatCardContent, MatCardTitle],
  templateUrl: './faixa-card-list.component.html',
  styleUrl: './faixa-card-list.component.css'
})
export class FaixaCardListComponent implements OnInit{
  faixas: Faixa[] = [];
  cards = signal<Card[]>([]);

  constructor(private faixaService: FaixaService){ }

  ngOnInit(): void {
    this.carregarFaixas();
  }

  carregarFaixas(){
    //buscando as faixas
    this.faixaService.findAll(0, 10).subscribe (data => {
      this.faixas = data;
      this.carregarCards();
    })
  }

  carregarCards(){
    const cards: Card[] = [];
    this.faixas.forEach(faixa => {
      cards.push({
        titulo: faixa.nome,
        modalidade: faixa.modalidade.label,
        preco: faixa.preco,
        imageUrl: this.faixaService.getUrlImage(faixa.nomeImagem)
      })
    });
    this.cards.set(cards);
  }
}
