import { Component, Injectable, AfterViewInit } from '@angular/core';
import { latLng, tileLayer } from 'leaflet';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { AccesBdService } from '../AZ_services/acces_bd';
import { GlobalConstantes } from '../AZ_common/global_cst';
import { Ecran } from '../AZ_services/ecran';
import { UntypedFormBuilder } from '@angular/forms';
import { ModalService } from '../AZ_modal/modal.service';
import { Cbo } from '../AZ_common/cbo.model';

/*
import { UntypedFormBuilder } from '@angular/forms';
import { Cbo } from '../AZ_common/cbo.model';
import { EcranGrille } from '../AZ_services/ecran_grille.service';
import { Bloc } from '../AZ_services/bloc.service';
import { TypeColEcran,TypeColSql,ColonneEcran,ModifCol } from '../AZ_common/ecran.model';
import { ModalService } from '../AZ_modal/modal.service';
*/
/*
@Component({
  selector: 'app-prs',
//  templateUrl: './prs.component.html',
  styleUrls: ['./prs.component.scss']
})
*/
/*
const STYLE_INITIAL = {
    color: '#4974ff',
    fillOpacity: 0.7,
    weight: 2
};

const STYLE_HOVER = {
    weight: 5,
    color: 'white'
};
*/
@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html'
})
@Injectable()
export class CarteComponent extends Ecran
{
//    public regionName: string;
//    public regionConfirmed: number;
	/*
	public options: any =
	{
        layers:
		[
            tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            })
        ],
        zoom: 6,
        center: latLng(46.303558, 6.0164252)
    };
    */
//    public selectedLegendInfos: number[];
//    public selectedLegendColorGradient: string[];
//	public layers: any[];
	m_cbo_orients: any=null;	// Cbo;
	m_cbo_terr: any=null;	// Cbo;
	m_cbo_loges: any=null;	// Cbo;
	private map:any=null;
	constructor(public override httpClient: HttpClient, public override formBuilder:UntypedFormBuilder,public override modalService:ModalService)
	{
		super(httpClient, formBuilder,modalService);
		/*
		this.layers = [];
        this.selectedLegendInfos = [];
        this.selectedLegendColorGradient = [
            '#ff0000',
            '#ff2e2e',
            '#ff6363',
            '#ff8181',
            '#ffb8b8',
            '#ffdcdc',
        ];
		*/
		this.formRecherche=this.formBuilder.group({ m_filtre_loge:0,m_filtre_terr:0,m_filtre_orient:0});
	}
	ngOnInit(): void
	{
		/*
		this.http.get('assets/REGION.json').subscribe((json: any) =>
		{
			this.layers.push(
				L.geoJSON
				(
					json,
					{
						style: STYLE_INITIAL,
		                onEachFeature: (feature, layer) =>
						{
console.log('on EachFeature');
							layer.on('mouseover', (e) => this.highlightFeature(e));
							layer.on('mouseout', (e) => this.resetHighlight(e));
                    //layer.on('click', (e) => this.zoomToFeature(e));
						}
					}
				)
			);
            this.updateStyleMap();
		});
		*/
		this.m_cbo_orients=new Cbo(this.httpClient,'orient');
		this.m_cbo_orients.GenererListeStd().then((res:string)=>{},(err: string)=>{this.MessageErreur(err);});
		this.m_cbo_terr=new Cbo(this.httpClient,'terr');
		this.m_cbo_terr.GenererListeStd().then((res:string)=>{},(err: string)=>{this.MessageErreur(err);});
		this.m_cbo_loges=new Cbo(this.httpClient,'loge');
		this.m_cbo_loges.GenererListeStd().then((res:string)=>{},(err: string)=>{this.MessageErreur(err);});
		this.Init();
	}
	/*
	delay(ms: number)
	{
		return new Promise( resolve => setTimeout(resolve, ms) );
	}
	*/
	ngAfterViewInit()
	{
		this.TracerCarte();
	}
	async TracerCarte()
	{
//console.log('avant init map');
		this.map = new L.Map('map',
		{
			layers:
			[
				tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
				{
					maxZoom: 18,
					attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
				})
			],
			zoom: 6,
			center: latLng(46.303558, 6.0164252)
		});
//console.log('apres init map');
		/*
	
		var lat:number=43.0;
		var lon:number;
		for(lon=2.0;lon<3.0;lon+=0.1)
		{
			var texte:string='lon='+lon;
			const marker = L.marker([lat, lon], {icon: mark});
			marker.addTo(this.map).bindPopup(texte);
		}
		*/
		/*
		var temple = L.icon({iconUrl: 'marqueur_temple.png',
			shadowUrl: 'ombre_temple.png',
			iconSize:     [16, 16],
			shadowSize:   [16, 16],
			iconAnchor:   [8, 8], // point of the icon which will correspond to marker's location
			shadowAnchor: [8, 8],  // the same for the shadow
			popupAnchor:  [0, -10] // point from which the popup should open relative to the iconAnchor
		});
		*/
//console.log('partie 2');
		try
		{
//console.log('avant appel AZlister_temple');
			var nb_temples:number=0;
			var nom_temple:string;
			var lat_t:number;
			var lon_t:number;
			var lat_v:number;
			var lon_v:number;
			var nom_terr:string;
			var lat:number;
			var lon:number;
			var liste_loges:string;
			var i:number;
			var j:number;
			var ab=new AccesBdService(this.httpClient);
//console.log('1');
			ab.LireTable("exec AZlister_temples")
			.then(res =>
			{
//console.log('carte:AjoutMarqueurs: res='+res);
				var str_res:string=""+res;
				if(!str_res.startsWith("Erreur"))
				{
					nb_temples=ab.m_lignes.length;
//console.log("carte: AjoutMarqueurs: nb_temples="+nb_temples);
					for(i=0;i<nb_temples;i++)
					{
//console.log("carte: AjoutMarqueurs: num_ligne="+i+": m_cellules="+ab.m_lignes[i].m_cellules);
//console.log(ab.m_lignes[i].m_cellules);
//console.log("carte: AjoutMarqueurs: num_ligne="+i+": nb_cellules="+ab.m_lignes[i].m_cellules.length+": cellules[1]="+ab.m_lignes[i].m_cellules[1].m_val);
						var app:string='';
						nom_temple=ab.m_lignes[i].RecupererVal(0);
						lat_t=ab.m_lignes[i].RecupererVal(1);
						lon_t=ab.m_lignes[i].RecupererVal(2);
						lat_v=ab.m_lignes[i].RecupererVal(3);
						lon_v=ab.m_lignes[i].RecupererVal(4);
						if(lat_t===undefined)
						{
							lat=lat_v;
							app='Approx: ';
						}
						else
						{
							lat=lat_t;
						}
						if(lon_t===undefined)
						{
							lon=lon_v;
						}
						else
						{
							lon=lon_t;
						}
						liste_loges=ab.m_lignes[i].RecupererVal(5);
						nom_terr=ab.m_lignes[i].RecupererVal(6);
//console.log('temple: '+nom_temple+','+lat_t+','+lon_t+','+lat_v+','+lon_v+','+liste_loges+','+nom_terr);
						var vignette='Temple: '+nom_temple+'<br>'+lat+':'+lon+'<br>Loges:';
						if(liste_loges===undefined)
						{
						}
						else
						{
							var tab_loges:string[]=liste_loges.split('§')
							var nb_loges:number=tab_loges.length;
							var num_ecran:string='2|1';
							for(j=0;j<nb_loges;j++)
							{
								var id_rep_loge=tab_loges[j];
								var tab_une_loge:string[]=id_rep_loge.split('#');
								var id_loge:number=parseInt(tab_une_loge[0]);
								var rep_loge:string=tab_une_loge[1];
//console.log('loge['+j+']:'+vignette);
								vignette+='<br><a href="'+GlobalConstantes.m_url+'?p='+GlobalConstantes.m_id_prs_login+'|'+num_ecran+'|'+id_loge+'|'+GlobalConstantes.NumClasseFonte(GlobalConstantes.m_classe_fonte)+'" target="_blank">'+rep_loge+'</a>';
//console.log('vignette='+vignette);
							}
						}
//console.log('avant insertion marqueur: lat='+lat+', lon='+lon+', vignette='+vignette);
						var temple=L.icon({iconUrl:'assets/'+nom_terr+'.jpg',shadowUrl:'assets/'+nom_terr+'.jpg',iconSize:[16, 16],shadowSize:[16, 16],iconAnchor:[8, 8],shadowAnchor: [8, 8],popupAnchor:  [0, -10]});
						if(temple===undefined)
						{
						}
						else
						{
							const marker = L.marker([lat, lon], {icon: temple});
//console.log('1');
							marker.addTo(this.map).bindPopup(vignette);
//console.log('2');
						}
					}
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
		var id_loge: any;
		id_loge=this.formRecherche.get('m_filtre_loge').value;
//	console.log('type de id_loge='+id_loge.constructor.name);
		if(id_loge.constructor.name != 'String' ||id_loge=="0")
			id_loge="null";
		var id_terr: any;
		id_terr=this.formRecherche.get('m_filtre_terr').value;
//	console.log('type de id_obed='+id_obed.constructor.name);
		if(id_terr.constructor.name != 'String' ||id_terr=="0")
			id_terr="null";
		var id_orient: any;
		id_orient=this.formRecherche.get('m_filtre_orient').value;
//	console.log('type de id_orient='+id_orient.constructor.name);
		if(id_orient.constructor.name != 'String' ||id_orient=="0")
			id_orient="null";
//	console.log('nom_loge='+nom_loge+',id_obed='+id_obed+', id_orient='+id_orient);
		var req_sql="select AZcentrer_carte(@id_loge@,@id_terr@,@id_orient@)";
		var req=req_sql.replace("@id_loge@",id_loge).replace('@id_terr@',''+id_terr).replace('@id_orient@',''+id_orient);
		var ab=new AccesBdService(this.httpClient);
//console.log('1');
		ab.LireValeur(req)
		.then
		(
			res =>
			{
				var str_res=''+res;
				if(str_res.startsWith('Erreur'))
					this.MessageErreur(str_res);
				else
				{
//console.log('carteComponent.onBtnRecherche: retour de LireValeur='+str_res);
					const tab_params:string[]=str_res.split(',');
					var lat:number=parseFloat(tab_params[0]);
					var lon:number=parseFloat(tab_params[1]);
					var zoom:number=parseInt(tab_params[2]);
//console.log('carteComponent.onBtnRecherche: retour de LireValeur: lat='+lat+', lon='+lon+', zoom='+zoom);
//console.log(this.map);
					if(zoom == 0)
					{
						this.MessageErreur("Localisation non définie");
					}
					else
					{
						this.map.setView([lat,lon],zoom);
					}
//console.log('fait');
				}
			},
			err =>
			{
				this.MessageErreur(err);
			}
		);
	}
	/*
	private updateLegendValues(): void
	{
        let maxValue = 0;
        this.layers[0].eachLayer((currentRegion) =>
		{
            if (currentRegion.feature.properties.confirmed > maxValue)
			{
                maxValue = currentRegion.feature.properties.confirmed;
            }
        });
        let tick = Math.round(maxValue / 7)
        this.selectedLegendInfos =
		[
            tick * 6,
            tick * 5,
            tick * 4,
            tick * 3,
            tick * 2,
            tick
        ];
    }
    public updateStyleMap(): void
	{
        this.updateLegendValues();
        this.layers[0].eachLayer((currentRegion) =>
		{
            currentRegion.setStyle(
			{
                fillColor: this.getColor(currentRegion.feature.properties.confirmed),
                fillOpacity: 0.7,
                weight: 2
            });
        });
    }
    private getColor(value: number)
	{
        return value > this.selectedLegendInfos[0] ? this.selectedLegendColorGradient[0] :
            value > this.selectedLegendInfos[1] ? this.selectedLegendColorGradient[1] :
                value > this.selectedLegendInfos[2] ? this.selectedLegendColorGradient[2] :
                    value > this.selectedLegendInfos[3] ? this.selectedLegendColorGradient[3] :
                        value > this.selectedLegendInfos[4] ? this.selectedLegendColorGradient[4] :
                            this.selectedLegendColorGradient[5];
    }
    public highlightFeature(e): void
	{
        const layer = e.target;
        layer.setStyle(STYLE_HOVER);
        console.log(layer.feature.properties.nom)
        this.regionName = layer.feature.properties.nom;
        this.regionConfirmed = layer.feature.properties.confirmed;
        this.ref.detectChanges();
    }
    private resetHighlight(e): void
	{
        this.layers[0].setStyle(STYLE_INITIAL);
        this.regionName = null;
        this.regionConfirmed = null;
        this.ref.detectChanges();
    }
	*/
}
