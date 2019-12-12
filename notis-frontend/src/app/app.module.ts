import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule, JsonpModule} from '@angular/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './components/login/login.component';
import {FormsModule} from '@angular/forms';
import {CustomMaterialModule} from './core/material.module';
import {LayoutModule} from '@angular/cdk/layout';
import {AdminHomeComponent} from './components/admin-home/admin-home.component';
import {AdminTranslatorComponent} from './components/admin-translator/admin-translator.component';
import {AdminNotaryComponent} from './components/admin-notary/admin-notary.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {AdminHomeToolbarComponent} from './components/admin-home-toolbar/admin-home-toolbar.component';
import {NotaryService} from './services/notary.service';
import {DialogBoxNotaryTranslatorComponent} from './components/modals/dialog-box-notary-translator/dialog-box-notary-translator.component';
import {DialogBoxAddressComponent} from './components/modals/dialog-box-address/dialog-box-address.component';
import {DialogBoxTimetableComponent} from './components/modals/dialog-box-timetable/dialog-box-timetable.component';
import {ServicesNotaryTranslatorComponent} from './components/services-notary-translator/services-notary-translator.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminHomeComponent,
    AdminTranslatorComponent,
    AdminNotaryComponent,
    AdminHomeToolbarComponent,
    DialogBoxNotaryTranslatorComponent,
    DialogBoxAddressComponent,
    DialogBoxTimetableComponent,
    ServicesNotaryTranslatorComponent
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
    HttpModule,
    JsonpModule,
  ],
  entryComponents: [
    DialogBoxNotaryTranslatorComponent,
    DialogBoxAddressComponent,
    DialogBoxTimetableComponent
  ],
  providers: [NotaryService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
