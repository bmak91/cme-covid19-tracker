import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

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

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {

    this.formGroup = this._formBuilder.group({
      community: ['', Validators.required],
      isPositive: ['', Validators.required],
      inContactInfCountries: ['', Validators.required],
      inContactInfPeople: ['', Validators.required],
      phoneNumber: ['']
    });
  }

  onSubmit(stepper: MatStepper){
    console.log(this.formGroup.getRawValue());
    stepper.next();
}
}
