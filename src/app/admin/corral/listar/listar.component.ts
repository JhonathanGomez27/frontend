import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CorralService } from 'src/app/services/admin/corral/corral.service';
import { RestriccionService } from 'src/app/services/admin/restriccion/restriccion.service';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  respuesta: any;
  corrales: any;
  animales: any;
  averageAge: any;
  corraId: any;
  corral: any;

  dropdownList = [];
  dropdownSettings: IDropdownSettings = {};
  restrictions: any;

  constructor(
    private corralService: CorralService,
    private restrictionService: RestriccionService,
    private route: Router,
    private modalService: NgbModal,
    public toastService: ToastrService
  ) {
    this.corrales = [];
    this.animales = {};
    this.corral = {};
    this.averageAge = null;
   }

  ngOnInit(): void {
    this.getAllCorrales(localStorage.getItem('token'));
  }

  getAllCorrales(token: any){
    this.corralService.getCorrales(token).subscribe(
      (data)=>{
        this.respuesta = data;
        this.corrales = this.respuesta
      },
      (error)=>{
        console.log(error);
      },
      ()=>{
        console.log(this.respuesta);
      }
    )
  }

  onChange(corral:any){
    var requ = {corral: corral.value};
    this.corraId = corral.value;
    this.corralService.getAnimalsByCorral(requ).subscribe(
      (data)=>{
        this.respuesta = data;
        this.animales = this.respuesta;
        this.averageAge = null;
      },
      (error)=>{
        console.log(error);
      },
      ()=>{
        console.log(this.respuesta);
       }
    )
  }

  generarReporte(){
    this.route.navigate(['/admin/reporte']);
  }

  getAverageByAge(){
    var requ = {corral: this.corraId};
    this.corralService.getAverageByAge(requ).subscribe(
      (data)=>{
        this.respuesta = data.average;
        this.averageAge = this.respuesta;
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
    this.dropdownList = this.animales;
    this.dropdownSettings = {
      idField: '_id',
      textField: 'name',
    };

    this.getRestrictions();
    this.modalService.open(content,{
      size: 'md'
    });
  }


  getAnimalsByCorral(corral: any){
    this.corralService.getAnimalsByCorral(corral).subscribe(
      (data)=>{
        this.respuesta = data;
      },
      (error)=>{
        console.log(error);
      },
      ()=>{
        console.log(this.respuesta);
      }
    )
  }

  addCorral(){
    this.corral.capacity = parseInt(this.corral.capacity);
    this.corralService.addCorral(this.corral).subscribe(
      (data)=>{
        this.respuesta = data;
        this.modalService.dismissAll();
        this.getAllCorrales(localStorage.getItem('token'));
        this.corral = {};
        this.toastService.success("Corral creado con exito", "Exito",{
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

}
