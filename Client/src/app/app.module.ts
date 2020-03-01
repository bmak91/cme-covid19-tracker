import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { RouterModule } from '@angular/router';
import { AppService } from './app.component.service';
import { HttpClientModule } from '@angular/common/http';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FirstQuestionComponent } from './first-question/first-question.component';
import { SecondQuestionComponent } from './second-question/second-question.component';
import { ThirdQuestionComponent } from './third-question/third-question.component';
import { FourthQuestionComponent } from './fourth-question/fourth-question.component';
import { ShareComponent } from './share/share.component';
import { PhoneNumberComponent } from './phone-number/phone-number.component';
import { HintComponent } from './shared/hint/hint.component';
import { CommunityComponent } from './community/community.component';

@NgModule({
  declarations: [
    AppComponent,
    MainScreenComponent,
    WelcomeComponent,
    FirstQuestionComponent,
    SecondQuestionComponent,
    ThirdQuestionComponent,
    FourthQuestionComponent,
    ShareComponent,
    PhoneNumberComponent,
    HintComponent,
    CommunityComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RouterModule.forRoot([]),
    HttpClientModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
