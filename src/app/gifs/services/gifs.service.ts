import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _historial: string[] =[]; 
  private api_key : string = 'LgFbmmSzob9GkgHvMC6nGTcxeEOKPAFl'
  private service_url : string = 'https://api.giphy.com/v1/gifs'
  public resultados: Gif[] = [];
  
  get historial() : string[]{
    return [...this._historial];
  }

  constructor(private http: HttpClient) { 
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];


  }

  buscarGifs( query : string){      
      query = query.trim().toLowerCase();

      if( !this._historial.includes(query)){
        this._historial.unshift(query);
        this._historial = this._historial.splice(0,10);
        //almacena en el storage de js el historial de busquedas, para ello se esa json => toma un objeto y lo convierte en string
        localStorage.setItem('historial', JSON.stringify(this._historial));
      }
      const params = new HttpParams()
         .set('api_key' ,  this.api_key)
         .set('limit' , '10')
         .set('q' , query);


      //modulo de angular que retorna observabols permite además agregar funcionalidades entre otras
      //La interface se obtiene del resultado de la api en la pagina https://app.quicktype.io/
      this.http.get<SearchGif>(`${this.service_url}/search?`, {params})
          //Se ejecuta cuando se obtiene una respuesta y se almacena en resp
          .subscribe( (resp) =>{
            this.resultados=resp.data;
            localStorage.setItem('resultados', JSON.stringify( this.resultados));
          });
  }

}
