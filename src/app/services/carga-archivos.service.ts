import { Injectable } from '@angular/core';
import { FileItem } from '../models/file-item';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class CargaArchivosService {

  constructor( public http: HttpClient) { }

  cargarArchivos( arhivos: FileItem[] ) {

    for ( const item of arhivos ) {

      item.estaSubiendo = true;

      if ( item.progreso >= 100 ) {
        continue;
      }

      const formData = new FormData();
      formData.append('file', item.archivo, item.nombreArchivo);

      this.http.post('http://localhost:3000/file/upload', formData, { responseType: 'blob' })
      .subscribe(data => {
        let nombreDescarga: any = item.nombreArchivo.split('.');
        nombreDescarga.pop();
        nombreDescarga = nombreDescarga.join('');
        nombreDescarga = `${nombreDescarga}.xlsx`;
        saveAs(data, nombreDescarga);
      });

    }

  }

}
