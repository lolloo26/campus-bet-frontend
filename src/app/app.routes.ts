import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Tornei } from './pages/tornei/tornei';
import { TorneoDettaglio } from './pages/torneo-dettaglio/torneo-dettaglio';
import { PartitaDettaglio } from './pages/partita-dettaglio/partita-dettaglio';
import { MieiPronostici } from './pages/miei-pronostici/miei-pronostici';
import { Classifica } from './pages/classifica/classifica';
import { Profilo } from './pages/profilo/profilo';
import { Admin } from './pages/admin/admin';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'tornei', component: Tornei },
  { path: 'tornei/:id', component: TorneoDettaglio },
  { path: 'partite/:id', component: PartitaDettaglio },
  { path: 'miei-pronostici', component: MieiPronostici },
  { path: 'classifica', component: Classifica },
  { path: 'profilo', component: Profilo },
  { path: 'admin', component: Admin },
  { path: '**', redirectTo: '' },
];
