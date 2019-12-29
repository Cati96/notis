import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminLoginComponent} from './components/admin-login/admin-login.component';
import {AdminHomeComponent} from './components/admin-home/admin-home.component';
import {AdminNotaryComponent} from './components/admin-notary/admin-notary.component';
import {AdminTranslatorComponent} from './components/admin-translator/admin-translator.component';
import {AdminHomeToolbarComponent} from './components/admin-home-toolbar/admin-home-toolbar.component';
import {ServicesNotaryTranslatorComponent} from './components/services-notary-translator/services-notary-translator.component';
import {MainPageComponent} from './components/main-page/main-page.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'main'},
  {path: 'main', component: MainPageComponent},
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
    path: 'admin-notary/services', component: ServicesNotaryTranslatorComponent, children: [
      {path: '', outlet: 'admin-home-toolbar', component: AdminHomeToolbarComponent}
    ]
  },
  {
    path: 'admin-translator/services', component: ServicesNotaryTranslatorComponent, children: [
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
