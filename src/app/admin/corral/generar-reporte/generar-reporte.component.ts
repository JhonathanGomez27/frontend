import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AnimalService } from 'src/app/services/admin/animales/animal.service';

@Component({
  selector: 'app-generar-reporte',
  templateUrl: './generar-reporte.component.html',
  styleUrls: ['./generar-reporte.component.css']
})
export class GenerarReporteComponent implements OnInit {
  respuesta: any;
  animales: any;

  constructor(
    private animalService: AnimalService
    ) { }

  ngOnInit(): void {
    this.getAllAnimals();
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

  generarPDF(){
    const DATA: any = document.getElementById('htmldata');
    const doc = new jsPDF('p','pt','a4');
    const options = {
      background: 'white',
      scale: 3,
      pageSplit: true
    };

    html2canvas(DATA, options).then((canvas)=>{
      const img = canvas.toDataURL('image/PNG');

      var bufferX = 210; 
      var buffery = 295;  
      var imgHeight = canvas.height * bufferX / canvas.width;
      var heightLeft = imgHeight;

      var doc = new jsPDF('p', 'mm');
      var position = 0;

      doc.addImage(img, 'PNG', 0, position, bufferX, imgHeight);
      heightLeft -= buffery;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(img, 'PNG', 0, position, bufferX, imgHeight);
        heightLeft -= buffery;
      }
      return doc.save( 'Reporte.pdf')
    })
    
  }
}
