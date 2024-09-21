import { Component } from '@angular/core';
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

@Component({
  selector: 'app-cidade-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule],
  templateUrl: './cidade-form.component.html',
  styleUrl: './cidade-form.component.css'
})
export class CidadeFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private cidadeService: CidadeService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    const cidade: Cidade = this.activatedRoute.snapshot.data['cidade'];


    this.formGroup = this.formBuilder.group({
      id: [(cidade && cidade.id) ? cidade.id : null],
      nome: [(cidade && cidade.nome) ? cidade.nome : '', Validators.required],
      idEstado: [(cidade && cidade.idEstado) ? cidade.idEstado : '', Validators.required]
    })
  }
  /*
    onSubmit() {
      if (this.formGroup.valid) {
        const novaCidade = this.formGroup.value;
        this.cidadeService.insert(novaCidade).subscribe({
          next: (cidadeCadastrada) => {
            this.router.navigateByUrl('/cidades');
          },
          error: (err) => {
            console.log('Erro ao salvar a cidade', + JSON.stringify(err));
          }
        })
      }
    }
  */

  salvar() {
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
        if(confirm("Deseja realmente excluir este Municipio? Não será possivel reverter.")){
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
