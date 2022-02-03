import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JobService } from 'src/app/services/job.service';

interface IJobForm {
  title: string;
  urls: string;
}

@Component({
  selector: 'app-create-job-form',
  templateUrl: './create-job-form.component.html',
  styleUrls: ['./create-job-form.component.scss'],
})
export class CreateJobFormComponent {
  constructor(private job: JobService) {}

  name = new FormControl('', [Validators.required]);
  urls = new FormControl('', [Validators.required]);

  jobForm = new FormGroup({
    name: this.name,
    urls: this.urls,
  });

  onSubmit(value: IJobForm) {
    this.job.createJob(value).subscribe({
      next: (data) => console.log('data', data),
      error: (err) => console.error('erreur', err)
    })
    this.jobForm.reset();
    this.jobForm.markAsPristine();
  }
}
