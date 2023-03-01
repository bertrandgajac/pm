import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UntypedFormBuilder } from '@angular/forms';
import { ModalService } from '../AZ_modal/modal.service';
import { Ecran } from '../AZ_services/ecran';
import { TypeNd } from '../AZ_common/dir.model';
import { TvNd } from '../AZ_treeview/treeview.component';

@Component({
  selector: 'app-lecdir',
  templateUrl: './lecdir.component.html'
})
@Injectable()
export class LecDirComponent extends Ecran
{
	m_nd:TvNd;
	constructor(public override httpClient: HttpClient, public override formBuilder:UntypedFormBuilder,public override modalService:ModalService)
	{
		super(httpClient,formBuilder,modalService);
//		this.formRecherche=this.formBuilder.group({ m_filtre_nom_dir: 'C:/Users/bertr/Documents/oitar/territoire_pm_nouveau'});
		this.m_nd=new TvNd(httpClient,this,'/',TypeNd.Rep,'C:/Users/bertr/Documents/oitar/territoire_pm_nouveau');
	}
}
