import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CargaArchivosService } from './services/carga-archivos.service';
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NgDropFilesDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    CargaArchivosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
