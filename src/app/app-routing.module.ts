import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferencesComponent } from './ecrans/references.component';
import { PrsComponent } from './ecrans/prs.component';
import { LogesComponent } from './ecrans/loges.component';
import { LecDirComponent } from './ecrans/lecdir.component';
import { MenuComponent } from './menu/menu.component';
import { ReqComponent } from './ecrans/req.component';
import { CarteComponent } from './ecrans/carte.component';
import { SttComponent } from './ecrans/stt.component';
import { DependancesComponent } from './ecrans/dependances.component';

const routes: Routes =
[
	{ path: 'menu', component: MenuComponent },
	{ path: 'prs', component: PrsComponent },
	{ path: 'loges', component: LogesComponent },
	{ path: 'fic', component: LecDirComponent },
	{ path: 'req', component: ReqComponent },
	{ path: 'carte', component: CarteComponent },
	{ path: 'stt', component: SttComponent },
	{ path: 'dependances', component: DependancesComponent },
	{ path: 'references/:nom_ecran', component: ReferencesComponent },
//	{ path: '', component: MenuComponent },
//	{ path: 'not-found', component: MenuComponent },
	{ path: '**', redirectTo: 'not-found' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
