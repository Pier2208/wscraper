import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from 'src/app/services/job.service';

interface IJobForm {
  name: string;
  urls: string;
}

@Component({
  selector: 'app-create-job-form',
  templateUrl: './create-job-form.component.html',
  styleUrls: ['./create-job-form.component.scss'],
})
export class CreateJobFormComponent {
  constructor(private job: JobService, private router: Router) {}

  name = new FormControl('', [Validators.required]);
  urls = new FormControl('', [Validators.required]);

  jobForm = new FormGroup({
    name: this.name,
    urls: this.urls,
  });

  onSubmit(value: IJobForm) {
    this.job.createJob(value);
    this.jobForm.reset();
    this.jobForm.markAsPristine();
    this.router.navigateByUrl('/');
  }

  onFileChange($event: any) {
    this.readFile($event.target);
  }

  readFile(inputValue: any) {
    const file = inputValue.files[0];
    const reader = new FileReader();

    reader.onloadend = (e) => {
      console.log(reader.result);
      if(reader.result) {
        this.urls.setValue(reader.result.toString())
      }
    };

    reader.readAsText(file)
  }
}
