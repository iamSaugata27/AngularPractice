import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild("fo") signUpform: NgForm;
  defaultQuestion = 'teacher';
  answer!: string;
  genders = ['male', 'female'];
  submitted = false;
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  };
  suggestUserName() {
    const suggestedName = 'Superuser';
    this.signUpform.form.patchValue({
      userData: {
        username: suggestedName
      }
    })
  }
  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }
  onSubmit() {
    console.log(this.signUpform);
    this.submitted = true;
    this.user.username = this.signUpform.form.value.userData.username;
    this.user.email = this.signUpform.form.value.userData.email;
    this.user.secretQuestion = this.signUpform.form.value.secret;
    this.user.answer = this.signUpform.form.value.questionAnswer;
    this.user.gender = this.signUpform.form.value.gender;

    this.signUpform.reset();
  }
}
