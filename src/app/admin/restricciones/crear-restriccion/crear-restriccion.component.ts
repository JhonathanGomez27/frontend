import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { RestriccionService } from 'src/app/services/admin/restriccion/restriccion.service';
import { TipoService } from 'src/app/services/admin/tipo/tipo.service';

@Component({
  selector: 'app-crear-restriccion',
  templateUrl: './crear-restriccion.component.html',
  styleUrls: ['./crear-restriccion.component.css']
})
export class CrearRestriccionComponent implements OnInit {
  respuesta: any;
  restrictions: any;
  restriction:any;

  tipos:any;
  dropdownList = [];
  dropdownSettings: IDropdownSettings = {};

  constructor(
    private restrictionService: RestriccionService,
    private tipoService: TipoService,
    private modalService: NgbModal,
    public toastService: ToastrService
  ) { 
    this.restriction = {};
  }

  ngOnInit(): void {
    this.getRestrictions();
  }

  getRestrictions(){
    this.restrictionService.getRestrictions().subscribe(
      (data)=>{
        this.respuesta = data;
        this.restrictions = this.respuesta;
      },
      (error)=>{
        console.log(error);
      },
      ()=>{
        console.log(this.respuesta);
      }
    )
  }

  open(content:any) {
    this.getAllTypes();
    this.modalService.open(content,{
      size: 'md'
    });
  }

  getAllTypes(){
    this.tipoService.getTypes().subscribe(
      (data)=>{
        this.respuesta = data;
        this.tipos = this.respuesta;
        this.dropdownList = this.tipos;
        this.dropdownSettings = {
          idField: '_id',
          textField: 'name',
        };
      },
      (error)=>{
        console.log(error);
      },
      ()=>{
        console.log(this.respuesta);
      }
    )
  }

  addRestriction(){
    var cTipos:any[]= this.clone(this.restriction.types)
    var nTipos:any = [];

    cTipos.forEach(element => {
      nTipos.push(element._id);
    });

    this.restriction.types = nTipos;
    this.restrictionService.addRestriction(this.restriction).subscribe(
      (data)=>{
        this.respuesta = data;
        this.modalService.dismissAll();
        this.restriction = {};
        this.getRestrictions();
        this.toastService.success("Restriccion creada con exito", "Exito",{
          timeOut: 4000,
        });
      },
      (error)=>{
        console.log(error);
      },
      ()=>{
        console.log(this.respuesta);
      }
    )
  }

  /**
   * Metodo que permite clonar un objeto pasado por parametro
   * @param obj
   * @returns 
   */
   clone( obj:any ) {
    if ( obj === null || typeof obj  !== 'object' ) {
        return obj;
    }
 
    var temp = obj.constructor();
    for ( var key in obj ) {
        temp[ key ] = this.clone( obj[ key ] );
    }
 
    return temp;
  }

}
