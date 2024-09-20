import { Routes } from '@angular/router';
import { CidadeFormComponent } from './components/cidade/cidade-form/cidade-form.component';
import { CidadeListComponent } from './components/cidade/cidade-list/cidade-list.component';
import { EstadoFormComponent } from './components/estado/estado-form/estado-form.component';
import { EstadoListComponent } from './components/estado/estado-list/estado-list.component';
import { estadoResolver } from './components/estado/estado-resolver';
import { cidadeResolver } from './components/cidade/cidade-resolver';


export const routes: Routes = [
    {path: 'estados',component: EstadoListComponent, title: 'Lista de Estados'},
    {path: 'estados/new',component: EstadoFormComponent, title: 'Novo Estado'},
    {path: 'estados/edit/:id', component: EstadoFormComponent, resolve: {estado: estadoResolver}},
    {path: 'cidades',component: CidadeListComponent, title: 'Lista de Cidades'},
    {path: 'cidades/new',component: CidadeFormComponent, title: 'Nova Cidade'},
    {path: 'cidades/edit/:id', component: CidadeFormComponent, resolve: {cidade: cidadeResolver}}
];
