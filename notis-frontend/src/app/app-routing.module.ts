import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminLoginComponent} from './components/admin/admin-login/admin-login.component';
import {AdminHomeComponent} from './components/admin/admin-home/admin-home.component';
import {AdminNotariesComponent} from './components/admin/admin-notaries/admin-notaries.component';
import {AdminTranslatorsComponent} from './components/admin/admin-translators/admin-translators.component';
import {AdminHomeToolbarComponent} from './components/admin/admin-home-toolbar/admin-home-toolbar.component';
import {AdminServicesNotaryTranslatorComponent} from './components/admin/admin-services-notary-translator/admin-services-notary-translator.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import {UserHomeToolbarComponent} from './components/user/user-home-toolbar/user-home-toolbar.component';
import {UserHomeComponent} from './components/user/user-home/user-home.component';
import {UserNotariesComponent} from './components/user/user-notaries/user-notaries.component';
import {UserTranslatorsComponent} from './components/user/user-translators/user-translators.component';
import {UserServicesNotaryTranslatorComponent} from './components/user/user-services-notary-translator/user-services-notary-translator.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'main'},
  {path: 'main', pathMatch: 'full', component: MainPageComponent},
  {path: 'admin-login', pathMatch: 'full', component: AdminLoginComponent},
  {
    path: 'admin-home', pathMatch: 'full', component: AdminHomeComponent, children: [
      {path: '', outlet: 'admin-home-toolbar', component: AdminHomeToolbarComponent},
    ]
  },
  {
    path: 'admin-notaries', pathMatch: 'full', component: AdminNotariesComponent, children: [
      {path: '', outlet: 'admin-home-toolbar', component: AdminHomeToolbarComponent}
    ]
  },
  {
    path: 'admin-translators', pathMatch: 'full', component: AdminTranslatorsComponent, children: [
      {path: '', outlet: 'admin-home-toolbar', component: AdminHomeToolbarComponent},
    ]
  },
  {
    path: 'admin-notaries/services', pathMatch: 'full', component: AdminServicesNotaryTranslatorComponent, children: [
      {path: '', outlet: 'admin-home-toolbar', component: AdminHomeToolbarComponent}
    ]
  },
  {
    path: 'admin-translators/services', pathMatch: 'full', component: AdminServicesNotaryTranslatorComponent, children: [
      {path: '', outlet: 'admin-home-toolbar', component: AdminHomeToolbarComponent}
    ]
  },
  {
    path: 'home', pathMatch: 'full', component: UserHomeComponent, children: [
      {path: '', outlet: 'user-home-toolbar', component: UserHomeToolbarComponent},
    ]
  },
  {
    path: 'notaries', pathMatch: 'full', component: UserNotariesComponent, children: [
      {path: '', outlet: 'user-home-toolbar', component: UserHomeToolbarComponent}
    ]
  },
  {
    path: 'translators', pathMatch: 'full', component: UserTranslatorsComponent, children: [
      {path: '', outlet: 'user-home-toolbar', component: UserHomeToolbarComponent}
    ]
  },
  {
    path: 'notaries/services', pathMatch: 'full', component: UserServicesNotaryTranslatorComponent, children: [
      {path: '', outlet: 'user-home-toolbar', component: UserHomeToolbarComponent}
    ]
  },
  {
    path: 'translators/services', pathMatch: 'full', component: UserServicesNotaryTranslatorComponent, children: [
      {path: '', outlet: 'user-home-toolbar', component: UserHomeToolbarComponent}
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
