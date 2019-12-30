import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AdminLoginComponent} from './components/admin/admin-login/admin-login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomMaterialModule} from './core/material.module';
import {LayoutModule} from '@angular/cdk/layout';
import {AdminHomeComponent} from './components/admin/admin-home/admin-home.component';
import {AdminTranslatorsComponent} from './components/admin/admin-translators/admin-translators.component';
import {AdminNotariesComponent} from './components/admin/admin-notaries/admin-notaries.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {AdminHomeToolbarComponent} from './components/admin/admin-home-toolbar/admin-home-toolbar.component';
import {NotaryService} from './services/notary.service';
import {DialogBoxNotaryTranslatorAdminComponent} from './components/admin/modals/dialog-box-notary-translator-admin/dialog-box-notary-translator-admin.component';
import {DialogBoxAddressAdminComponent} from './components/admin/modals/dialog-box-address-admin/dialog-box-address-admin.component';
import {DialogBoxTimetableAdminComponent} from './components/admin/modals/dialog-box-timetable-admin/dialog-box-timetable-admin.component';
import {AdminServicesNotaryTranslatorComponent} from './components/admin/admin-services-notary-translator/admin-services-notary-translator.component';
import {ServiceService} from './services/service.service';
import {DialogBoxServiceAdminComponent} from './components/admin/modals/dialog-box-service-admin/dialog-box-service-admin.component';
import {DialogBoxDocumentsAdminComponent} from './components/admin/modals/dialog-box-documents-admin/dialog-box-documents-admin.component';
import {DocumentService} from './services/document.service';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {MainPageComponent} from './components/main-page/main-page.component';
import {TranslatorService} from './services/translator.service';
import {UserHomeToolbarComponent} from './components/user/user-home-toolbar/user-home-toolbar.component';
import {UserHomeComponent} from './components/user/user-home/user-home.component';
import {UserNotariesComponent} from './components/user/user-notaries/user-notaries.component';
import {DialogBoxAddressUserComponent} from './components/user/modals/dialog-box-address-user/dialog-box-address-user.component';
import {DialogBoxDocumentsUserComponent} from './components/user/modals/dialog-box-documents-user/dialog-box-documents-user.component';
import {DialogBoxTimetableUserComponent} from './components/user/modals/dialog-box-timetable-user/dialog-box-timetable-user.component';
import {UserTranslatorsComponent} from './components/user/user-translators/user-translators.component';
import {UserServicesNotaryTranslatorComponent} from './components/user/user-services-notary-translator/user-services-notary-translator.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    AdminHomeComponent,
    AdminTranslatorsComponent,
    AdminNotariesComponent,
    AdminHomeToolbarComponent,
    DialogBoxNotaryTranslatorAdminComponent,
    DialogBoxAddressAdminComponent,
    DialogBoxTimetableAdminComponent,
    AdminServicesNotaryTranslatorComponent,
    DialogBoxServiceAdminComponent,
    DialogBoxDocumentsAdminComponent,
    MainPageComponent,
    UserHomeToolbarComponent,
    UserHomeComponent,
    UserNotariesComponent,
    DialogBoxAddressUserComponent,
    DialogBoxDocumentsUserComponent,
    DialogBoxTimetableUserComponent,
    UserTranslatorsComponent,
    UserServicesNotaryTranslatorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    DialogBoxNotaryTranslatorAdminComponent,
    DialogBoxAddressAdminComponent,
    DialogBoxTimetableAdminComponent,
    DialogBoxServiceAdminComponent,
    DialogBoxDocumentsAdminComponent,
    DialogBoxAddressUserComponent,
    DialogBoxDocumentsUserComponent,
    DialogBoxTimetableUserComponent
  ],
  providers: [NotaryService, ServiceService, DocumentService, TranslatorService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
