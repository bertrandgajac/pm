import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UntypedFormBuilder } from '@angular/forms';
import { Cbo } from '../AZ_common/cbo.model';
import { EcranMaitreDetail } from '../AZ_services/ecran_maitre_detail';
import { Bloc } from '../AZ_services/bloc';
import { TypeColEcran,ColonneEcran,ModifCol } from '../AZ_common/ecran.model';
import { ModalService } from '../AZ_modal/modal.service';

@Component({
  selector: 'app-adm-blocs',
  templateUrl: './adm_blocs.component.html'
})
@Injectable()
export class AdmBlocsComponent extends EcranMaitreDetail
{
	m_cbo_azecr: any=null;	// Cbo;
	m_cbo_aztype_bloc: any=null;	// Cbo;
	m_cbo_aztype_modif_champ: any=null;	// Cbo;
	m_id_azecr:number=0;
	m_num_bloc:number=0;
	m_nom_table:string='';
	m_nom_bloc:string='';
	m_lib_bloc:string='';
	m_id_aztype_bloc:number=0;
	m_hauteur_grille:number=0;
	m_sql_select:string='';
	m_sql_update:string='';
	m_cle_primaire:string='';
	constructor(public override  httpClient: HttpClient, public override formBuilder:UntypedFormBuilder,public override modalService:ModalService)
	{
		super(httpClient, formBuilder,modalService);
//console.log('Admblocs: constructor apres super');
		this.m_blocs=new Array(3);
		var cols=new Array(5);
		cols[0]=new ColonneEcran("id_azbloc","id_azbloc",TypeColEcran.ClePrimaire,false,ModifCol.NonModifiable,false,true,100);
		cols[1]=new ColonneEcran("Ecran","Ecran",TypeColEcran.Chaine,true,ModifCol.NonModifiable,false,true,80);
		cols[2]=new ColonneEcran("Numéro","Numéro",TypeColEcran.Entier,true,ModifCol.NonModifiable,false,true,80);
		cols[3]=new ColonneEcran("Nom_table","Table",TypeColEcran.Chaine,true,ModifCol.NonModifiable,false,true,200);
		cols[4]=new ColonneEcran("Type","Type",TypeColEcran.Chaine,true,ModifCol.NonModifiable,false,true,200);
		this.m_blocs[0]=new Bloc(httpClient,this,"azbloc_recherche","maitre","maitre","G",300,"exec AZbloc__recherche","","id_azbloc",cols);
		cols=new Array(14);
		cols[0]=new ColonneEcran("etat","etat",TypeColEcran.Chaine,false,ModifCol.NonModifiable,false,true,100);
		cols[1]=new ColonneEcran("id_azbloc","id_azbloc",TypeColEcran.ClePrimaire,false,ModifCol.NonModifiable,false,true,100);
		cols[2]=new ColonneEcran("id_azecr","id_azecr",TypeColEcran.CleEtrangere,true,ModifCol.Obligatoire,false,true,100);
		cols[3]=new ColonneEcran("id_azecrWITH","Ecran",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,100);
		cols[4]=new ColonneEcran("num_bloc","Numéro",TypeColEcran.Entier,true,ModifCol.Modifiable,true,true,100);
		cols[5]=new ColonneEcran("nom_table","Table",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,100);
		cols[6]=new ColonneEcran("nom_bloc","Nom",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,100);
		cols[7]=new ColonneEcran("lib_bloc","Libellé",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,100);
		cols[8]=new ColonneEcran("id_aztype_bloc","id_type_bloc",TypeColEcran.CleEtrangere,true,ModifCol.Obligatoire,false,true,100);
		cols[9]=new ColonneEcran("id_aztype_blocWITH","Type",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,100);
		cols[10]=new ColonneEcran("hauteur_grille","Hauteur",TypeColEcran.Entier,true,ModifCol.Modifiable,true,true,100);
		cols[11]=new ColonneEcran("sql_select","Requête Select",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,100);
		cols[12]=new ColonneEcran("sql_update","Requête update",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,100);
		cols[13]=new ColonneEcran("nom_cle_primaire","Clé primaire",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,100);
		this.m_blocs[1]=new Bloc(httpClient,this,"azbloc","azbloc","Bloc","F",300,"exec AZbloc__azblocSelect @id@","exec AZbloc__azblocMaj @etat@,@id_azbloc@,@id_azecr@,@num_bloc@,@nom_table@,@nom_bloc@,@lib_bloc@,@id_aztype_bloc@,@hauteur_grille@,@sql_select@,@sql_update@,@cle_primaire@","id_azbloc",cols);
//console.log('Admbloc: après insertion du bloc 1');
		cols=new Array(14);
		cols[0]=new ColonneEcran("etat","etat",TypeColEcran.Chaine,false,ModifCol.NonModifiable,false,true,100);
		cols[1]=new ColonneEcran("id_azbloc_champ","id_azbloc_champ",TypeColEcran.ClePrimaire,false,ModifCol.NonModifiable,false,true,100);
		cols[2]=new ColonneEcran("id_azbloc","id_azbloc",TypeColEcran.Entier,false,ModifCol.NonModifiable,false,true,100);
		cols[3]=new ColonneEcran("num_champ","Numéro",TypeColEcran.Entier,true,ModifCol.Modifiable,true,true,100);
		cols[4]=new ColonneEcran("nom_champ","Nom",TypeColEcran.Chaine,true,ModifCol.Modifiable,true,true,200);
		cols[5]=new ColonneEcran("lib_champ","Libellé",TypeColEcran.Chaine,true,ModifCol.Modifiable,true,true,200);
		cols[6]=new ColonneEcran("id_aztype_champ","Type",TypeColEcran.CleEtrangere,true,ModifCol.Modifiable,false,true,300);
		cols[7]=new ColonneEcran("id_aztype_champWITH","Type",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,100);
		cols[8]=new ColonneEcran("visible","Visible",TypeColEcran.Booleen,true,ModifCol.Modifiable,true,true,200);
		cols[9]=new ColonneEcran("id_aztype_modif_champ","Modifiable",TypeColEcran.CleEtrangere,true,ModifCol.Modifiable,true,true,200);
		cols[10]=new ColonneEcran("id_aztype_modif_champWITH","Modifiable",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,100);
		cols[11]=new ColonneEcran("inser_excel","Excel",TypeColEcran.Booleen,true,ModifCol.Modifiable,true,true,200);
		cols[12]=new ColonneEcran("inser_ecran","Ecran",TypeColEcran.Booleen,true,ModifCol.Modifiable,true,true,200);
		cols[13]=new ColonneEcran("lg_champ","largeur",TypeColEcran.Entier,true,ModifCol.Modifiable,true,true,100);
		this.m_blocs[2]=new Bloc(httpClient,this,"azbloc_champ","azbloc_champ","Champs","G",300,"exec AZbloc__azbloc_champSelect @id@","exec AZbloc__azbloc_champMaj @etat@,@id_azbloc_champ@,@id_azbloc@,@num_champ@,@nom_champ@,@lib_champ@,@id_aztype_champ@,@visible@,@id_aztype_modif_champ@,@inser_excel@,@inser_ecran@,@lg_champ@","id_azbloc_champ",cols);
//console.log('Admbloc: après insertion du bloc 2');
		this.formRecherche=this.formBuilder.group({ m_filtre_ecr:0});
		this.formOngletPrincipal=this.formBuilder.group({m_id_azecr:0,m_num_bloc:'',m_nom_table: '',m_nom_bloc:'',m_lib_bloc: '',m_id_aztype_bloc:0,m_hauteur_grille:0, m_sql_select:'',m_sql_update:'',m_nom_cle_primaire:''});
		this.m_nom_cle_maitre="id_azbloc";
		this.m_tab_col_nom_fic=["Nom"];
		this.m_classe_boutons=new Array(this.m_blocs.length);
//console.log('Admbloc: fin de constructor');
	}
	ngOnInit(): void
	{
//console.log('AdmBlocsComponent.ngOnInit');
		this.m_cbo_azecr=new Cbo(this.httpClient,'AZecr');
		this.m_cbo_azecr.GenererListeStd().then((res:string)=>{},(err: string)=>{console.log(err);this.MessageErreur(err);});
//console.log('avant init_cbo(AZtype_bloc');
		this.m_cbo_aztype_bloc=new Cbo(this.httpClient,'AZtype_bloc');
//console.log('apres init_cbo(AZtype_bloc');
//console.log(this.m_cbo_aztype_bloc);
		this.m_cbo_aztype_bloc.GenererListeStd().then((res:string)=>{},(err: string)=>{console.log(err);this.MessageErreur(err);});
//console.log('apres genererliste(AZtype_bloc');
//console.log('avant init_cbo(AZtype_modif_champ');
		this.m_cbo_aztype_modif_champ=new Cbo(this.httpClient,'AZtype_modif_champ');
//console.log('apres init_cbo(AZtype_modif_champ');
//console.log(this.m_cbo_aztype_modif_champ);
		this.m_cbo_aztype_modif_champ.GenererListeStd().then((res:string)=>{},(err: string)=>{console.log(err);this.MessageErreur(err);});
//console.log('apres genererliste(AZtype_modif_champ');
//console.log('Admblocs avant appel de InitcolDefs');
		this.InitColDefs();
//console.log('Admblocs apres appel de InitcolDefs');
		this.Init();
//console.log('Admblocs apres appel de Init');
		this.m_grid_options_maitre.columnDefs=this.m_blocs[0].m_coldefs;
//		this.InitSplitter('splitter_loge');
	}
	override RequeteRecherche():string
	{
		var id_ecr: any;
		id_ecr=this.formRecherche.get('m_filtre_ecr').value;
//	console.log('type de id_obed='+id_obed.constructor.name);
		if(id_ecr.constructor.name != 'String' ||id_ecr=="0")
			id_ecr="null";
		var req_sql_maitre="exec AZbloc__recherche @id_prs_login@,@id_ecr@";
		var req_sql=req_sql_maitre.replace('@id_ecr@',''+id_ecr);
		return req_sql;
	}
	override onViderCriteres()
	{
		this.formRecherche.get('m_filtre_ecr').setValue(0);
		this.ReinitialiserCompteur();
	}
	/*
	override RequetePourRecupererIdOngletPrincipal()
	{
		var nom_bloc=this.formOngletPrincipal.get('m_nom_loge').value;
		var sql:string="select id_loge from loge where nom_loge="+this.PreparerChainePourSql(nom_loge);
		return sql;
	}
	*/
}
