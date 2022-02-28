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

  loading = false;
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

  onFileChange($event: Event) {
    this.readFile($event.target as HTMLInputElement);
  }

  readFile(input: HTMLInputElement) {
    const files: FileList | null = input.files;
    const reader = new FileReader();

    reader.onloadstart = (e: Event) => {
      this.loading = true;
    };

    reader.onloadend = (e: Event) => {
      this.loading = false;
      if (reader.result) {
        this.urls.setValue(reader.result.toString());
      }
    };

    if (files) reader.readAsText(files[0]);
  }
}
