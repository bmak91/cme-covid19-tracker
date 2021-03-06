import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Info, Survey, Key } from './shared/models/info.model';
import { AppService } from './app.component.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

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
  key: Key;
  localStorageKey: string = 'CoronavirusSurvey';
  alreadySubmitted: boolean = false;
  sharableLink: string;
  info: Info;
  defaultLanguage = 'ar';
  rtl = true;
  updateMode = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
    private translate: TranslateService) {
    let savedKey = localStorage.getItem(this.localStorageKey);
    if (savedKey) {
      this.key = { privateKey: savedKey.split('_')[0], publicKey: savedKey.split('_')[1] };
    }
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
        referrerKey: this.referenceKey,
        key: this.key ? this.key.privateKey : null,
        answers: []
      };
      if (this.key) {
        this.alreadySubmitted = true;
        this.updateMode = true;
      }
      this.getInfo();
      this.generateLink();
    });
  }

  ngOnInit() {
  }

  getInfo() {
    this.appService.sendReference(this.referenceKey, this.key?.privateKey).subscribe(item => {
      this.info = {
        connNb: 0,
        riskState: 'Normal Risk'
      }
    });
  }

  onStepperNext(stepper) {
    let stepsWithHint;
    //if (this.updateMode) {
    stepsWithHint = [0, 1, 2, 3]
    // }
    // else {
    //   stepsWithHint = [0, 1, 2, 3, 4]
    // }
    this.showHint = stepsWithHint.includes(stepper.selectedIndex);
    stepper.next();
  }

  onQuestNext(event, stepper) {
    this.survey.answers.push(event);
    this.onStepperNext(stepper);
  }

  onFinalQuestNext(event, stepper) {
    this.survey.answers.push(event);
    this.onSubmit();
    this.onStepperNext(stepper);
  }

  onSubmit() {
    this.appService.save(this.survey).subscribe(data => {
      if (data && data.body) {
        this.key = data.body;
        this.info = {
          connNb: 0,
          riskState: 'Normal Risk'
        }
        this.survey = {
          referrerKey: this.referenceKey,
          key: this.key.privateKey,
          answers: []
        };
        localStorage.setItem(this.localStorageKey, `${this.key.privateKey}_${this.key.publicKey}`);
      }
      this.generateLink();
    });
  }

  generateLink() {
    let hash = this.key ? `&referenceKey=${this.key.publicKey}` : '';
    this.sharableLink = `${environment.currentUrl}?lang=${this.defaultLanguage}${hash}`
    console.log(this.sharableLink);
  }

  onPhoneNumberNext(event, stepper) {
    if (event) {
      this.savePhoneNumber(event);
    }
    this.onStepperNext(stepper);
  }

  onRestartStepper(stepper) {
    this.alreadySubmitted = false;
    this.updateMode = true;
    stepper.reset();
  }

  onCommunityNext(event, stepper) {
    this.saveCommunity(event);
    this.onStepperNext(stepper);
  }

  saveCommunity(communities) {
    if (communities && communities.length > 0) {
      communities.forEach(element => {
        let obj = { key: this.key.privateKey, community: element }
        this.appService.saveCommunity(obj).subscribe(x => {
        });
      });
    }
  }

  savePhoneNumber(phoneNumber) {
    console.log('Saving phone number');
  }
}
