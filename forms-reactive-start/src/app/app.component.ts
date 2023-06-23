import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signUpform: FormGroup;
  forbiddenUsernames = ['Voja', 'Kalu'];

  ngOnInit(): void {
    this.signUpform = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    // this.signUpform.valueChanges.subscribe(
    //   (value: string) => console.log(value)
    // );
    this.signUpform.statusChanges.subscribe(
      (status: string) => console.log(status)
    );
    this.signUpform.patchValue({
      userData: {
        email: 'abc@abcd.com'
      }
    })
  }

  forbiddenNames(control: FormControl): { [key: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true };  // returns true means validation is invalid
    }
    return null;  // returns nothing or null means validation is valid
  }

  // async validator
  forbiddenEmails(control: FormControl): Promise<{ [key: string]: boolean }> | Observable<{ [key: string]: boolean }> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value == "test@test.com")
          resolve({ 'emailIsForbidden': true });
        else
          resolve(null);
      }, 2000);
    });
  }

  onAddHobby() {
    const formControl = new FormControl(null, Validators.required);
    (<FormArray>this.signUpform.get('hobbies')).push(formControl);
  }
  getControls() {
    return (<FormArray>this.signUpform.get('hobbies')).controls;
  }

  onSubmit() {
    console.log(this.signUpform);
    this.signUpform.reset({
      userData: {
        username: "",
        email: ""
      },
      hobbies: [],
      gender: 'female'
    })
  }
}
