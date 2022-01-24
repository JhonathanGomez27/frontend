import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from '../guards/auth-guard.guard';
import { AnimalListarComponent } from './animal/animal-listar/animal-listar.component';
import { GenerarReporteComponent } from './corral/generar-reporte/generar-reporte.component';
import { ListarComponent } from './corral/listar/listar.component';
import { CrearRestriccionComponent } from './restricciones/crear-restriccion/crear-restriccion.component';

const routes: Routes = [{
  path: '',
  children:[
    { path: 'listarCorrales', component: ListarComponent, canActivate: [AuthGuardGuard]},
    { path: 'animal', component: AnimalListarComponent, canActivate: [AuthGuardGuard]},
    { path: 'reporte', component: GenerarReporteComponent, canActivate: [AuthGuardGuard]},
    { path: 'crearRestriccion', component: CrearRestriccionComponent,canActivate: [AuthGuardGuard]},
    { path: '**', redirectTo: 'listarCorrales', canActivate: [AuthGuardGuard]}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
