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
import { ThanksComponent } from './thanks/thanks.component';

@NgModule({
  declarations: [
    AppComponent,
    ThanksComponent
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
