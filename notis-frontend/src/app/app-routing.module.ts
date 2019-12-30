import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminLoginComponent} from './components/admin/admin-login/admin-login.component';
import {AdminHomeComponent} from './components/admin/admin-home/admin-home.component';
import {AdminNotaryComponent} from './components/admin/admin-notary/admin-notary.component';
import {AdminTranslatorComponent} from './components/admin/admin-translator/admin-translator.component';
import {AdminHomeToolbarComponent} from './components/admin/admin-home-toolbar/admin-home-toolbar.component';
import {AdminServicesNotaryTranslatorComponent} from './components/admin/admin-services-notary-translator/admin-services-notary-translator.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import {MainPageToolbarComponent} from './components/main-page-toolbar/main-page-toolbar.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'main'},
  {
    path: 'main', component: MainPageComponent, children: [
      {path: '', outlet: 'main-page-toolbar', component: MainPageToolbarComponent},
    ]
  },
  {path: 'admin-login', component: AdminLoginComponent},
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
    path: 'admin-notary/services', component: AdminServicesNotaryTranslatorComponent, children: [
      {path: '', outlet: 'admin-home-toolbar', component: AdminHomeToolbarComponent}
    ]
  },
  {
    path: 'admin-translator/services', component: AdminServicesNotaryTranslatorComponent, children: [
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
