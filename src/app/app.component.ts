import { Component } from '@angular/core';
import { FileItem } from './models/file-item';
import { CargaArchivosService } from './services/carga-archivos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  estaSobreElemento = false;
  archivos: FileItem[] = [];

  constructor( public cargaArchivosService: CargaArchivosService) {}

  cargarArchivos() {
    this.cargaArchivosService.cargarArchivos( this.archivos );
  }

  limpiarArchivos() {
    this.archivos = [];
  }

  uploadFile( event: any ) {
    const archivosLista = event.target.files;
    // tslint:disable-next-line: forin
    for ( const propiedad in Object.getOwnPropertyNames(archivosLista) ) {
      const archivoTemporal = archivosLista[propiedad];
      if (this._archivoPuedeSerCargado( archivoTemporal )) {
        const nuevoArchivo = new FileItem( archivoTemporal );
        this.archivos.push(nuevoArchivo);
      } else {
        console.log('El archivo no puede ser cargado');
      }
    }
  }

  private _archivoPuedeSerCargado( archivo: File ): boolean {
    if ( !this._archivoYaFueDropeado( archivo.name ) && this._esPdf( archivo.type ) ) {
      if (  archivo.name.toLowerCase().includes('renta') ||
            archivo.name.toLowerCase().includes('iva') ||
            archivo.name.toLowerCase().includes('ica') ||
            archivo.name.toLowerCase().includes('retenciones')
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  private _archivoYaFueDropeado( nombreArchivo: string ): boolean {
    for ( const archivo of this.archivos ) {
      if ( archivo.nombreArchivo === nombreArchivo ) {
        console.log('El archivo "' + nombreArchivo + '" ya esta agregado.');
        return true;
      }
    }
    return false;
  }

  private _esPdf( tipoArchivo: string ): boolean {
    if ( tipoArchivo === '' || tipoArchivo === undefined ) {
      return false;
    } else if ( tipoArchivo.toLowerCase().includes('pdf') ) {
      return true;
    }
  }
}
