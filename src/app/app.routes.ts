import { Routes } from '@angular/router';
import { CidadeFormComponent } from './components/cidade/cidade-form/cidade-form.component';
import { CidadeListComponent } from './components/cidade/cidade-list/cidade-list.component';
import { EstadoFormComponent } from './components/estado/estado-form/estado-form.component';
import { EstadoListComponent } from './components/estado/estado-list/estado-list.component';
import { cidadeResolver } from './components/cidade/resolver/cidade.resolver';
import { estadoResolver } from './components/estado/resolver/estado.resolver';
import { AdminTemplateComponent } from './components/template/admin-template/admin-template.component';
import { UserTemplateComponent } from './components/template/user-template/user-template.component';
import { FaixaCardListComponent } from './components/faixa/faixa-card-list/faixa-card-list.component';
import { LoginComponent } from './components/login/login.component';



export const routes: Routes = [
    {
        path: 'admin',
        component: AdminTemplateComponent,
        title: 'administração',
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'estados' },
            { path: 'login', component: LoginComponent, title: 'Login'},
            
            { path: 'estados', component: EstadoListComponent, title: 'Lista de Estados' },
            { path: 'estados/new', component: EstadoFormComponent, title: 'Novo Estado' },
            { path: 'estados/edit/:id', component: EstadoFormComponent, resolve: { estado: estadoResolver } },
            { path: 'cidades', component: CidadeListComponent, title: 'Lista de Cidades' },
            { path: 'cidades/new', component: CidadeFormComponent, title: 'Nova Cidade' },
            { path: 'cidades/edit/:id', component: CidadeFormComponent, resolve: { cidade: cidadeResolver } },
        ]
    },
    {
        path: '',
        component: UserTemplateComponent,
        title: 'e-commerce',
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'faixas' },

            { path: 'faixas', component: FaixaCardListComponent, title: 'Lista de Faixas' },
            { path: 'login', component: LoginComponent, title: 'Login'},
        ]
    }
];
