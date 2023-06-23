import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  projectStatus = ['Stable', 'Critical', 'Finished'];
  ngOnInit(): void {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required, this.forbiddenProjectName], this.forbiddenProjectNameAsyncValidator),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl('Critical')
    });
  }
  forbiddenProjectName(control: FormControl): { [key: string]: boolean } {
    if (control.value === "Test")
      return { "forbiddenProject": true };
    return null;
  }
  forbiddenProjectNameAsyncValidator(control: FormControl): Promise<{ [key: string]: boolean }> | Observable<{ [key: string]: boolean }> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value == "TestProject")
          resolve({ "forbiddenProject": true });
        else
          resolve(null);
      }, 2000);
    })
  }
  onSubmit() {
    console.log(this.projectForm);
  }
}
