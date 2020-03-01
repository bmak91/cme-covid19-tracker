import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { Community, Info, Survey } from './shared/models/info.model';
import { AppService } from './app.component.service';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'coronavirus-survey';
  survey: Survey;
  showHint: boolean = false;
  referenceKey: string;
  key: string;
  localStorageKey: string = 'CoronavirusSurvey';
  alreadySubmitted: boolean = false;
  sharableLink: string;
  info: Info;
  defaultLanguage = 'ar';
  rtl = true;
  constructor(
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private appService: AppService,
    private translate: TranslateService) {
    this.key = localStorage.getItem(this.localStorageKey);
    this.route.queryParams.subscribe(params => {
      if (params.lang) {
        this.defaultLanguage = params.lang;
      }
      translate.setDefaultLang(this.defaultLanguage);
      if (this.defaultLanguage !== 'ar') {
        this.rtl = false;
      }
      if (params.referenceKey) {
        this.referenceKey = params.referenceKey;
      }
      this.survey = {
        key: this.referenceKey,
        existingKey: this.key,
        answers: []
      };
      if (this.key) {
        this.getInfo();
        this.alreadySubmitted = true;
      }
      this.sharableLink = `${environment.currentUrl}?referenceKey=${this.key}`;
    });
  }

  ngOnInit() {
  }

  getInfo() {
    console.log('getting info');
    this.info = {
      connNb: 35,
      riskState: 'Normal'
    }
  }

  onStepperNext(stepper) {
    let stepsWithHint = [0, 1, 2, 3, 4];
    this.showHint = stepsWithHint.includes(stepper.selectedIndex);
    stepper.next();
  }

  onQuestNext(event, stepper) {
    console.log(event);
    this.survey.answers.push(event);
    this.onStepperNext(stepper);
  }

  onFinalQuestNext(event, stepper) {
    this.survey.answers.push(event);
    this.onSubmit();
    this.onStepperNext(stepper);
  }

  onSubmit() {
    // this.appService.save(this.survey).subscribe(data => {
    //  if (data && data.body && data.body.newKey) {
    //   this.key = data.body.newKey;
    this.key = 'myKey';
    this.info = {
      connNb: 35,
      riskState: 'th Risk'
    }
    localStorage.setItem(this.localStorageKey, this.key);
    //  }
    this.sharableLink = `${environment.currentUrl}?referenceKey=${this.key}`;
    //});
  }

  onPhoneNumberNext(event, stepper) {
    if (event) {
      this.savePhoneNumber(event);
    }
    this.onStepperNext(stepper);
  }

  onRestartStepper(stepper) {
    this.alreadySubmitted = false;
    stepper.reset();
  }

  onCommunityNext(event, stepper) {
    this.saveCommunity(event);
    this.onStepperNext(stepper);
  }

  saveCommunity(community) {
    console.log('Saving community');
  }

  savePhoneNumber(phoneNumber) {
    console.log('Saving phone number');
  }
}
