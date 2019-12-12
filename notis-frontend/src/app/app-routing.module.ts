import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {AdminHomeComponent} from './components/admin-home/admin-home.component';
import {AdminNotaryComponent} from './components/admin-notary/admin-notary.component';
import {AdminTranslatorComponent} from './components/admin-translator/admin-translator.component';
import {AdminHomeToolbarComponent} from './components/admin-home-toolbar/admin-home-toolbar.component';
import {ServicesNotaryTranslatorComponent} from './components/services-notary-translator/services-notary-translator.component';


const routes: Routes = [
  /*{path: '', component: AppComponent},*/
  {path: '', pathMatch: 'full', redirectTo: 'admin-login'},
  {path: 'admin-login', component: LoginComponent},
  {
    path: 'admin-home', component: AdminHomeComponent, children: [
      {path: '', outlet: 'admin-home-toolbar', component: AdminHomeToolbarComponent},
    ]
  },
  {
    path: 'admin-notary', component: AdminNotaryComponent, children: [
      {path: '', outlet: 'admin-home-toolbar', component: AdminHomeToolbarComponent}
    ]
  },
  {
    path: 'admin-translator', component: AdminTranslatorComponent, children: [
      {path: '', outlet: 'admin-home-toolbar', component: AdminHomeToolbarComponent},
    ]
  },
  {
    path: 'admin-notary/services', component: ServicesNotaryTranslatorComponent, children: [
      {path: '', outlet: 'admin-home-toolbar', component: AdminHomeToolbarComponent}
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
