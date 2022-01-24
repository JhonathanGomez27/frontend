import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AnimalService } from 'src/app/services/admin/animales/animal.service';
import { CorralService } from 'src/app/services/admin/corral/corral.service';
import { TipoService } from 'src/app/services/admin/tipo/tipo.service';

@Component({
  selector: 'app-animal-listar',
  templateUrl: './animal-listar.component.html',
  styleUrls: ['./animal-listar.component.css']
})
export class AnimalListarComponent implements OnInit {
  respuesta: any;
  tipos: any;
  corrales: any;
  animales: any;
  animal: any;

  constructor(
    private corralService: CorralService,
    private tipoService: TipoService,
    private animalService: AnimalService,
    private modalService: NgbModal,
    public toastService: ToastrService
  ) { 
    this.animal = {};
    this.animales = [];
  }

  ngOnInit(): void {
    this.getAllAnimals();
  }

  getAllTypes(){
    this.tipoService.getTypes().subscribe(
      (data)=>{
        this.respuesta = data;
        this.tipos = this.respuesta;
      },
      (error)=>{
        console.log(error);
      },
      ()=>{
        console.log(this.respuesta);
        this.tipos = this.respuesta;
      }
    )
  }

  getAllCorrales(token: any){
    this.corralService.getCorrales(token).subscribe(
      (data)=>{
        this.respuesta = data;
        this.corrales = this.respuesta;
      },
      (error)=>{
        console.log(error);
      },
      ()=>{
        console.log(this.respuesta);
      }
    )
  }

  getAllAnimals(){
    this.animalService.getAllAnimals().subscribe(
      (data)=>{
        this.respuesta = data;
        this.animales = this.respuesta;
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
    this.getAllCorrales("");
    this.modalService.open(content,{
      size: 'md'
    });
  }

  addAnimal(){
    this.animalService.addAnimal(this.animal).subscribe(
      (data)=>{
        this.respuesta = data;
        this.getAllAnimals();
        this.modalService.dismissAll();
        this.animal = {};
        this.toastService.success("Animal creado con exito", "Exito",{
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
}
