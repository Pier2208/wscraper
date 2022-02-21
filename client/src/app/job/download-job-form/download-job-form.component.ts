import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { FormBuilder, FormArray, FormControl } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';

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
  downloadJobForm = this.fb.group({
    fields: new FormArray([]),
  });

  formFields = [
    { name: 'url', checked: true },
    { name: 'responseTime', checked: true },
    { name: 'statusCode', checked: true },
  ];

  constructor(
    private fb: FormBuilder,
    private job: JobService,
    private modal: ModalService
  ) {}

  ngOnInit(): void {
    this.addCheckboxes();
  }

  private addCheckboxes() {
    this.formFields.forEach(() =>
      this.formFieldsArray.push(new FormControl(false))
    );
  }

  get formFieldsArray() {
    return this.downloadJobForm.controls['fields'] as FormArray;
  }

  onSubmit(format: string) {
    const selected = this.downloadJobForm.value.fields
      .map((checked: any, i: number) => {
        return checked ? this.formFields[i].name : null;
      })
      .filter((v: any) => v !== null);
    const jobId = this.modal.getModalId();
    
    this.downloadJobForm.reset();
    this.modal.toggleModal();

    this.job.downloadFile(jobId, format, selected)
  }
}
