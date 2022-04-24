import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {
  }
  //busca en html el elemento y lo asigna
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  buscar(){
    const value = this.txtBuscar.nativeElement.value;
    if(value.length==0){
      return;
    }
    this.gifsService.buscarGifs(value);
    this.txtBuscar.nativeElement.value='';
  }

}
