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
import {AdminTranslatorComponent} from './components/admin/admin-translator/admin-translator.component';
import {AdminNotaryComponent} from './components/admin/admin-notary/admin-notary.component';
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
import { MainPageToolbarComponent } from './components/main-page-toolbar/main-page-toolbar.component';
import { UserHomeComponent } from './components/user/user-home/user-home.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    AdminHomeComponent,
    AdminTranslatorComponent,
    AdminNotaryComponent,
    AdminHomeToolbarComponent,
    DialogBoxNotaryTranslatorAdminComponent,
    DialogBoxAddressAdminComponent,
    DialogBoxTimetableAdminComponent,
    AdminServicesNotaryTranslatorComponent,
    DialogBoxServiceAdminComponent,
    DialogBoxDocumentsAdminComponent,
    MainPageComponent,
    MainPageToolbarComponent,
    UserHomeComponent
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
    DialogBoxDocumentsAdminComponent

  ],
  providers: [NotaryService, ServiceService, DocumentService, TranslatorService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
