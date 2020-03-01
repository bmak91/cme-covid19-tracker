import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { Community, Info, Survey } from './shared/models/info.model';
import { AppService } from './app.component.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'coronavirus-survey';
  formGroup: FormGroup;
  secondFormGroup: FormGroup;
  showSpinner = false;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  info: Info = { community: '' };
  referenceKey: string;
  key: string;
  localStorageKey: string = 'CoronavirusSurvey';
  alreadySubmitted: boolean = false;
  domainName = 'coronavirus-survey.gotocme.com';
  sharableLink: string = `${this.domainName}`;
  wtspUrl: string = 'whatsapp://send?text=http://localhost?referenceKey=100dd6cd76ccc3fa306d604c987b2a6d8a3c25eb';
  
  constructor(
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private appService: AppService) {
    this.key = localStorage.getItem(this.localStorageKey);
    if (this.key) {
      this.alreadySubmitted = true;
      console.log('already submitted');
    }
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (params.referenceKey) {
        console.log(params.referenceKey);
        this.referenceKey = params.referenceKey;
      }
      /* this.appService.sendReference(this.referenceKey, this.key).subscribe(data => {
        if (data && data.body) {
          this.info = data.body;
          console.log(data.body);
        }
      }); */
      this.info = { community: 'CME', communityId: '1'};
    });
  }

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      community: [this.info.community, Validators.required],
      isPositive: ['', Validators.required],
      inContactInfCountries: ['', Validators.required],
      inContactInfPeople: ['', Validators.required],
      phoneNumber: ['']
    });
  }

  onSubmit(stepper: MatStepper) {
    let response = this.formGroup.getRawValue();
    let survey: Survey = {
      key: this.referenceKey,
      community: this.info.community === response.community ? { id: this.info.communityId, name: this.info.community } : { name: response.community },
      answers: [response.isPositive, response.inContactInfCountries, response.inContactInfPeople],
      phone: response.phoneNumber
    }
    this.appService.save(survey).subscribe(data => {
      if (data && data.body && data.body.newKey) {
        this.key = data.body.newKey;
        localStorage.setItem(this.localStorageKey, this.key);
        this.alreadySubmitted = true;
      }
    });
    stepper.next();
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  getSharableLink(){
    return `${this.sharableLink}?referenceKey=${this.key}`
  }

}
