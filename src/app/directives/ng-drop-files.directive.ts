import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivos: FileItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener('dragover', ['$event']) public onDragEnter( event: any) {
    this._prevenirDetener( event );
    this.mouseSobre.emit( true );
  }

  @HostListener('dragleave', ['$event']) public onDragLeave( event: any) {
    this.mouseSobre.emit( false );
  }

  @HostListener('drop', ['$event']) public onDrop( event: any) {
    const transferencia = this.getTransferencia( event );
    if ( !transferencia ) {
      return;
    }
    this._extraerArchivos( transferencia.files );
    this._prevenirDetener( event );
    this.mouseSobre.emit( false );
  }

  private getTransferencia( event: any ) {
    if ( event.dataTransfer ) {
      return event.dataTransfer;
    } else if ( event.originalEvent.dataTransfer ) {
      return event.originalEvent.dataTransfer;
    }
  }

  private _extraerArchivos( archivosLista: FileList ) {
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

  // Validaciones

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

  private _prevenirDetener( event ) {
    event.preventDefault();
    event.stopPropagation();
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
