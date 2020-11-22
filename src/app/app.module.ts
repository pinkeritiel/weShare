import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Injectable, Inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from  '@angular/http';
import { ModalModule } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { AuthenticationService } from './authentication.service';
import { ShareService } from './share.service';
import { MessageService } from './message.service';
import { ModalhelperService } from './modalhelper.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './views/header/header.component';
import { LoginFormComponent } from './views/loginform/loginform.component';
import { FooterComponent } from './views/footer/footer.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';


import { AuthguardGuard } from './authguard.guard';
import { NotfoundcomponentComponent } from './views/notfoundcomponent/notfoundcomponent.component';
import { RegisterComponent } from './views/register/register.component';
import { AboutComponent } from './about/about.component';
import { ShareCreateComponent } from './share-create/share-create.component';
import { ShareDetailsComponent } from './share-details/share-details.component';
import { SharesComponent } from './shares/shares.component';
import { ShareScheduleComponent } from './share-schedule/share-schedule.component';
import { ShareMemberComponent } from './share-member/share-member.component';
import { SharedetailComponent } from './sharedetail/sharedetail.component';
import { SharescheduleComponent } from './shareschedule/shareschedule.component';
import { ShareEditComponent } from './share-edit/share-edit.component';
import { MemberSelectComponent } from './member-select/member-select.component';
import { ProfileComponent } from './profile/profile.component';
import { ShareMemberDetailsComponent } from './share-member-details/share-member-details.component';
import { MemberdetailsComponent } from './memberdetails/memberdetails.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', 
    children: [
      { path: '', component: LoginFormComponent},
      { path: 'register', component: RegisterComponent }
    ] },
  { path: 'dashboard',
    children: [
      { path: '', component: DashboardComponent},
      { path: 'share-create', component: ShareCreateComponent }  
    ] },
  { path: 'profile', component: ProfileComponent },
  { path: 'shares/:id', 
    children: [
      { path: '',  component: SharesComponent},
      { path: 'share-details/:id', 
        children: [
          { path: '',component: ShareDetailsComponent},
          { path: 'share-edit/:id', component: ShareEditComponent, canActivate: [AuthguardGuard] },
          { path: 'share-schedule/:id', component: ShareScheduleComponent },
          { path: 'share-member/:id', component: ShareMemberComponent, canActivate: [AuthguardGuard]  },
          { path: 'share-member-details/:shareid/:memberid', component: ShareMemberDetailsComponent }
       ]},
    ] },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotfoundcomponentComponent }
];
  
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    LoginFormComponent,
    FooterComponent,
    NotfoundcomponentComponent,
    RegisterComponent,
    AboutComponent,
    ShareCreateComponent,
    ShareDetailsComponent,
    SharesComponent,
    ShareScheduleComponent,
    ShareMemberComponent,
    SharedetailComponent,
    SharescheduleComponent,
    ShareEditComponent,
    MemberSelectComponent,
    ProfileComponent,
    ShareMemberDetailsComponent,
    MemberdetailsComponent
  ],
   imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes) // for debugging only{enableTracing: true }
  ],
  providers: [
    AuthguardGuard,
    ShareService,
    AuthenticationService,
    MessageService,
    ModalhelperService,
    {provide: LocationStrategy, useClass: PathLocationStrategy}
    ],
    entryComponents: [MemberSelectComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
