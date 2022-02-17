import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { FormControl, FormGroup } from '@angular/forms';

interface IJobForm {
  url: boolean;
  responseTime: boolean;
  statusCode: boolean;
}

@Component({
  selector: 'app-download-job-form',
  templateUrl: './download-job-form.component.html',
  styleUrls: ['./download-job-form.component.scss'],
})
export class DownloadJobFormComponent implements OnInit {
  constructor(private job: JobService) {}

  url = new FormControl();
  responseTime = new FormControl();
  statusCode = new FormControl();

  downloadJobForm = new FormGroup({
    url: this.url,
    responseTime: this.responseTime,
    statusCode: this.statusCode,
  });

  ngOnInit(): void {}

  onSubmit(value: IJobForm) {
    console.log('value', value);
  }
}
