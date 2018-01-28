import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {TunnelPageComponent} from './tunnel/tunnel.page';
import {WarningComponent} from './tunnel/warning/warning.component';
import {OptionsPageComponent} from './options/options.page';
import {ProComponent} from './tunnel/pro/pro.component';
import {HowToUseComponent} from './tunnel/how-to-use/how-to-use.component';
import {PrincipalPageComponent} from './principal/principal.page';
import {RegularComponent} from './principal/regular/regular.component';
import {FilesPageComponent} from './principal/files/files.page';
import {DirectoryComponent} from './principal/directories/directory/directory.component';
import {FileService} from './services/file.service';
import {DirectoryService} from './services/directory.service';
import {VerifyService} from './services/verify.service';
import {VerifyFrontService} from './services/verify-front.service';
import {ImagesComponent} from './principal/images/images.component';

import {
  MatTabsModule,
  MatProgressBarModule,
  MatButtonModule,
  MatPaginatorModule
} from '@angular/material';

import 'rxjs/Rx';
import {DirectoriesPageComponent} from './principal/directories/directories.page';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {OrphansComponent} from './principal/orphans/orphans.component';
import {LogService} from './services/log.service';
import {WaitingComponent} from './principal/waiting/waiting.component';
import {OptionService} from './services/option.service';
import {IgnoreComponent} from './principal/ignore/ignore.component';
import {BackupService} from './services/backup.service';
import {BackupRegularsComponent} from './principal/backup/regulars/backup-regulars.component';
import {BackupOrphansComponent} from './principal/backup/orphans/backup-orphans.component';
import {BackupImagesComponent} from './principal/backup/images/backup-images.component';
import {BackupPageComponent} from './principal/backup/backup.page';

const appRoutes: Routes = [
  {
    path: 'principal',
    component: PrincipalPageComponent,
    children: [
      {
        path: '',
        component: WarningComponent
      },
      {
        path: 'directories',
        component: DirectoriesPageComponent,
      },
      {
        path: 'files',
        component: FilesPageComponent,
      },
      {
        path: 'options',
        component: OptionsPageComponent,
      },
      {
        path: 'backups',
        component: BackupPageComponent,

      }
    ]
  },
  {
    path: 'tunnel',
    component: TunnelPageComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,

    TunnelPageComponent,
    WarningComponent,
    ProComponent,
    HowToUseComponent,

    OptionsPageComponent,

    PrincipalPageComponent,

    DirectoriesPageComponent,
    DirectoryComponent,

    FilesPageComponent,

    BackupPageComponent,
    BackupRegularsComponent,
    BackupOrphansComponent,
    BackupImagesComponent,

    RegularComponent,
    ImagesComponent,
    OrphansComponent,
    WaitingComponent,
    IgnoreComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    FormsModule,

    MatTabsModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatButtonModule,

    HttpClientModule,

    RouterModule.forRoot(appRoutes)

  ],
  providers: [
    FileService,
    DirectoryService,
    VerifyFrontService,
    VerifyService,
    LogService,
    OptionService,
    BackupService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {
}

