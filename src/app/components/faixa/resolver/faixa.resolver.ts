import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Faixa } from "../../../models/faixa.model";
import { FaixaService } from "../../../services/faixa.service";


export const faixaResolver: ResolveFn<Faixa> = 
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(FaixaService).findById(route.paramMap.get('id')!);
    };