import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UntypedFormBuilder } from '@angular/forms';
import { Cbo } from '../AZ_common/cbo.model';
import { EcranMaitreDetail } from '../AZ_services/ecran_maitre_detail';
import { Bloc } from '../AZ_services/bloc';
import { TypeColEcran,ColonneEcran,ModifCol } from '../AZ_common/ecran.model';
import { ModalService } from '../AZ_modal/modal.service';

@Component({
  selector: 'app-loges',
  templateUrl: './loges.component.html'
})
@Injectable()
export class LogesComponent extends EcranMaitreDetail
{
	m_cbo_obeds: any=null;	// Cbo;
	m_cbo_orients: any=null;	// Cbo;
	m_cbo_type_loge: any=null;	// Cbo;
	m_cbo_rite: any=null;	// Cbo;
	m_cbo_terr: any=null;	// Cbo;
	m_cbo_temple: any=null; // Cbo;
	m_code_loge:string='';
	m_nom_loge:string='';
	m_id_obed:number=0;
	m_id_orient:number=0;
	m_id_type_loge:number=0;
	m_num_loge:number=0;
	m_id_rite:number=0;
	m_id_ter:number=0;
	m_id_temple:number=0;
	m_num_rna:string='';
	m_active:number=0;
	constructor(public override  httpClient: HttpClient, public override formBuilder:UntypedFormBuilder,public override modalService:ModalService)
	{
		super(httpClient, formBuilder,modalService);
console.log('loges: constructor apres super');
		this.m_blocs=new Array(7);
		var cols=new Array(7);
		cols[0]=new ColonneEcran("id_loge","id_loge",TypeColEcran.ClePrimaire,false,ModifCol.NonModifiable,false,true,100);
		cols[1]=new ColonneEcran("Code","Code",TypeColEcran.Chaine,true,ModifCol.NonModifiable,false,true,80);
		cols[2]=new ColonneEcran("Nom","Nom",TypeColEcran.Chaine,true,ModifCol.NonModifiable,false,true,200);
		cols[3]=new ColonneEcran("Obédience","Obédience",TypeColEcran.Chaine,true,ModifCol.NonModifiable,false,true,100);
		cols[4]=new ColonneEcran("Orient","Orient",TypeColEcran.Chaine,true,ModifCol.NonModifiable,false,true,160);
		cols[5]=new ColonneEcran("Numéro","Numéro",TypeColEcran.Entier,true,ModifCol.NonModifiable,false,true,80);
		cols[6]=new ColonneEcran("Type","Type",TypeColEcran.Chaine,true,ModifCol.NonModifiable,false,true,200);
		this.m_blocs[0]=new Bloc(httpClient,this,"loge_recherche","maitre","maitre","G",300,"exec AZloge__recherche","","id_loge",cols);
		cols=new Array(19);
		cols[0]=new ColonneEcran("etat","etat",TypeColEcran.Chaine,false,ModifCol.NonModifiable,false,true,100);
		cols[1]=new ColonneEcran("id_loge","id_loge",TypeColEcran.ClePrimaire,false,ModifCol.NonModifiable,false,true,100);
		cols[2]=new ColonneEcran("code_loge","Code",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,100);
		cols[3]=new ColonneEcran("nom_loge","Nom",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,100);
		cols[4]=new ColonneEcran("id_obed","id_obed",TypeColEcran.CleEtrangere,true,ModifCol.Obligatoire,false,true,100);
		cols[5]=new ColonneEcran("id_obedWITH","Obédience",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,100);
		cols[6]=new ColonneEcran("id_orient","id_orient",TypeColEcran.CleEtrangere,true,ModifCol.Obligatoire,false,true,100);
		cols[7]=new ColonneEcran("id_orientWITH","Orient",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,100);
		cols[8]=new ColonneEcran("id_type_loge","id_type_loge",TypeColEcran.CleEtrangere,true,ModifCol.Obligatoire,false,true,100);
		cols[9]=new ColonneEcran("id_type_logeWITH","Type",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,100);
		cols[10]=new ColonneEcran("num_loge","Numéro",TypeColEcran.Entier,true,ModifCol.Modifiable,true,true,100);
		cols[11]=new ColonneEcran("id_rite","id_rite",TypeColEcran.CleEtrangere,true,ModifCol.Modifiable,false,true,100);
		cols[12]=new ColonneEcran("id_riteWITH","Rite",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,100);
		cols[13]=new ColonneEcran("id_terr","id_terr",TypeColEcran.CleEtrangere,true,ModifCol.Modifiable,false,true,100);
		cols[14]=new ColonneEcran("id_terrWITH","Territoire",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,100);
		cols[15]=new ColonneEcran("id_temple","id_temple",TypeColEcran.CleEtrangere,true,ModifCol.Modifiable,false,true,100);
		cols[16]=new ColonneEcran("id_templeWITH","Temple",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,100);
		cols[17]=new ColonneEcran("num_rna","RNA",TypeColEcran.Chaine,true,ModifCol.Modifiable,true,true,100);
		cols[18]=new ColonneEcran("active","Active",TypeColEcran.Booleen,true,ModifCol.Modifiable,true,true,100);
		this.m_blocs[1]=new Bloc(httpClient,this,"loge","loge","Loge","F",300,"exec AZloge__logeSelect @id@","exec AZloge__logeMaj @etat@,@id_loge@,@code_loge@,@nom_loge@,@id_obed@,@id_orient@,@id_type_loge@,@num_loge@,@id_rite@,@id_terr@,@id_temple@,@num_rna@,@active@","id_loge",cols);
		cols=new Array(8);
		cols[0]=new ColonneEcran("etat","etat",TypeColEcran.Chaine,false,ModifCol.NonModifiable,false,true,100);
		cols[1]=new ColonneEcran("id_loge_prs","id_loge_prs",TypeColEcran.ClePrimaire,false,ModifCol.NonModifiable,false,true,100);
		cols[2]=new ColonneEcran("id_loge","id_loge",TypeColEcran.Entier,false,ModifCol.NonModifiable,false,true,100);
		cols[3]=new ColonneEcran("id_prs","Membre",TypeColEcran.CleEtrangere,true,ModifCol.Modifiable,false,true,300);
		cols[4]=new ColonneEcran("id_prsWITH","Membre",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,100);
		cols[5]=new ColonneEcran("nom_deg","Degré",TypeColEcran.Chaine,true,ModifCol.NonModifiable,true,true,200);
		cols[6]=new ColonneEcran("ad_elec","Mail",TypeColEcran.Chaine,true,ModifCol.NonModifiable,true,true,300);
		cols[7]=new ColonneEcran("id_villeWITH","Ville",TypeColEcran.Chaine,true,ModifCol.NonModifiable,true,true,300);
		this.m_blocs[2]=new Bloc(httpClient,this,"loge_prs","membres","Membres","G",300,"exec AZloge__prsSelect @id@","exec AZloge__prsMaj @etat@,@id_loge_prs@,@id_loge@,@id_prs@","id_loge_prs",cols);
		cols=new Array(12);
		cols[0]=new ColonneEcran("etat","etat",TypeColEcran.Chaine,false,ModifCol.NonModifiable,false,true,100);
		cols[1]=new ColonneEcran("id_loge_tenue","id_loge_tenue",TypeColEcran.ClePrimaire,false,ModifCol.NonModifiable,false,true,100);
		cols[2]=new ColonneEcran("id_loge","id_loge",TypeColEcran.Entier,false,ModifCol.NonModifiable,false,true,100);
		cols[3]=new ColonneEcran("id_type_tenue","Degré",TypeColEcran.CleEtrangere,true,ModifCol.Obligatoire,false,true,180);
		cols[4]=new ColonneEcran("id_type_tenueWITH","Degré",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,100);
		cols[5]=new ColonneEcran("date_tenue","Date",TypeColEcran.Date,true,ModifCol.Obligatoire,true,true,120);
		cols[6]=new ColonneEcran("id_cerem","Cérémonie",TypeColEcran.CleEtrangere,true,ModifCol.Modifiable,false,true,200);
		cols[7]=new ColonneEcran("id_ceremWITH","Cérémonie",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,100);
		cols[8]=new ColonneEcran("lib_tenue","Libellé",TypeColEcran.Chaine,true,ModifCol.Modifiable,true,true,200);
		cols[9]=new ColonneEcran("liste_prs","Membres",TypeColEcran.Chaine,true,ModifCol.NonModifiable,true,true,300);
		cols[10]=new ColonneEcran("voir_doc_fs","Tracé",TypeColEcran.VoirDocFs,true,ModifCol.NonModifiable,false,true,90);
		cols[11]=new ColonneEcran("def_doc_fs","",TypeColEcran.DefDocFs,true,ModifCol.NonModifiable,false,true,140);
		this.m_blocs[3]=new Bloc(httpClient,this,"loge_tenue","tenues","Tenues","G",300,"exec AZloge__loge_tenueSelect @id@","exec AZloge__loge_tenueMaj @etat@,@id_loge_tenue@,@id_loge@,@id_type_tenue@,@date_tenue@,@id_cerem@,@lib_tenue@","id_loge_tenue",cols);
		cols=new Array(7);
		cols[0]=new ColonneEcran("etat","etat",TypeColEcran.Chaine,false,ModifCol.NonModifiable,false,true,100);
		cols[1]=new ColonneEcran("id_prs_off","id_prs_off",TypeColEcran.ClePrimaire,false,ModifCol.NonModifiable,false,true,100);
		cols[2]=new ColonneEcran("id_loge","id_loge",TypeColEcran.Entier,false,ModifCol.NonModifiable,false,true,100);
		cols[3]=new ColonneEcran("id_type_off","Office",TypeColEcran.CleEtrangere,true,ModifCol.NonModifiable,false,true,270);
		cols[4]=new ColonneEcran("id_type_offWITH","Office",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,100);
		cols[5]=new ColonneEcran("id_prs","Membre",TypeColEcran.CleEtrangere,true,ModifCol.NonModifiable,false,true,300);
		cols[6]=new ColonneEcran("id_prsWITH","Membre",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,100);
		this.m_blocs[4]=new Bloc(httpClient,this,"loge__prs_off","offices","Collège","G",300,"exec AZloge__prs_offSelect @id@","","id_loge_prs_off",cols);
		cols=new Array(11);
		cols[0]=new ColonneEcran("etat","etat",TypeColEcran.Chaine,false,ModifCol.NonModifiable,false,true,100);
		cols[1]=new ColonneEcran("id_prs_off__ancien","id_prs_off__ancien",TypeColEcran.ClePrimaire,false,ModifCol.NonModifiable,false,true,100);
		cols[2]=new ColonneEcran("id_loge","id_loge",TypeColEcran.Entier,false,ModifCol.NonModifiable,false,true,100);
		cols[3]=new ColonneEcran("id_type_off","Office",TypeColEcran.CleEtrangere,true,ModifCol.NonModifiable,false,true,270);
		cols[4]=new ColonneEcran("id_type_offWITH","Office",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,100);
		cols[5]=new ColonneEcran("id_prs","Membre",TypeColEcran.CleEtrangere,true,ModifCol.NonModifiable,false,true,300);
		cols[6]=new ColonneEcran("id_prsWITH","Membre",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,100);
		cols[7]=new ColonneEcran("id_loge_tenue_deb","Début",TypeColEcran.CleEtrangere,true,ModifCol.NonModifiable,false,true,120);
		cols[8]=new ColonneEcran("id_loge_tenue_debWITH","Début",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,100);
		cols[9]=new ColonneEcran("id_loge_tenue_fin","Fin",TypeColEcran.CleEtrangere,true,ModifCol.NonModifiable,false,true,120);
		cols[10]=new ColonneEcran("id_loge_tenue_finWITH","Fin",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,100);
		this.m_blocs[5]=new Bloc(httpClient,this,"loge__prs_off_ancien","offices_anciens","Collèges anciens","G",300,"exec AZloge__prs_off__ancienSelect @id@","","id_prs_off_ancien",cols);
		cols=new Array(14);
		cols[0]=new ColonneEcran("etat","etat",TypeColEcran.Chaine,false,ModifCol.NonModifiable,false,true,100);
		cols[1]=new ColonneEcran("id_loge_doc","id_loge_doc",TypeColEcran.ClePrimaire,false,ModifCol.NonModifiable,false,true,100);
		cols[2]=new ColonneEcran("id_loge","id_loge",TypeColEcran.Entier,false,ModifCol.NonModifiable,false,true,100);
		cols[3]=new ColonneEcran("id_type_doc","Type",TypeColEcran.CleEtrangere,true,ModifCol.Obligatoire,false,true,100);
		cols[4]=new ColonneEcran("id_type_docWITH","Type",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,100);
		cols[5]=new ColonneEcran("voir_doc_db","",TypeColEcran.VoirDocDb,false,ModifCol.NonModifiable,false,true,100);
		cols[6]=new ColonneEcran("def_doc_db","",TypeColEcran.DefDocDb,false,ModifCol.NonModifiable,false,true,100);
		cols[7]=new ColonneEcran("voir_doc_fs","",TypeColEcran.VoirDocFs,true,ModifCol.NonModifiable,false,true,90);
		cols[8]=new ColonneEcran("def_doc_fs","",TypeColEcran.DefDocFs,true,ModifCol.NonModifiable,false,true,140);
		cols[9]=new ColonneEcran("nom_doc","Nom",TypeColEcran.Chaine,true,ModifCol.Modifiable,true,true,100);
		cols[10]=new ColonneEcran("lib_doc","Libellé",TypeColEcran.Chaine,true,ModifCol.Modifiable,true,true,100);
		cols[11]=new ColonneEcran("date_doc","Date",TypeColEcran.Date,true,ModifCol.Modifiable,true,true,100);
		cols[12]=new ColonneEcran("id_type_fic","Type de fichier",TypeColEcran.CleEtrangere,true,ModifCol.Modifiable,false,true,100);
		cols[13]=new ColonneEcran("id_type_ficWITH","Type de fichier",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,true,100);
		this.m_blocs[6]=new Bloc(httpClient,this,"loge_doc","documents","Documents","G",300,"exec AZloge__loge_docSelect @id@","exec AZloge__loge_docMaj @etat@,@id_loge_doc@,@id_loge@,@nom_doc@,@lib_doc@,@date_doc@,@id_type_doc@,@id_type_fic@","id_loge_doc",cols);
		this.formRecherche=this.formBuilder.group({ m_filtre_nom_loge: '',m_filtre_obed:0,m_filtre_terr:0,m_filtre_orient:0,m_filtre_type_loge:0, m_filtre_actif: true});
		this.formOngletPrincipal=this.formBuilder.group({m_code_loge:'',m_nom_loge: '',m_id_obed:0,m_id_orient:0, m_id_type_loge:0,m_num_loge:'',m_id_rite:0,m_id_terr:0,m_id_temple:0,m_num_rna:'',m_active:0});
		this.m_nom_cle_maitre="id_loge";
		this.m_tab_col_nom_fic=["Nom"];
		this.m_classe_boutons=new Array(this.m_blocs.length);
	}
	ngOnInit(): void
	{
		this.m_cbo_obeds=new Cbo(this.httpClient,'obed');
		this.m_cbo_obeds.GenererListeStd().then((res:string)=>{},(err: string)=>{this.MessageErreur(err);});
		this.m_cbo_orients=new Cbo(this.httpClient,'orient');
		this.m_cbo_orients.GenererListeStd().then((res:string)=>{},(err: string)=>{this.MessageErreur(err);});
		this.m_cbo_type_loge=new Cbo(this.httpClient,'type_loge');
		this.m_cbo_type_loge.GenererListeStd().then((res:string)=>{},(err: string)=>{this.MessageErreur(err);});
		this.m_cbo_rite=new Cbo(this.httpClient,'rite');
		this.m_cbo_rite.GenererListeStd().then((res:string)=>{},(err: string)=>{this.MessageErreur(err);});
		this.m_cbo_terr=new Cbo(this.httpClient,'terr');
		this.m_cbo_terr.GenererListeStd().then((res:string)=>{},(err: string)=>{this.MessageErreur(err);});
		this.m_cbo_temple=new Cbo(this.httpClient,'temple');
		this.m_cbo_temple.GenererListeStd().then((res:string)=>{},(err: string)=>{this.MessageErreur(err);});
		this.InitColDefs();
		this.Init();
		this.m_grid_options_maitre.columnDefs=this.m_blocs[0].m_coldefs;
//		this.InitSplitter('splitter_loge');
	}
	override RequeteRecherche():string
	{
		var nom_loge=this.formRecherche.get('m_filtre_nom_loge').value;
		if(nom_loge.length==0)
			nom_loge="null";
		else
			nom_loge=this.PreparerChainePourSql(nom_loge);
		var id_obed: any;
		id_obed=this.formRecherche.get('m_filtre_obed').value;
//	console.log('type de id_obed='+id_obed.constructor.name);
		if(id_obed.constructor.name != 'String' ||id_obed=="0")
			id_obed="null";
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
//		this.VoirMaitre(nom_loge,id_obed, id_orient);
		var id_type_loge: any;
		id_type_loge=this.formRecherche.get('m_filtre_type_loge').value;
//	console.log('type de id_deg_bl='+id_deg_bl.constructor.name);
		if(id_type_loge.constructor.name != 'String' ||id_type_loge=="0")
			id_type_loge="null";
		var actif=this.formRecherche.get('m_filtre_actif').value;
		var req_sql_maitre="exec AZloge__recherche @id_prs_login@,@nom_loge@,@id_obed@,@id_terr@,@id_orient@,@id_type_loge@,@actif@";
		var req_sql=req_sql_maitre.replace("@nom_loge@",nom_loge).replace('@id_obed@',''+id_obed).replace('@id_terr@',''+id_terr).replace('@id_orient@',''+id_orient).replace('@id_type_loge@',''+id_type_loge).replace('@actif@',""+actif);
		return req_sql;
	}
	override onViderCriteres()
	{
		this.formRecherche.get('m_filtre_nom_loge').setValue("");
		this.formRecherche.get('m_filtre_obed').setValue(0);
		this.formRecherche.get('m_filtre_terr').setValue(0);
		this.formRecherche.get('m_filtre_orient').setValue(0);
		this.formRecherche.get('m_filtre_type_loge').setValue(0);
		this.formRecherche.get('m_filtre_actif').setValue(false);
		this.ReinitialiserCompteur();
	}
	/*
	ViderOngletPrincipal()
	{
console.log('loges.component.ViderOngletPrincipal');
		this.formOngletPrincipal.get('m_code_loge').setValue("");
		this.formOngletPrincipal.get('m_nom_loge').setValue("");
		this.formOngletPrincipal.get('m_id_obed').setValue(0);
		this.formOngletPrincipal.get('m_id_orient').setValue(0);
		this.formOngletPrincipal.get('m_id_type_loge').setValue(0);
		this.formOngletPrincipal.get('m_num_loge').setValue(0);
		this.formOngletPrincipal.get('m_id_rite').setValue(0);
		this.formOngletPrincipal.get('m_id_terr').setValue(0);
		this.formOngletPrincipal.get('m_id_temple').setValue(0);
		this.formOngletPrincipal.get('m_num_rna').setValue("");
		this.formOngletPrincipal.get('m_active').setValue(0);
	}
	*/
	override RequetePourRecupererIdOngletPrincipal()
	{
		var nom_loge=this.formOngletPrincipal.get('m_nom_loge').value;
		var sql:string="select id_loge from loge where nom_loge="+this.PreparerChainePourSql(nom_loge);
		return sql;
	}
}
