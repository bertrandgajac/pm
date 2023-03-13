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
  templateUrl: './adm_references.component.html'
})
@Injectable()
export class AdmReferencesComponent extends EcranGrille
{
	public m_nom_tab:string='';
	constructor(public override httpClient: HttpClient, public override formBuilder:UntypedFormBuilder, public override modalService: ModalService,public activatedRoute:ActivatedRoute)
	{
//console.log('references: début du constructeur');
		super(httpClient,formBuilder,modalService);
		this.m_blocs=new Array(4);
		var cols=new Array(5);
		cols[0]=new ColonneEcran("etat","etat",TypeColEcran.Chaine,false,ModifCol.NonModifiable,false,true,100);
		cols[1]=new ColonneEcran("id_aztype_bloc","id_aztype_bloc",TypeColEcran.ClePrimaire,false,ModifCol.NonModifiable,false,true,100);
		cols[2]=new ColonneEcran("nom_type_bloc","Nom",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,250);
		cols[3]=new ColonneEcran("lib_type_bloc","Libellé",TypeColEcran.Chaine,true,ModifCol.Modifiable,true,true,250);
		cols[4]=new ColonneEcran("dep","Dépendances",TypeColEcran.Dependances,true,ModifCol.Modifiable,false,true,250);
		this.m_blocs[0]=new Bloc(this.httpClient,this,"aztype_bloc","aztype_bloc","Types de bloc","G",500,"exec AZtype_blocSelect","exec AZtype_blocMaj @etat@,@id_aztype_bloc@,@nom_type_bloc@,@lib_type_bloc@","id_aztype_bloc",cols);
		cols=new Array(5);
		cols[0]=new ColonneEcran("etat","etat",TypeColEcran.Chaine,false,ModifCol.NonModifiable,false,true,100);
		cols[1]=new ColonneEcran("id_aztype_champ","id_aztype_champ",TypeColEcran.ClePrimaire,false,ModifCol.NonModifiable,false,true,100);
		cols[2]=new ColonneEcran("nom_type_champ","Nom",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,250);
		cols[3]=new ColonneEcran("lib_type_champ","Libellé",TypeColEcran.Chaine,true,ModifCol.Modifiable,true,true,250);
		cols[4]=new ColonneEcran("dep","Dépendances",TypeColEcran.Dependances,true,ModifCol.Modifiable,false,true,250);
		this.m_blocs[1]=new Bloc(this.httpClient,this,"aztype_champ","aztype_champ","Types de champ","G",500,"exec AZtype_champSelect","exec AZtype_champMaj @etat@,@id_aztype_champ@,@nom_type_champ@,@lib_type_champ@","id_aztype_champ",cols);
		cols=new Array(5);
		cols[0]=new ColonneEcran("etat","etat",TypeColEcran.Chaine,false,ModifCol.NonModifiable,false,true,100);
		cols[1]=new ColonneEcran("id_aztype_ecr","id_aztype_ecr",TypeColEcran.ClePrimaire,false,ModifCol.NonModifiable,false,true,100);
		cols[2]=new ColonneEcran("nom_type_ecr","Nom",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,250);
		cols[3]=new ColonneEcran("lib_type_ecr","Libellé",TypeColEcran.Chaine,true,ModifCol.Modifiable,true,true,250);
		cols[4]=new ColonneEcran("dep","Dépendances",TypeColEcran.Dependances,true,ModifCol.Modifiable,false,true,250);
		this.m_blocs[2]=new Bloc(this.httpClient,this,"aztype_ecr","aztype_ecr","Types d'écran","G",500,"exec AZtype_ecrSelect","exec AZtype_ecrMaj @etat@,@id_aztype_ecr@,@nom_type_ecr@,@lib_type_ecr@","id_aztype_ecr",cols);
		cols=new Array(7);
		cols[0]=new ColonneEcran("etat","etat",TypeColEcran.Chaine,false,ModifCol.NonModifiable,false,true,100);
		cols[1]=new ColonneEcran("id_azecr","id_azecr",TypeColEcran.ClePrimaire,false,ModifCol.NonModifiable,false,true,100);
		cols[2]=new ColonneEcran("nom_ecr","Nom",TypeColEcran.Chaine,true,ModifCol.Obligatoire,true,true,250);
		cols[3]=new ColonneEcran("lib_ecr","Libellé",TypeColEcran.Chaine,true,ModifCol.Modifiable,true,true,250);
		cols[4]=new ColonneEcran("id_aztype_ecr","Type",TypeColEcran.CleEtrangere,true,ModifCol.Modifiable,false,true,200);
		cols[5]=new ColonneEcran("id_aztype_ecrWITH","Type",TypeColEcran.Chaine,false,ModifCol.NonModifiable,true,false,200);
		cols[6]=new ColonneEcran("dep","Dépendances",TypeColEcran.Dependances,true,ModifCol.Modifiable,false,true,250);
		this.m_blocs[3]=new Bloc(this.httpClient,this,"azecr","azecr","Ecrans","G",500,"exec AZecrSelect","exec AZecrMaj @etat@,@id_azecr@,@nom_ecr@,@lib_ecr@,@id_aztype_ecr@","id_azecr",cols);
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
