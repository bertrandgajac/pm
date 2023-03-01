import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UntypedFormBuilder } from '@angular/forms';
//import { Cbo } from '../common/cbo.model';
import { EcranGrille } from '../AZ_services/ecran_grille';
import { Bloc } from '../AZ_services/bloc';
import { TypeColEcran,ColonneEcran,ModifCol } from '../AZ_common/ecran.model';
import { ModalService } from '../AZ_modal/modal.service';
import { ActivatedRoute } from '@angular/router';
import { Cbo } from '../AZ_common/cbo.model';

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html'
})
@Injectable()
export class ReferencesComponent extends EcranGrille
{
	public m_nom_tab:string='';
	/*
	m_cbo_deg: Cbo;
	m_cbo_type_loge: Cbo;
	m_cbo_rite: Cbo;
	m_cbo_ville: Cbo;
	m_cbo_initialisee:boolean=false;
	*/
	constructor(public override httpClient: HttpClient, public override formBuilder:UntypedFormBuilder, public override modalService: ModalService,public activatedRoute:ActivatedRoute)
	{
//console.log('references: début du constructeur');
		super(httpClient,formBuilder,modalService);
		this.m_blocs=new Array(14);
		var cols=new Array(5);
		cols[0]=new ColonneEcran("etat","etat",TypeColEcran.Chaine,false,ModifCol.NonModifiable,false,true,100);
		cols[1]=new ColonneEcran("id_cerem","id_cerem",TypeColEcran.ClePrimaire,false,ModifCol.NonModifiable,false,true,100);
		cols[2]=new ColonneEcran("nom_cerem","Nom",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,250);
		cols[3]=new ColonneEcran("lib_cerem","Libellé",TypeColEcran.Chaine,true,ModifCol.Modifiable,true,true,250);
		cols[4]=new ColonneEcran("dep","Dépendances",TypeColEcran.Dependances,true,ModifCol.Modifiable,false,true,250);
		this.m_blocs[0]=new Bloc(this.httpClient,this,"cerem","cerem","Cérémonies","G",500,"exec AZceremSelect","exec AZceremMaj @etat@,@id_cerem@,@nom_cerem@,@lib_cerem@","id_cerem",cols);
		cols=new Array(8);
		cols[0]=new ColonneEcran("etat","etat",TypeColEcran.Chaine,false,ModifCol.NonModifiable,false,true,100);
		cols[1]=new ColonneEcran("id_deg","id_deg",TypeColEcran.ClePrimaire,false,ModifCol.NonModifiable,false,true,80);
		cols[2]=new ColonneEcran("code_deg","Code",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,100);
		cols[3]=new ColonneEcran("nom_deg","Nom",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,200);
		cols[4]=new ColonneEcran("lib_deg","Libellé",TypeColEcran.Chaine,true,ModifCol.Modifiable,true,true,200);
		cols[5]=new ColonneEcran("num_deg","Numéro",TypeColEcran.Entier,true,ModifCol.Modifiable,true,true,80);
		cols[6]=new ColonneEcran("avancement","Avancement",TypeColEcran.Booleen,true,ModifCol.Obligatoire,true,true,80);
		cols[7]=new ColonneEcran("dep","Dépendances",TypeColEcran.Dependances,true,ModifCol.Modifiable,false,true,250);
		this.m_blocs[1]=new Bloc(this.httpClient,this,"deg","deg","Degrés","G",500,"exec AZdegSelect","exec AZdegMaj @etat@,@id_deg@,@code_deg@,@nom_deg@,@lib_deg@,@num_deg@,@avancement@","id_deg",cols);
		cols=new Array(5);
		cols[0]=new ColonneEcran("etat","etat",TypeColEcran.Chaine,false,ModifCol.NonModifiable,false,true,100);
		cols[1]=new ColonneEcran("id_etat_prs","id_etat_prs",TypeColEcran.ClePrimaire,false,ModifCol.NonModifiable,false,true,100);
		cols[2]=new ColonneEcran("nom_etat_prs","Nom",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,200);
		cols[3]=new ColonneEcran("actif","Actif",TypeColEcran.Booleen,true,ModifCol.Obligatoire,true,true,80);
		cols[4]=new ColonneEcran("dep","Dépendances",TypeColEcran.Dependances,true,ModifCol.Modifiable,false,true,250);
		this.m_blocs[2]=new Bloc(this.httpClient,this,"etat_prs","etat_prs","Statuts","G",500,"exec AZetat_prsSelect","exec AZetat_prsMaj @etat@,@id_etat_prs@,@nom_etat_prs@,@actif@","id_etat_prs",cols);
		cols=new Array(5);
		cols[0]=new ColonneEcran("etat","etat",TypeColEcran.Chaine,false,ModifCol.NonModifiable,false,true,100);
		cols[1]=new ColonneEcran("id_obed","id_obed",TypeColEcran.ClePrimaire,false,ModifCol.NonModifiable,false,true,100);
		cols[2]=new ColonneEcran("nom_obed","Nom",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,100);
		cols[3]=new ColonneEcran("lib_obed","Libellé",TypeColEcran.Chaine,true,ModifCol.Modifiable,true,true,300);
		cols[4]=new ColonneEcran("dep","Dépendances",TypeColEcran.Dependances,true,ModifCol.Modifiable,false,true,250);
		this.m_blocs[3]=new Bloc(this.httpClient,this,"obed","obed","Obédiences","G",500,"exec AZobedSelect","exec AZobedMaj @etat@,@id_obed@,@nom_obed@,@lib_obed@","id_obed",cols);
		cols=new Array(6);
		cols[0]=new ColonneEcran("etat","etat",TypeColEcran.Chaine,false,ModifCol.NonModifiable,false,true,100);
		cols[1]=new ColonneEcran("id_orient","id_orient",TypeColEcran.ClePrimaire,false,ModifCol.NonModifiable,false,true,100);
		cols[2]=new ColonneEcran("nom_orient","Nom",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,300);
		cols[3]=new ColonneEcran("lat","Latitude",TypeColEcran.Flottant,true,ModifCol.Modifiable,true,true,100);
		cols[4]=new ColonneEcran("lon","Longitude",TypeColEcran.Flottant,true,ModifCol.Modifiable,true,true,100);
		cols[5]=new ColonneEcran("dep","Dépendances",TypeColEcran.Dependances,true,ModifCol.Modifiable,false,true,250);
		this.m_blocs[4]=new Bloc(this.httpClient,this,"orient","orient","Orients","G",500,"exec AZorientSelect","exec AZorientMaj @etat@,@id_orient@,@nom_orient@,@lat@,@lon@","id_orient",cols);
		cols=new Array(5);
		cols[0]=new ColonneEcran("etat","etat",TypeColEcran.Chaine,false,ModifCol.NonModifiable,false,true,100);
		cols[1]=new ColonneEcran("id_rite","id_rite",TypeColEcran.ClePrimaire,false,ModifCol.NonModifiable,false,true,100);
		cols[2]=new ColonneEcran("nom_rite","Nom",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,300);
		cols[3]=new ColonneEcran("lib_rite","Libellé",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,400);
		cols[4]=new ColonneEcran("dep","Dépendances",TypeColEcran.Dependances,true,ModifCol.Modifiable,false,true,250);
		this.m_blocs[5]=new Bloc(this.httpClient,this,"rite","rite","Rites","G",500,"exec AZriteSelect","exec AZriteMaj @etat@,@id_rite@,@nom_rite@,@lib_rite@","id_rite",cols);
		cols=new Array(12);
		cols[0]=new ColonneEcran("etat","etat",TypeColEcran.Chaine,false,ModifCol.NonModifiable,false,true,100);
		cols[1]=new ColonneEcran("id_temple","id_temple",TypeColEcran.ClePrimaire,false,ModifCol.NonModifiable,false,true,100);
		cols[2]=new ColonneEcran("nom_temple","Nom",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,300);
		cols[3]=new ColonneEcran("lib_temple","Libellé",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,200);
		cols[4]=new ColonneEcran("id_ville","Ville",TypeColEcran.CleEtrangere,true,ModifCol.Modifiable,false,true,200);
		cols[5]=new ColonneEcran("id_villeWITH","Ville",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,200);
		cols[6]=new ColonneEcran("id_terr","Territoire",TypeColEcran.CleEtrangere,true,ModifCol.Modifiable,false,true,200);
		cols[7]=new ColonneEcran("id_terrWITH","Territoire",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,200);
		cols[8]=new ColonneEcran("adr_temple","Adresse",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,400);
		cols[9]=new ColonneEcran("lat","Latitude",TypeColEcran.Flottant,true,ModifCol.Modifiable,true,true,100);
		cols[10]=new ColonneEcran("lon","Longitude",TypeColEcran.Flottant,true,ModifCol.Modifiable,true,true,100);
		cols[11]=new ColonneEcran("dep","Dépendances",TypeColEcran.Dependances,true,ModifCol.Modifiable,false,true,250);
		this.m_blocs[6]=new Bloc(this.httpClient,this,"temple","temple","Temples","G",500,"exec AZtempleSelect","exec AZtempleMaj @etat@,@id_temple@,@nom_temple@,@lib_temple@,@adr_temple@,@id_ville@,@id_terr@,@lat@,@lon@","id_temple",cols);
		cols=new Array(8);
		cols[0]=new ColonneEcran("etat","etat",TypeColEcran.Chaine,false,ModifCol.NonModifiable,false,true,100);
		cols[1]=new ColonneEcran("id_terr","id_terr",TypeColEcran.ClePrimaire,false,ModifCol.NonModifiable,false,true,100);
		cols[2]=new ColonneEcran("nom_terr","Nom",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,100);
		cols[3]=new ColonneEcran("lib_terr","Libellé",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,400);
		cols[4]=new ColonneEcran("lat","Latitude",TypeColEcran.Flottant,true,ModifCol.Modifiable,true,true,100);
		cols[5]=new ColonneEcran("lon","Longitude",TypeColEcran.Flottant,true,ModifCol.Modifiable,true,true,100);
		cols[6]=new ColonneEcran("zoom","Zoom",TypeColEcran.Entier,true,ModifCol.Modifiable,true,true,100);
		cols[7]=new ColonneEcran("dep","Dépendances",TypeColEcran.Dependances,true,ModifCol.Modifiable,false,true,250);
		this.m_blocs[7]=new Bloc(this.httpClient,this,"terr","terr","Territoires","G",500,"exec AZterrSelect","exec AZterrMaj @etat@,@id_terr@,@nom_terr@,@lib_terr@,@lat@,@lon@,@zoom@","id_terr",cols);
		cols=new Array(7);
		cols[0]=new ColonneEcran("etat","etat",TypeColEcran.Chaine,false,ModifCol.NonModifiable,false,true,100);
		cols[1]=new ColonneEcran("id_type_doc","id_type_doc",TypeColEcran.ClePrimaire,false,ModifCol.NonModifiable,false,true,100);
		cols[2]=new ColonneEcran("code_type_doc","Code",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,150);
		cols[3]=new ColonneEcran("nom_type_doc","Nom",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,300);
		cols[4]=new ColonneEcran("lib_type_doc","Libellé",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,400);
		cols[5]=new ColonneEcran("num_doc","Numéro",TypeColEcran.Entier,true,ModifCol.Modifiable,true,true,200);
		cols[6]=new ColonneEcran("dep","Dépendances",TypeColEcran.Dependances,true,ModifCol.Modifiable,false,true,250);
		this.m_blocs[8]=new Bloc(this.httpClient,this,"type_doc","type_doc","Type de document","G",500,"exec AZtype_docSelect","exec AZtype_docMaj @etat@,@id_type_doc@,@code_type_doc@,@nom_type_doc@,@lib_type_doc@,@num_doc@","id_type_doc",cols);
		cols=new Array(6);
		cols[0]=new ColonneEcran("etat","etat",TypeColEcran.Chaine,false,ModifCol.NonModifiable,false,true,100);
		cols[1]=new ColonneEcran("id_type_fic","id_type_fic",TypeColEcran.ClePrimaire,false,ModifCol.NonModifiable,false,true,100);
		cols[2]=new ColonneEcran("code_type_fic","Code",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,300);
		cols[3]=new ColonneEcran("nom_type_fic","Nom",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,300);
		cols[4]=new ColonneEcran("lib_type_fic","Libellé",TypeColEcran.Chaine,true,ModifCol.Modifiable,true,true,400);
		cols[5]=new ColonneEcran("dep","Dépendances",TypeColEcran.Dependances,true,ModifCol.Modifiable,false,true,250);
		this.m_blocs[9]=new Bloc(this.httpClient,this,"type_fic","type_fic","Type de fichier","G",500,"exec AZtype_ficSelect","exec AZtype_ficMaj @etat@,@id_type_fic@,@code_type_fic@,@nom_type_fic@,@lib_type_fic@","id_type_fic",cols);
		cols=new Array(7);
		cols[0]=new ColonneEcran("etat","etat",TypeColEcran.Chaine,false,ModifCol.NonModifiable,false,true,100);
		cols[1]=new ColonneEcran("id_type_loge","id_type_loge",TypeColEcran.ClePrimaire,false,ModifCol.NonModifiable,false,true,100);
		cols[2]=new ColonneEcran("nom_type_loge","Nom",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,300);
		cols[3]=new ColonneEcran("lib_type_loge","Libellé",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,400);
		cols[4]=new ColonneEcran("id_deg","Degré",TypeColEcran.CleEtrangere,true,ModifCol.Obligatoire,true,true,300);
		cols[5]=new ColonneEcran("id_degWITH","Degré",TypeColEcran.Chaine,false,ModifCol.Obligatoire,true,true,300);
		cols[6]=new ColonneEcran("dep","Dépendances",TypeColEcran.Dependances,true,ModifCol.Modifiable,false,true,250);
		this.m_blocs[10]=new Bloc(this.httpClient,this,"type_loge","type_loge","Type de loge","G",500,"exec AZtype_logeSelect","exec AZtype_logeMaj @etat@,@id_type_loge@,@nom_type_loge@,@lib_type_loge@,@id_deg@","id_type_loge",cols);
		cols=new Array(10);
		cols[0]=new ColonneEcran("etat","etat",TypeColEcran.Chaine,false,ModifCol.NonModifiable,false,true,100);
		cols[1]=new ColonneEcran("id_type_off","id_type_off",TypeColEcran.ClePrimaire,false,ModifCol.NonModifiable,false,true,100);
		cols[2]=new ColonneEcran("code_type_off","Code",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,100);
		cols[3]=new ColonneEcran("nom_type_off","Nom",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,300);
		cols[4]=new ColonneEcran("num_off","Numéro",TypeColEcran.Entier,true,ModifCol.Modifiable,true,true,200);
		cols[5]=new ColonneEcran("id_type_loge","Degré",TypeColEcran.CleEtrangere,true,ModifCol.Modifiable,false,true,200);
		cols[6]=new ColonneEcran("id_type_logeWITH","Degré",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,200);
		cols[7]=new ColonneEcran("id_rite","Rite",TypeColEcran.CleEtrangere,true,ModifCol.Modifiable,false,true,200);
		cols[8]=new ColonneEcran("id_riteWITH","Degré",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,200);
		cols[9]=new ColonneEcran("dep","Dépendances",TypeColEcran.Dependances,true,ModifCol.Modifiable,false,true,250);
		this.m_blocs[11]=new Bloc(this.httpClient,this,"type_off","type_off","Offices","G",500,"exec AZtype_offSelect","exec AZtype_offMaj @etat@,@id_type_off@,@code_type_off@,@nom_type_off@,@num_off@,@id_type_loge@,@id_rite@","id_type_off",cols);
		cols=new Array(7);
		cols[0]=new ColonneEcran("etat","etat",TypeColEcran.Chaine,false,ModifCol.NonModifiable,false,true,100);
		cols[1]=new ColonneEcran("id_type_tenue","id_type_tenue",TypeColEcran.ClePrimaire,false,ModifCol.NonModifiable,false,true,100);
		cols[2]=new ColonneEcran("nom_type_tenue","Nom",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,300);
		cols[3]=new ColonneEcran("lib_type_tenue","Libellé",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,300);
		cols[4]=new ColonneEcran("id_deg","Degré",TypeColEcran.CleEtrangere,true,ModifCol.Modifiable,false,true,200);
		cols[5]=new ColonneEcran("id_degWITH","Degré",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,200);
		cols[6]=new ColonneEcran("dep","Dépendances",TypeColEcran.Dependances,true,ModifCol.Modifiable,false,true,250);
		this.m_blocs[12]=new Bloc(this.httpClient,this,"type_tenue","type_tenue","Types de tenues","G",500,"exec AZtype_tenueSelect","exec AZtype_tenueMaj @etat@,@id_type_tenue@,@nom_type_tenue@,@lib_type_tenue@,@id_deg@","id_type_tenue",cols);
		cols=new Array(9);
		cols[0]=new ColonneEcran("etat","etat",TypeColEcran.Chaine,false,ModifCol.NonModifiable,false,true,100);
		cols[1]=new ColonneEcran("id_ville","id_ville",TypeColEcran.ClePrimaire,false,ModifCol.NonModifiable,false,true,100);
		cols[2]=new ColonneEcran("nom_ville","Nom",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,300);
		cols[3]=new ColonneEcran("code_postal","Code postal",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,200);
		cols[4]=new ColonneEcran("id_terr","Territoire",TypeColEcran.CleEtrangere,true,ModifCol.Modifiable,false,true,200);
		cols[5]=new ColonneEcran("id_terrWITH","Degré",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,200);
		cols[6]=new ColonneEcran("lat","Latitude",TypeColEcran.Flottant,true,ModifCol.Modifiable,true,true,100);
		cols[7]=new ColonneEcran("lon","Longitude",TypeColEcran.Flottant,true,ModifCol.Modifiable,true,true,100);
		cols[8]=new ColonneEcran("dep","Dépendances",TypeColEcran.Dependances,true,ModifCol.Modifiable,false,true,200);
		this.m_blocs[13]=new Bloc(this.httpClient,this,"ville","ville","Villes","G",500,"exec AZvilleSelect","exec AZvilleMaj @etat@,@id_ville@,@nom_ville@,@code_postal@,@id_terr@,@lat@,@lon@","id_ville",cols);
		this.m_classe_boutons=new Array(this.m_blocs.length);
//console.log('references: fin du constructeur');
	}
	ngOnInit(): void
	{
//console.log('References: début de ngOnInit');
		/*
		if(!this.m_cbo_initialisee)
		{
			this.m_cbo_deg=new Cbo(this.httpClient,'deg');
			this.m_cbo_deg.GenererListeStd().then(res=>{},err=>{this.MessageErreur(err);});
			this.m_cbo_type_loge=new Cbo(this.httpClient,'type_loge');
			this.m_cbo_type_loge.GenererListeStd().then(res=>{},err=>{this.MessageErreur(err);});
			this.m_cbo_rite=new Cbo(this.httpClient,'rite');
			this.m_cbo_rite.GenererListeStd().then(res=>{},err=>{this.MessageErreur(err);});
			this.m_cbo_ville=new Cbo(this.httpClient,'ville');
			this.m_cbo_ville.GenererListeStd().then(res=>{},err=>{this.MessageErreur(err);});
			this.m_cbo_initialisee=true;
		}
		*/
		this.activatedRoute.params.forEach(params =>
		{
//            let userId = params["userId"];
			var nom_tab:string=''+this.activatedRoute.snapshot.paramMap.get("nom_ecran");
//console.log('Appel de ChangementDeGrille('+nom_tab+')');
			this.ChangementDeGrille(nom_tab);
//console.log('references.ngOnInit: m_nom_tab='+this.m_nom_tab+', avant appel de InitColDefs');
			this.InitColDefs();
//console.log('apres InitColDefs');
			this.Init();
//console.log('apres Init');
        })
	}	
}
