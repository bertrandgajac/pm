/*
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FileSaver } from 'file-saver';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	FormsModule,
	FileSaver,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
*/
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule, AgGridAngular } from 'ag-grid-angular';
import { AgChartsAngularModule } from 'ag-charts-angular';
import { MenuComponent } from './menu/menu.component';
import { BtnVoirDocRendererComponent } from './AZ_renderers/btn-voir-doc-renderer.component';
import { BtnDefDocRendererComponent } from './AZ_renderers/btn-def-doc-renderer.component';
import { BtnDependancesRendererComponent } from './AZ_renderers/btn-dependances-renderer.component';
import { BoolRendererComponent } from './AZ_renderers/bool-renderer.component';
import { DateEditorComponent } from './AZ_renderers/date-editor.component';
import { DatetimeEditorComponent } from './AZ_renderers/datetime-editor.component';
import { CboEditorComponent } from './AZ_renderers/cbo-editor.component';
import { TreeViewComponent } from './AZ_treeview/treeview.component';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { MatInputModule} from '@angular/material/input';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ModalModule } from './AZ_modal/modal.module';
import { ReferencesComponent } from './ecrans/references.component';
import { PrsComponent } from './ecrans/prs.component';
import { LogesComponent } from './ecrans/loges.component';
import { LecDirComponent } from './ecrans/lecdir.component';
import { ReqComponent } from './ecrans/req.component';
import { CarteComponent } from './ecrans/carte.component';
import { SttComponent } from './ecrans/stt.component';
import { DependancesComponent } from './ecrans/dependances.component';

//import { CboGridEditor } from './cbo-grid-editor/cbo-grid.editor';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BtnVoirDocRendererComponent,
    BtnDefDocRendererComponent,
    BtnDependancesRendererComponent,
    BoolRendererComponent,
    DateEditorComponent,
    DatetimeEditorComponent,
	CboEditorComponent,
    ReferencesComponent,
    PrsComponent,
    LogesComponent,
	LecDirComponent,
	TreeViewComponent,
	ReqComponent,
	CarteComponent,
	SttComponent,
	DependancesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
	FormsModule,
	HttpClientModule,
	ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
	ModalModule,
	LeafletModule,
	AgChartsAngularModule,
    AgGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
//    AgGridModule.withComponents([BtnVoirDocRendererComponent,BtnDefDocRendererComponent,BtnDependancesRendererComponent,BoolRendererComponent,DateEditorComponent,    AgGridModule.withComponents([BtnVoirDocRendererComponent,BtnDefDocRendererComponent,BtnDependancesRendererComponent,BoolRendererComponent,DateEditorComponent,DatetimeEditorComponent,CboEditorComponent])
