import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { EstadoService } from '../../../services/estado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Estado } from '../../../models/estado.model';

@Component({
  selector: 'app-estado-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule],
  templateUrl: './estado-form.component.html',
  styleUrl: './estado-form.component.css'
})
export class EstadoFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private estadoService: EstadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    const estado: Estado = this.activatedRoute.snapshot.data['estado'];

    this.formGroup = formBuilder.group({
      id: [(estado && estado.id) ? estado.id : null],
      nome: [(estado && estado.nome) ? estado.nome : '', Validators.compose([Validators.required, Validators.minLength(4)])],
      sigla: [(estado && estado.sigla) ? estado.sigla : '', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(2)])]
    })
  }
  /*
    onSubmit() {
      if (this.formGroup.valid) {
        const novoEstado = this.formGroup.value;
        this.estadoService.insert(novoEstado).subscribe({
          next: (estadoCadastrado) => {
            this.router.navigateByUrl('/estados');
          },
          error: (err) => {
            console.log('Erro ao salvar', + JSON.stringify(err));
          }
        })
      }
    }
  */
  salvar() {
    this.formGroup.markAllAsTouched();//define todos os campos como tocados
    if (this.formGroup.valid) {
      const estado = this.formGroup.value;
      if (estado.id == null) {
        this.estadoService.insert(estado).subscribe({
          next: (estadoCadastrado) => {
            this.router.navigateByUrl('/estados');
          },
          error: (errorResponse) => {
            console.log('Erro ao salvar', + JSON.stringify(errorResponse));
          }
        });
      } else {
        this.estadoService.update(estado).subscribe({
          next: (estadoAlterado) => {
            this.router.navigateByUrl('/estados');
          },
          error: (err) => {
            console.log('Erro ao salvar', + JSON.stringify(err));
          }
        });
      }
    }
  }

  excluir() {
    if (this.formGroup.valid) {
      const estado = this.formGroup.value;
      if (estado.id != null) {
        if (confirm("Deseja realmente excluir este Estado? Não será possivel reverter.")) {
          this.estadoService.delete(estado).subscribe({
            next: () => {
              this.router.navigateByUrl('/estados');
            },
            error: (err) => {
              console.log('Erro ao Excluir' + JSON.stringify(err));
            }
          });
        }
      }
    }
  }

  cancelar(){
    this.router.navigateByUrl('/estados');
  }

  getErrorMessage(controlName: string, errors: ValidationErrors | null | undefined): string {
    if (!errors) {
      return '';
    }
    
    // Retorna a mensagem do erro específica
    for (const errorName in errors) {
      if (errors.hasOwnProperty(errorName) && this.errorMessage[controlName] && this.errorMessage[controlName][errorName]) {
        return this.errorMessage[controlName][errorName];
      }
    }
    
    // Caso não encontre erro
    return 'Campo inválido';
  }

  errorMessage: {[controlName: string]: {[errorName: string] : string}} = {
    nome: {
      required: 'O nome deve ser informado',
      minlength: 'O nome deve ter no mínimo 4 caracteres',
    },
    sigla: {
      required: 'A sigla deve ser informada',
      minlength: 'A sigla deve ter no mínimo 2 caracteres',
      maxlength: 'A sigla deve ter no maximo 2 caracteres'
    }
  }

}
