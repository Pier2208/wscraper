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
  constructor(
    private fb: FormBuilder,
    private job: JobService,
    private modal: ModalService
  ) {}

  downloadJobForm = this.fb.group({
    fields: new FormArray([])
  });
  submitting = false;

  formFields = [
    { name: 'url', checked: false },
    { name: 'responseTime', checked: false },
    { name: 'statusCode', checked: false },
  ];

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

  changeStatus(event: any) {
    this.downloadJobForm.controls['status'].setValue(event.target.value)
  }

  onSubmit(format: string) {
    this.submitting = true;
    const selected = this.downloadJobForm.value.fields
      .map((checked: any, i: number) => {
        return checked ? this.formFields[i].name : null;
      })
      .filter((v: any) => v !== null);
    const jobId = this.modal.getModalId();

    this.job.downloadFile(jobId, format, selected);

    this.modal.toggleModal();
    this.downloadJobForm.reset();

    this.submitting = false;
  }
}
