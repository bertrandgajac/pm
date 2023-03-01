import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { fromEvent } from 'rxjs/observable/fromEvent';
import { UntypedFormBuilder } from '@angular/forms';
import { Cbo } from '../AZ_common/cbo.model';
import { EcranMaitreDetail } from '../AZ_services/ecran_maitre_detail';
import { Bloc } from '../AZ_services/bloc';
import { TypeColEcran,ColonneEcran,ModifCol } from '../AZ_common/ecran.model';
import { ModalService } from '../AZ_modal/modal.service';
/*
@Component({
  selector: 'app-prs',
//  templateUrl: './prs.component.html',
  styleUrls: ['./prs.component.scss']
})
*/
@Component({
  selector: 'app-prs',
  templateUrl: './prs.component.html'
})
@Injectable()
export class PrsComponent extends EcranMaitreDetail
{
	m_cbo_terr: any=null;	// Cbo;
	m_cbo_loges: any=null;	// Cbo;
	m_cbo_deg_bl: any=null;	// Cbo;
	m_cbo_deg_av: any=null;	// Cbo;
	m_cbo_villes: any=null;	// Cbo;
	m_cbo_etat_prs: any=null;	// Cbo;
	m_nom_prs:string='';
	m_prenom_prs:string='';
	m_id_loge:number=0;
	m_id_deg_bl:number=0;
	m_id_deg_av:number=0;
	m_ad1:string='';
	m_ad2:string='';
	m_id_ville:number=0;
	m_ad_elec:string='';
	m_tel1:string='';
	m_tel2:string='';
	m_id_etat_prs:number=0;
	m_lieu_comp:string='';
	m_nom_comp:string='';
	m_info_prs:string='';
	m_date_naiss:Date | undefined;
	m_lieu_naiss:string='';
	m_nom_naiss:string='';
	m_genres:string[]=['H','F'];
	m_genre:number=0;
	m_sign_charte:number=0;
	m_conserv_20_ans:number=0;
	m_cbo_genre:any=null;	// Cbo;
//	m_resizer;
	constructor(public override httpClient: HttpClient, public override formBuilder:UntypedFormBuilder,public override modalService:ModalService)
	{
		super(httpClient, formBuilder,modalService);
//console.log('debut de constructeur de Prscomponent');
		this.m_nom_ecran="Membres";
		this.m_blocs=new Array(6);
//		this.m_classe_boutons=new Array(4);
		var cols=new Array(8);
		cols[0]=new ColonneEcran("SelectId"," ",TypeColEcran.Booleen,true,ModifCol.Modifiable,true,true,30);
		cols[1]=new ColonneEcran("id_prs","id_prs",TypeColEcran.ClePrimaire,false,ModifCol.NonModifiable,false,true,100);
		cols[2]=new ColonneEcran("nom_prs","Nom",TypeColEcran.Chaine,true,ModifCol.NonModifiable,true,true,150);
		cols[3]=new ColonneEcran("prenom_prs","Prénom",TypeColEcran.Chaine,true,ModifCol.NonModifiable,true,true,120);
		cols[4]=new ColonneEcran("id_logeWITH","Loge",TypeColEcran.Chaine,true,ModifCol.NonModifiable,true,true,180);
		cols[5]=new ColonneEcran("id_deg_blWITH","Degré",TypeColEcran.Chaine,true,ModifCol.NonModifiable,true,true,140);
		cols[6]=new ColonneEcran("ad_elec","Mail",TypeColEcran.Chaine,true,ModifCol.NonModifiable,true,true,230);
		cols[7]=new ColonneEcran("nom_etat_prs","Situation",TypeColEcran.Chaine,true,ModifCol.NonModifiable,true,true,100);
		this.m_blocs[0]=new Bloc(httpClient,this,"prs__recherche","maitre","Maitre","G",300,"exec AZprs__recherche","", "id_prs",cols);
		cols=new Array(30);
		cols[0]=new ColonneEcran("etat","etat",TypeColEcran.Chaine,false,ModifCol.NonModifiable,false,true,100);
		cols[1]=new ColonneEcran("id_prs","id_prs",TypeColEcran.ClePrimaire,false,ModifCol.NonModifiable,false,true,100);
		cols[2]=new ColonneEcran("nom_prs","Nom",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,100);
		cols[3]=new ColonneEcran("prenom_prs","Prénom",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,100);
		cols[4]=new ColonneEcran("id_loge","id_loge",TypeColEcran.CleEtrangere,true,ModifCol.Obligatoire,false,true,100);
		cols[5]=new ColonneEcran("id_logeWITH","Loge",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,100);
		cols[6]=new ColonneEcran("ad1","Adresse 1",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,100);
		cols[7]=new ColonneEcran("ad2","Adresse 2",TypeColEcran.Chaine,true,ModifCol.Modifiable,true,true,100);
		cols[8]=new ColonneEcran("id_ville","id_ville",TypeColEcran.CleEtrangere,true,ModifCol.Obligatoire,false,true,100);
		cols[9]=new ColonneEcran("id_villeWITH","Ville",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,100);
		cols[10]=new ColonneEcran("ad_elec","Mail",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,100);
		cols[11]=new ColonneEcran("tel1","Téléphone 1",TypeColEcran.Chaine,true,ModifCol.Modifiable,true,true,100);
		cols[12]=new ColonneEcran("tel2","Téléphone 2",TypeColEcran.Chaine,true,ModifCol.Modifiable,true,true,100);
		cols[13]=new ColonneEcran("id_etat_prs","id_etat_prs",TypeColEcran.CleEtrangere,true,ModifCol.Modifiable,false,true,100);
		cols[14]=new ColonneEcran("id_etat_prsWITH","Situation",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,100);
		cols[15]=new ColonneEcran("lieu_comp","Lieu compagnonique",TypeColEcran.Chaine,true,ModifCol.Modifiable,true,true,100);
		cols[16]=new ColonneEcran("nom_comp","Nom compagnonique",TypeColEcran.Chaine,true,ModifCol.Modifiable,true,true,100);
		cols[17]=new ColonneEcran("info_prs","Info",TypeColEcran.Chaine,true,ModifCol.Modifiable,true,true,100);
		cols[18]=new ColonneEcran("id_deg_bl","id_deg_bl",TypeColEcran.CleEtrangere,true,ModifCol.Obligatoire,false,true,100);
		cols[19]=new ColonneEcran("id_deg_blWITH","Degré",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,100);
		cols[20]=new ColonneEcran("id_deg_av","id_deg_av",TypeColEcran.CleEtrangere,true,ModifCol.Modifiable,false,true,100);
		cols[21]=new ColonneEcran("id_deg_avWITH","Avancement",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,100);
		cols[22]=new ColonneEcran("date_naiss","Date de naissance",TypeColEcran.Date,true,ModifCol.Modifiable,true,true,100);
		cols[23]=new ColonneEcran("lieu_naiss","Lieu de naissance",TypeColEcran.Chaine,true,ModifCol.Modifiable,true,true,100);
		cols[24]=new ColonneEcran("nom_naiss","Nom de naissance",TypeColEcran.Chaine,true,ModifCol.Modifiable,true,true,100);
		cols[25]=new ColonneEcran("actif","Actif",TypeColEcran.Booleen,false,ModifCol.NonModifiable,false,false,100);
		cols[26]=new ColonneEcran("genre","Genre",TypeColEcran.Chaine,true,ModifCol.Modifiable,true,true,100);
		cols[27]=new ColonneEcran("sign_charte","Signature charte",TypeColEcran.Booleen,true,ModifCol.Modifiable,true,true,100);
		cols[28]=new ColonneEcran("date_depart","Date de départ",TypeColEcran.Date,true,ModifCol.Modifiable,true,true,100);
		cols[29]=new ColonneEcran("conserv_20_ans","Conservation données",TypeColEcran.Booleen,true,ModifCol.Modifiable,true,true,100);
		this.m_blocs[1]=new Bloc(httpClient,this,"prs","membre","Membre","F",300,"exec AZprs__prsSelect @id@","exec AZprs__prsMaj @etat@,@id_prs@,@nom_prs@,@prenom_prs@,@id_loge@,@ad1@,@ad2@,@id_ville@,@ad_elec@,@tel1@,@tel2@,@id_etat_prs@,@lieu_comp@,@nom_comp@,@info_prs@,@id_deg_bl@,@id_deg_av@,@date_naiss@,@lieu_naiss@,@nom_naiss@,@genre@,@sign_charte@,@date_depart@,@conserv_20_ans@", "id_prs",cols);
		cols=new Array(9);
		cols[0]=new ColonneEcran("etat","etat",TypeColEcran.Chaine,false,ModifCol.NonModifiable,false,true,100);
		cols[1]=new ColonneEcran("id_prs_deg","id_prs_deg",TypeColEcran.ClePrimaire,false,ModifCol.NonModifiable,false,true,100);
		cols[2]=new ColonneEcran("id_prs","id_prs",TypeColEcran.Entier,false,ModifCol.NonModifiable,false,true,100);
		cols[3]=new ColonneEcran("id_loge","Loge",TypeColEcran.CleEtrangere,true,ModifCol.Obligatoire,false,true,180);
		cols[4]=new ColonneEcran("id_logeWITH","Loge",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,80);
		cols[5]=new ColonneEcran("id_loge_tenue","Date",TypeColEcran.CleEtrangere,true,ModifCol.Obligatoire,false,true,120);
		cols[6]=new ColonneEcran("id_loge_tenueWITH","Date",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,100);
		cols[7]=new ColonneEcran("loge_tenue_descr","Tenue",TypeColEcran.Chaine,true,ModifCol.NonModifiable,true,true,250);
		cols[8]=new ColonneEcran("nom_deg","Degré",TypeColEcran.Chaine,true,ModifCol.NonModifiable,true,true,250);
		this.m_blocs[2]=new Bloc(httpClient,this,"prs_deg","degrés","Degrés","G",300,"exec AZprs__prs_degSelect @id@","exec AZprs__prs_degMaj @etat@,@id_prs_deg@,@id_prs@,@id_loge_tenue@","id_prs_deg",cols);
		cols=new Array(13);
		cols[0]=new ColonneEcran("etat","etat",TypeColEcran.Chaine,false,ModifCol.NonModifiable,false,true,100);
		cols[1]=new ColonneEcran("id_prs_trv","id_prs_trv",TypeColEcran.ClePrimaire,false,ModifCol.NonModifiable,false,true,100);
		cols[2]=new ColonneEcran("id_prs","id_prs",TypeColEcran.Entier,false,ModifCol.NonModifiable,false,true,100);
		cols[3]=new ColonneEcran("id_loge","Loge",TypeColEcran.CleEtrangere,true,ModifCol.Obligatoire,false,true,180);
		cols[4]=new ColonneEcran("id_logeWITH","Loge",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,80);
		cols[5]=new ColonneEcran("id_loge_tenue","Date",TypeColEcran.CleEtrangere,true,ModifCol.Obligatoire,false,true,120);
		cols[6]=new ColonneEcran("id_loge_tenueWITH","Date",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,100);
		cols[7]=new ColonneEcran("loge_tenue_descr","Tenue",TypeColEcran.Chaine,true,ModifCol.NonModifiable,true,true,350);
		cols[8]=new ColonneEcran("nom_trv","Nom",TypeColEcran.Chaine,true,ModifCol.Modifiable,true,true,300);
		cols[9]=new ColonneEcran("voir_doc_fs","",TypeColEcran.VoirDocFs,true,ModifCol.Modifiable,false,true,90);
		cols[10]=new ColonneEcran("def_doc_fs","",TypeColEcran.DefDocFs,true,ModifCol.Modifiable,false,true,140);
		cols[11]=new ColonneEcran("id_type_fic","Type de fichier",TypeColEcran.CleEtrangere,true,ModifCol.Modifiable,false,true,120);
		cols[12]=new ColonneEcran("id_type_ficWITH","Type fichier",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,true,100);
		this.m_blocs[3]=new Bloc(httpClient,this,"prs_trv","travaux","Travaux","G",300,"exec AZprs__prs_trvSelect @id@","exec AZprs__prs_trvMaj @etat@,@id_prs_trv@,@id_prs@,@id_loge_tenue@,@nom_trv@","id_prs_trv",cols);
		cols=new Array(11);
		cols[0]=new ColonneEcran("etat","etat",TypeColEcran.Chaine,false,ModifCol.NonModifiable,false,true,100);
		cols[1]=new ColonneEcran("id_prs_off","id_prs_off",TypeColEcran.ClePrimaire,false,ModifCol.NonModifiable,false,true,100);
		cols[2]=new ColonneEcran("id_prs","id_prs",TypeColEcran.Entier,false,ModifCol.NonModifiable,false,true,100);
		cols[3]=new ColonneEcran("id_loge","Loge",TypeColEcran.CleEtrangere,true,ModifCol.Obligatoire,false,true,180);
		cols[4]=new ColonneEcran("id_logeWITH","Loge",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,100);
		cols[5]=new ColonneEcran("id_type_off","Office",TypeColEcran.CleEtrangere,true,ModifCol.Obligatoire,false,true,180);
		cols[6]=new ColonneEcran("id_type_offWITH","Office",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,100);
		cols[7]=new ColonneEcran("id_loge_tenue_deb","Début",TypeColEcran.CleEtrangere,true,ModifCol.Obligatoire,false,true,120);
		cols[8]=new ColonneEcran("id_loge_tenue_debWITH","Début",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,100);
		cols[9]=new ColonneEcran("id_loge_tenue_fin","Fin",TypeColEcran.CleEtrangere,true,ModifCol.Modifiable,false,true,120);
		cols[10]=new ColonneEcran("id_loge_tenue_finWITH","Fin",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,100);
		this.m_blocs[4]=new Bloc(httpClient,this,"prs_off","offices","Offices","G",300,"exec AZprs__prs_offSelect @id@","exec AZprs__prs_offMaj @etat@,@id_prs_off@,@id_prs@,@id_loge@,@id_type_off@,@id_loge_tenue_deb@,@id_loge_tenue_fin@","id_prs_off",cols);
		cols=new Array(14);
		cols[0]=new ColonneEcran("etat","etat",TypeColEcran.Chaine,false,ModifCol.NonModifiable,false,true,100);
		cols[1]=new ColonneEcran("id_prs_doc","id_prs_doc",TypeColEcran.ClePrimaire,false,ModifCol.NonModifiable,false,true,100);
		cols[2]=new ColonneEcran("id_prs","id_prs",TypeColEcran.Entier,false,ModifCol.NonModifiable,false,true,100);
		cols[3]=new ColonneEcran("id_type_doc","Type",TypeColEcran.CleEtrangere,true,ModifCol.Obligatoire,false,true,250);
		cols[4]=new ColonneEcran("id_type_docWITH","Type",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,100);
		cols[5]=new ColonneEcran("voir_doc_db","",TypeColEcran.VoirDocDb,false,ModifCol.Modifiable,false,true,150);
		cols[6]=new ColonneEcran("def_doc_db","",TypeColEcran.DefDocDb,false,ModifCol.Modifiable,false,true,150);
		cols[7]=new ColonneEcran("voir_doc_fs","",TypeColEcran.VoirDocFs,true,ModifCol.Modifiable,false,true,90);
		cols[8]=new ColonneEcran("def_doc_fs","",TypeColEcran.DefDocFs,true,ModifCol.Modifiable,false,true,140);
		cols[9]=new ColonneEcran("nom_doc","Nom",TypeColEcran.Chaine,true,ModifCol.Modifiable,true,true,200);
		cols[10]=new ColonneEcran("lib_doc","Libellé",TypeColEcran.Chaine,true,ModifCol.Modifiable,true,true,120);
		cols[11]=new ColonneEcran("date_doc","Date",TypeColEcran.Date,true,ModifCol.Modifiable,true,true,120);
		cols[12]=new ColonneEcran("id_type_fic","Type de fichier",TypeColEcran.CleEtrangere,true,ModifCol.Modifiable,false,true,120);
		cols[13]=new ColonneEcran("id_type_ficWITH","Type fichier",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,true,100);
		this.m_blocs[5]=new Bloc(httpClient,this,"prs_doc","documents","Documents","G",300,"exec AZprs__prs_docSelect @id@","exec AZprs__prs_docMaj @etat@,@id_prs_doc@,@id_prs@,@nom_doc@,@lib_doc@,@date_doc@,@id_type_doc@,@id_type_fic@","id_prs_doc",cols);
		this.formRecherche=this.formBuilder.group({m_filtre_nom_prs: '', m_filtre_prenom_prs: '',m_filtre_terr:0,m_filtre_loge:0,m_filtre_deg_bl:0, m_filtre_actif: true});
		this.formOngletPrincipal=this.formBuilder.group({m_nom_prs:'',m_prenom_prs:'', m_id_loge:0,m_id_deg_bl:0,m_id_deg_av:0,m_ad1:'',m_ad2:'',m_id_ville:0,m_ad_elec:'',m_tel1:'',m_tel2:'',	m_id_etat_prs:0,m_lieu_comp:'',m_nom_comp:'',m_info_prs:'',m_date_naiss:'',m_lieu_naiss:'',m_nom_naiss:'',m_genre:0,m_sign_charte:0,m_date_depart:'',m_conserv_20_ans:0});
		this.m_nom_cle_maitre="id_prs";
		this.m_tab_col_nom_fic=["nom_prs","prenom_prs"];
		this.m_classe_boutons=new Array(this.m_blocs.length);
//console.log('fin de constructeur de Prscomponent');
	}
	ngOnInit(): void
	{
//console.log('debut de NgInit de Prscomponent');
		this.m_cbo_terr=new Cbo(this.httpClient,'terr');
		this.m_cbo_terr.GenererListeStd().then((res:string)=>{},(err: string)=>{this.MessageErreur(err);});
		this.m_cbo_loges=new Cbo(this.httpClient,'loge');
		this.m_cbo_loges.GenererListeStd().then((res:string)=>{},(err: string)=>{this.MessageErreur(err);});
		this.m_cbo_deg_bl=new Cbo(this.httpClient,'deg_bl');
		this.m_cbo_deg_bl.GenererListeStd().then((res:string)=>{},(err: string)=>{this.MessageErreur(err);});
		this.m_cbo_deg_av=new Cbo(this.httpClient,'deg_av');
		this.m_cbo_deg_av.GenererListeStd().then((res:string)=>{},(err: string)=>{this.MessageErreur(err);});
		this.m_cbo_villes=new Cbo(this.httpClient,'ville');
		this.m_cbo_villes.GenererListeStd().then((res:string)=>{},(err: string)=>{this.MessageErreur(err);});
		this.m_cbo_etat_prs=new Cbo(this.httpClient,'etat_prs');
		this.m_cbo_etat_prs.GenererListeStd().then((res:string)=>{},(err: string)=>{this.MessageErreur(err);});
		this.m_cbo_genre=new Cbo(this.httpClient,'genres');
		this.m_cbo_genre.InitialiserListe(this.m_genres);
		this.InitColDefs();
		this.Init();
		this.m_grid_options_maitre.columnDefs=this.m_blocs[0].m_coldefs;
//		this.InitSplitter('splitter_prs');
// debut
/*
		this.m_splitter = document.getElementById('dragMe');
console.log('resizer');
console.log(this.m_splitter);
		if(this.m_splitter!=null)
		{
/ *
			this.m_au_dessus = this.m_splitter.previousElementSibling;
console.log('leftSide');
console.log(this.m_au_dessus);
			this.m_au_dessous = this.m_splitter.nextElementSibling;
console.log('rightSide');
console.log(this.m_au_dessous);
		const mouseDownHandler = function (e)
		{
			// Get the current mouse position
//			x = e.clientX;
			y = e.clientY;
//			leftWidth = leftSide.getBoundingClientRect().width;

			// Attach the listeners to `document`
			document.addEventListener('mousemove', mouseMoveHandler);
			document.addEventListener('mouseup', mouseUpHandler);
		};
		const mouseMoveHandler = function (e)
		{
			// How far the mouse has been moved
//			const dx = e.clientX - x;
			const dy = e.clientY - y;
//			const newLeftWidth = ((leftWidth + dx) * 100) / resizer.parentNode.getBoundingClientRect().width;
//			leftSide.style.width = `${newLeftWidth}%`;
			this.m_hauteur_grille_maitre+=dy;
			if(this.m_hauteur_grille_maitre<10)this.m_hauteur_grille_maitre=10;
//			resizer.style.cursor = 'row-resize';
		};
* /
/ *
			this.m_splitter.addEventListener('mousedown', this.mouseDownHandler);
			this.m_splitter.addEventListener('mousemove', this.mouseMoveHandler);
//			this.m_splitter.addEventListener('mouseup', this.mouseUpHandler);
			document.addEventListener('mouseup', this.mouseUpHandler);
* /
			this.m_mouse_up$ = fromEvent(this.m_splitter, 'mouseup');
			this.m_mouse_up$.subscribe(_ =>
			{
				console.log('up');
				this.m_splitter_actif=false;
				this.register();
			})
			this.m_mouse_down$ = fromEvent(this.m_splitter, 'mousedown');
			this.m_mouse_down$.subscribe(_ =>
			{
				console.log('down');
				this.m_splitter_actif=true;
			});
			this.m_mouse_leave$ = fromEvent(this.m_splitter, 'mouseleave');
			this.m_mouse_leave$.subscribe(_ =>
			{
				console.log('leave');
				this.m_splitter_actif=false;
			});
			this.register();
		}
// fin
*/
//console.log('fin de NgInit de Prscomponent');
	}
	override RequeteRecherche():string
	{
		var nom_prs=this.formRecherche.get('m_filtre_nom_prs').value;
		if(nom_prs.length==0)
			nom_prs="null";
		else
			nom_prs=this.PreparerChainePourSql(nom_prs);
		var prenom_prs=this.formRecherche.get('m_filtre_prenom_prs').value;
		if(prenom_prs.length==0)
			prenom_prs="null";
		else
			prenom_prs=this.PreparerChainePourSql(prenom_prs);
		var id_terr: any;
		id_terr=this.formRecherche.get('m_filtre_terr').value;
//	console.log('type de id_loge='+id_loge.constructor.name);
		if(id_terr.constructor.name != 'String' ||id_terr=="0")
			id_terr="null";
		var id_loge: any;
		id_loge=this.formRecherche.get('m_filtre_loge').value;
//	console.log('type de id_loge='+id_loge.constructor.name);
		if(id_loge.constructor.name != 'String' ||id_loge=="0")
			id_loge="null";
		var id_deg_bl: any;
		id_deg_bl=this.formRecherche.get('m_filtre_deg_bl').value;
//	console.log('type de id_deg_bl='+id_deg_bl.constructor.name);
		if(id_deg_bl.constructor.name != 'String' ||id_deg_bl=="0")
			id_deg_bl="null";
		var actif=this.formRecherche.get('m_filtre_actif').value;
//	console.log('nom_prs='+nom_prs+',loge='+id_loge+',deg_bl='+id_deg_bl+', actif='+actif);
		var req_sql_maitre="exec AZprs__recherche @id_prs_login@,@nom_prs@,@prenom_prs@,@id_terr@,@id_loge@,@id_deg_bl@,@actif@";
		var req_sql=req_sql_maitre.replace("@nom_prs@",nom_prs).replace("@prenom_prs@",prenom_prs).replace('@id_terr@',''+id_terr).replace('@id_loge@',''+id_loge).replace('@id_deg_bl@',''+id_deg_bl).replace('@actif@',""+actif);
//console.log('VoirMaitre:'+req_sql);
		return req_sql;
	}
	override onViderCriteres()
	{
		this.formRecherche.get('m_filtre_nom_prs').setValue("");
		this.formRecherche.get('m_filtre_prenom_prs').setValue("");
		this.formRecherche.get('m_filtre_terr').setValue(0);
		this.formRecherche.get('m_filtre_loge').setValue(0);
		this.formRecherche.get('m_filtre_deg_bl').setValue(0);
		this.formRecherche.get('m_filtre_actif').setValue(false);
		this.ReinitialiserCompteur();
	}
	onAdressesMail()
	{
		var liste_adresses:string='';
		var i:number;
		for(i=0;i<this.m_blocs[0].m_lignes.length;i++)
		{
			if(this.m_blocs[0].m_lignes[i].m_cellules[0].m_val=="1")
			{
				var nom_prs:string=this.m_blocs[0].m_lignes[i].m_cellules[2].m_val;
				var prenom_prs:string=this.m_blocs[0].m_lignes[i].m_cellules[3].m_val;
				var ad_elec:string=this.m_blocs[0].m_lignes[i].m_cellules[6].m_val;
				liste_adresses+=nom_prs+' '+prenom_prs+'<'+ad_elec+'>;';
			}
		}
		this.MessageBox(liste_adresses);
		this.ReinitialiserCompteur();
	}
	/*
	ViderOngletPrincipal()
	{
console.log('prs.component.ViderOngletPrincipal');
		this.formOngletPrincipal.get('m_nom_prs').setValue("");
		this.formOngletPrincipal.get('m_prenom_prs').setValue("");
		this.formOngletPrincipal.get('m_id_loge').setValue(0);
		this.formOngletPrincipal.get('m_id_deg_bl').setValue(0);
		this.formOngletPrincipal.get('m_id_deg_av').setValue(0);
		this.formOngletPrincipal.get('m_ad1').setValue("");
		this.formOngletPrincipal.get('m_ad2').setValue("");
		this.formOngletPrincipal.get('m_id_ville').setValue(0);
		this.formOngletPrincipal.get('m_ad_elec').setValue("");
		this.formOngletPrincipal.get('m_tel1').setValue("");
		this.formOngletPrincipal.get('m_tel2').setValue("");
		this.formOngletPrincipal.get('m_id_etat_prs').setValue(0);
		this.formOngletPrincipal.get('m_lieu_comp').setValue("");
		this.formOngletPrincipal.get('m_nom_comp').setValue("");
		this.formOngletPrincipal.get('m_info_prs').setValue("");
		this.formOngletPrincipal.get('m_date_naiss').setValue("");
		this.formOngletPrincipal.get('m_lieu_naiss').setValue("");
		this.formOngletPrincipal.get('m_nom_naiss').setValue("");
		this.formOngletPrincipal.get('m_genre').setValue("");
		this.formOngletPrincipal.get('m_sign_charte').setValue(0);
		this.formOngletPrincipal.get('m_conserv_20_ans').setValue(0);
	}
	*/
	override RequeteCombobox(nom_onglet:string,num_lig:number,nom_col:string):string
	{
		var req:string="";
		switch(nom_onglet)
		{
			case "offices":
				switch(nom_col)
				{
					case "id_type_off":
						var id_loge:number=this.m_blocs[this.m_num_bloc_actif].ValCelluleParNom(num_lig,"id_loge");
						req = "exec AZinit_cbo_bis 'type_off',"+id_loge;
//console.log('RequeteCombobox: req='+req);
						break;
					case "id_loge_tenue_deb":
						var id_loge:number=this.m_blocs[this.m_num_bloc_actif].ValCelluleParNom(num_lig,"id_loge");
//console.log('PrsComponent.RequeteCombobox pour id_loge_tenue_deb: id_loge='+id_loge);
						req = "exec AZinit_cbo_bis 'loge_tenue_deb',"+id_loge;
						break;
					case "id_loge_tenue_fin":
						var id_loge_tenue_deb:number=this.m_blocs[this.m_num_bloc_actif].ValCelluleParNom(num_lig,"id_loge_tenue_deb");
						req = "exec AZinit_cbo_bis 'loge_tenue_fin',"+id_loge_tenue_deb;
//console.log('RequeteCombobox(id_loge_tenue_fin): req='+req);
						break;
				}
				break;
			case "travaux":
			case "degrés":
				switch(nom_col)
				{
					case "id_loge_tenue":
						var id_loge:number=this.m_blocs[this.m_num_bloc_actif].ValCelluleParNom(num_lig,"id_loge");
						req = "exec AZinit_cbo_bis 'loge_tenue_deb',"+id_loge;
						break;
				}
				break;
		}
		return req;
	}
	override ApresModifValeurChamp(num_lig_ecran_modifiee:number,nom_onglet:string,id_cle_primaire:number,nom_col:string,val_col_new:any)
	{
		switch(nom_onglet)
		{
			case "travaux":
			case "degrés":
				switch(nom_col)
				{
					case "id_loge":
//console.log("ApresModifValeurChamp("+nom_onglet+","+id_cle_primaire+","+nom_col+","+val_col_new+")");
						this.ForcerValeurChamp(num_lig_ecran_modifiee,nom_onglet,id_cle_primaire,"id_loge_tenue",0);
						break;
				}
				break;
		}
	}
	override RequetePourRecupererIdOngletPrincipal()
	{
		var nom_prs=this.formOngletPrincipal.get('m_nom_prs').value;
		var prenom_prs=this.formOngletPrincipal.get('m_prenom_prs').value;
		var sql:string="select id_prs from prs where nom_prs="+this.PreparerChainePourSql(nom_prs)+" and prenom_prs="+this.PreparerChainePourSql(prenom_prs);
		return sql;
	}
}
