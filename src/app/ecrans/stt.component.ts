import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccesBdService } from '../AZ_services/acces_bd';
import { GlobalConstantes } from '../AZ_common/global_cst';
import { Ecran } from '../AZ_services/ecran';
import { UntypedFormBuilder } from '@angular/forms';
import { ModalService } from '../AZ_modal/modal.service';
import { Cbo } from '../AZ_common/cbo.model';
import { AgChartOptions, AgAreaSeriesOptions } from 'ag-charts-community';
/*
@Component({
  selector: 'app-stt',
  templateUrl: './stt.component.html'
})
@Injectable()
export class SttComponent extends Ecran
{
	m_cbo_terr: Cbo;
	nb_grp:number=0;
	tab_stats:Stat[];
    public options_stt: AgChartOptions;
	constructor(public httpClient: HttpClient, public formBuilder:UntypedFormBuilder,public modalService:ModalService)
	{
		super(httpClient, formBuilder,modalService);
		this.formRecherche=this.formBuilder.group({ m_filtre_loge:0,m_filtre_terr:0});
	}
	ngOnInit(): void
	{
		this.m_cbo_terr=new Cbo(this.httpClient,'terr');
		this.m_cbo_terr.GenererListeStd().then(res=>{},err=>{this.MessageErreur(err);});
		this.Init();
	}
	delay(ms: number)
	{
		return new Promise( resolve => setTimeout(resolve, ms) );
	}
	ngAfterViewInit()
	{
		this.TracerStats();
	}
	async TracerStats()
	{
		try
		{
			var i:number;
			var ab=new AccesBdService(this.httpClient);
console.log('Debut de TracerStats');
			var sql:string="exec AZstats @id_prs_login@,@id_terr@";
			var id_terr: any;
			id_terr=this.formRecherche.get('m_filtre_terr').value;
			if(id_terr.constructor.name != 'String' ||id_terr=="0")
				id_terr="null";
			var req=sql.replace('@id_terr@',''+id_terr).replace('@id_prs_login@',''+GlobalConstantes.m_id_prs_login);
console.log('req='+req);
			ab.LireTable(req)
			.then(res =>
			{
//console.log('carte:AjoutMarqueurs: res='+res);
				var str_res:string=""+res;
				if(!str_res.startsWith("Erreur"))
				{
					this.nb_grp=ab.m_lignes.length/4;
					this.tab_stats=new Array(this.nb_grp);
//console.log("carte: AjoutMarqueurs: nb_temples="+nb_temples);
					for(i=0;i<this.nb_grp;i++)
					{
						this.tab_stats[i]=new Stat();
						this.tab_stats[i].nom_grp=ab.m_lignes[4*i].RecupererVal(0);
// var nb_a=ab.m_lignes[4*i].RecupererVal(2);
//console.log('nb_a='+nb_a);
						this.tab_stats[i].nb_a=ab.m_lignes[4*i].RecupererVal(2);
						this.tab_stats[i].nb_c=ab.m_lignes[4*i+1].RecupererVal(2);
						this.tab_stats[i].nb_m=ab.m_lignes[4*i+2].RecupererVal(2);
						this.tab_stats[i].nb_mi=ab.m_lignes[4*i+3].RecupererVal(2);
					}
console.log('tab_stats');
console.log(this.tab_stats);
					this.options_stt =
					{
						data: this.tab_stats,
						title:
						{
							text: 'Statistiques',
						},
						subtitle:
						{
							text: 'par degré',
						},
						padding:
						{
							top:40,
							right:40,
							bottom:40,
							left:40,
						},
						series:
						[
							{ type: 'column', xKey: 'nom_grp', yKey: 'nb_a', stacked: true },
							{ type: 'column', xKey: 'nom_grp', yKey: 'nb_c', stacked: true },
							{ type: 'column', xKey: 'nom_grp', yKey: 'nb_m', stacked: true },
							{ type: 'column', xKey: 'nom_grp', yKey: 'nb_mi', stacked: true },
						],
						legend: { spacing: 40},
					};
					var mon_conteneur:any=document.getElementById('stt');
console.log('mon_conteneur');
console.log(mon_conteneur);
				}
			},
			(error) =>
			{
				var str_err:string=error;
				this.MessageErreur(str_err);
//console.log('carte:AjoutMarqueurs: err='+str_err);
//console.log('erreur dans ChargerBloc:'+str_err);
//				reject(str_err);
			})
//console.log('fin try');
		}
		catch(e)
		{
			this.MessageErreur("Erreur: "+(e as Error).message+"\n"+(e as Error).stack);
//			console.log("Erreur: "+(e as Error).message+"\n"+(e as Error).stack);
		}
//console.log('fin ngAfterViewInit');
	}
	onBtnRecherche()
	{
		this.TracerStats();
	}
}
class Stat
{
	public nom_grp:string;
	public nb_a:number;
	public nb_c:number;
	public nb_m:number;
	public nb_mi:number;
}
*/
@Component({
    selector: 'my-app',
    templateUrl: './stt.component.html'
})
export class SttComponent extends Ecran
{
    public options_stt: AgChartOptions;
	m_cbo_terr: any=null;	// Cbo;
	nb_grp:number=0;
	tab_stats:Stat[]=new Array(0);
    constructor(public override httpClient: HttpClient, public override formBuilder:UntypedFormBuilder,public override modalService:ModalService)
	{
 		super(httpClient, formBuilder,modalService);
		this.formRecherche=this.formBuilder.group({ m_filtre_terr:0});
		this.tab_stats=new Array(0);
		this.options_stt =
		{
            data: this.tab_stats,
            title:
			{
                text: 'Statistiques',
            },
            subtitle:
			{
                text: 'Par degré',
            },
            series:
			[
				{ type: 'column', xKey: 'nom_grp', yKey: 'nb_a', stacked: true },
				{ type: 'column', xKey: 'nom_grp', yKey: 'nb_c', stacked: true },
				{ type: 'column', xKey: 'nom_grp', yKey: 'nb_m', stacked: true },
				{ type: 'column', xKey: 'nom_grp', yKey: 'nb_mi', stacked: true },
			]	
        };
    }
	ngOnInit(): void
	{
		this.m_cbo_terr=new Cbo(this.httpClient,'terr');
		this.m_cbo_terr.GenererListeStd().then((res:string)=>{},(err:string)=>{this.MessageErreur(err);});
		this.Init();
	}
	TracerStats()
	{
		try
		{
			var i:number;
			var ab=new AccesBdService(this.httpClient);
console.log('Debut de TracerStats');
			var sql:string="exec AZstats @id_prs_login@,@id_terr@";
			var id_terr: any;
			id_terr=this.formRecherche.get('m_filtre_terr').value;
			if(id_terr.constructor.name != 'String' ||id_terr=="0")
				id_terr="null";
			var req=sql.replace('@id_terr@',''+id_terr).replace('@id_prs_login@',''+GlobalConstantes.m_id_prs_login);
console.log('req='+req);
			ab.LireTable(req)
			.then(
			(res) =>
			{
//console.log('carte:AjoutMarqueurs: res='+res);
				var str_res:string=""+res;
				if(!str_res.startsWith("Erreur"))
				{
					this.nb_grp=ab.m_lignes.length/4;
					this.tab_stats=new Array(this.nb_grp);
//console.log("carte: AjoutMarqueurs: nb_temples="+nb_temples);
					for(i=0;i<this.nb_grp;i++)
					{
						this.tab_stats[i]=new Stat();
						this.tab_stats[i].nom_grp=ab.m_lignes[4*i].RecupererVal(0);
// var nb_a=ab.m_lignes[4*i].RecupererVal(2);
//console.log('nb_a='+nb_a);
						this.tab_stats[i].nb_a=+ab.m_lignes[4*i].RecupererVal(2);
						this.tab_stats[i].nb_c=+ab.m_lignes[4*i+1].RecupererVal(2);
						this.tab_stats[i].nb_m=+ab.m_lignes[4*i+2].RecupererVal(2);
						this.tab_stats[i].nb_mi=+ab.m_lignes[4*i+3].RecupererVal(2);
					}
console.log('tab_stats');
console.log(this.tab_stats);
					const options= { ...this.options_stt };
					options.data=this.tab_stats;
//					options.series=this.series_deg;
					this.options_stt=options;
console.log('options_stt.data');
console.log(this.options_stt.data);
				}
			},
			(error) =>
			{
				var str_err:string=error;
				this.MessageErreur(str_err);
			})
//console.log('fin try');
		}
		catch(e)
		{
			this.MessageErreur("Erreur: "+(e as Error).message+"\n"+(e as Error).stack);
//			console.log("Erreur: "+(e as Error).message+"\n"+(e as Error).stack);
		}
//console.log('fin ngAfterViewInit');
	}
	onBtnRecherche()
	{
		this.TracerStats();
	}
}
class Stat
{
	public nom_grp:string='';
	public nb_a:number=0;
	public nb_c:number=0;
	public nb_m:number=0;
	public nb_mi:number=0;
}
