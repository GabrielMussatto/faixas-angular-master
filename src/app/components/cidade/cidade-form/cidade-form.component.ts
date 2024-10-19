import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CidadeService } from '../../../services/cidade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { Cidade } from '../../../models/cidade.model';
import { Estado } from '../../../models/estado.model';
import { EstadoService } from '../../../services/estado.service';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-cidade-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, MatSelectModule],
  templateUrl: './cidade-form.component.html',
  styleUrl: './cidade-form.component.css'
})
export class CidadeFormComponent implements OnInit{
  formGroup: FormGroup;
  estados: Estado[] = [];

  constructor(private formBuilder: FormBuilder,
    private cidadeService: CidadeService,
    private estadoService: EstadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    //const cidade: Cidade = this.activatedRoute.snapshot.data['cidade'];

    this.formGroup = this.formBuilder.group({
      //id: [(cidade && cidade.id) ? cidade.id : null],
      id: [null],
      //nome: [(cidade && cidade.nome) ? cidade.nome : '', Validators.required],
      nome: ['', Validators.required],
      //idEstado: [(cidade && cidade.idEstado) ? cidade.idEstado : '', Validators.required]
      estado: [null]
    })
  }
  ngOnInit(): void {
    this.estadoService.findAll().subscribe(data => {
      this.estados = data;
      this.initializeForm();
    });
  }

  initializeForm(): void {
    const cidade: Cidade = this.activatedRoute.snapshot.data['cidade'];

    // selecionando o estado
    const estado = this.estados.find(estado => estado.id === (cidade?.estado?.id || null));

    this.formGroup = this.formBuilder.group({
      id: [(cidade && cidade.id) ? cidade.id : null],
      nome: [(cidade && cidade.nome) ? cidade.nome : null,  
                      Validators.compose([Validators.required, Validators.minLength(4),  Validators.maxLength(10)])],
      estado: [estado, Validators.required],
    });
  }

  salvar() {
    this.formGroup.markAllAsTouched();//define todos os campos como tocados
    if (this.formGroup.valid) {
      const cidade = this.formGroup.value;
      if (cidade.id == null) {
        this.cidadeService.insert(cidade).subscribe({
          next: (cidadeCadastrada) => {
            this.router.navigateByUrl('/cidades');
          },
          error: (errorResponse) => {
            console.log('Erro ao salvar a cidade', + JSON.stringify(errorResponse));
          }
        });
      } else {
        this.cidadeService.update(cidade).subscribe({
          next: (cidadeAlterada) => {
            this.router.navigateByUrl('/cidades');
          },
          error: (err) => {
            console.log('Erro ao salvar o Municipio', + JSON.stringify(err));
          }
        });
      }
    }
  }

  excluir(){
    if(this.formGroup.valid){
      const cidade = this.formGroup.value;
      if(cidade.id != null){
        if(confirm("Deseja realmente excluir esta cidade? Não será possivel reverter.")){
          this.cidadeService.delete(cidade).subscribe({
            next: () => {
              this.router.navigateByUrl('/cidades');
            },
            error: (err) => {
              console.log('Erro ao excluir o Municipio', + JSON.stringify(err));
            }
          });
        }
      }
    }
  }

  cancelar(){
    this.router.navigateByUrl('/cidades');
  }
}