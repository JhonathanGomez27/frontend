import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ListarComponent } from './corral/listar/listar.component';
import { CrearRestriccionComponent } from './restricciones/crear-restriccion/crear-restriccion.component';
import { GenerarReporteComponent } from './corral/generar-reporte/generar-reporte.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { AnimalListarComponent } from './animal/animal-listar/animal-listar.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    ListarComponent,
    CrearRestriccionComponent,
    GenerarReporteComponent,
    AnimalListarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    ToastrModule.forRoot()
  ]
})
export class AdminModule { }
