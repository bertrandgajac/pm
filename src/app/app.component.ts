import { Component, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT,Location } from '@angular/common';
import { GlobalConstantes } from './AZ_common/global_cst';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{
	m_appel_par_href:boolean=false;
	title = 'Provence Mistral';
    constructor	(@Inject(DOCUMENT) private document: Document,private renderer: Renderer2,private router:Router,private loc_angular:Location)
	{
//console.log('classe de renderer='+this.renderer.constructor.name);
	}

    ngOnInit(): void
	{
		GlobalConstantes.m_app=this;
		GlobalConstantes.m_app_doc=this.document;
		GlobalConstantes.m_renderer=this.renderer;
		GlobalConstantes.m_classe_fonte='moyenne';
		const p='p=';
		const idx=window.location.href.indexOf(p);
		if(idx>0)
		{
//console.log('app_component.ngOnInit: idx='+idx);
			const params=window.location.href.substring(idx+p.length);
//console.log('app_component.ngOnInit: params bruts='+params);
			const tab_params:string[]=params.split('|');
//console.log('app_component.ngOnInit: params tab='+tab_params);
//console.log('app_component.ngOnInit: params[0]='+tab_params[0]);
			GlobalConstantes.m_id_prs_login = +tab_params[0];
			GlobalConstantes.m_num_ecran_appele= +tab_params[1];
			GlobalConstantes.m_num_bloc_appele= +tab_params[2];
			GlobalConstantes.m_id_appele = +tab_params[3];
			GlobalConstantes.m_classe_fonte= GlobalConstantes.NomClasseFonte(+tab_params[4]);
console.log('tab_params[4]='+tab_params[4]);
console.log('m_classe_fonte='+GlobalConstantes.m_classe_fonte);
			this.m_appel_par_href=true;
//console.log('app_component.ngOnInit: params='+GlobalConstantes.m_id_prs_login+','+GlobalConstantes.m_num_ecran_appele+','+GlobalConstantes.m_num_bloc_appele+','+GlobalConstantes.m_id_appele+','+GlobalConstantes.m_classe_fonte);
			this.router.navigate(['menu']);
		}
		else
		{
			this.m_appel_par_href=false;
		}
//console.log('fin de AppComponent.constructeur: global_cst.id_prs='+GlobalConstantes.m_id_prs_login);
		var fonte=GlobalConstantes.m_classe_fonte;
        this.renderer.addClass(this.document.body, fonte);
    }

    ngOnDestroy(): void
	{
		var fonte=GlobalConstantes.m_classe_fonte;
        this.renderer.removeClass(this.document.body, fonte);
    }
}
